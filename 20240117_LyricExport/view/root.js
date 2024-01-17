const view_root =
{
    template: 
`<div>
    <input ref="upload0" id="btnFileInput" type="file" multiple accept="audio/mp3" style="display: none;" @change="upload0_ChangeEvent_Handler" />
    <el-button type="primary" size="small" icon="el-icon-folder-opened" @click="btnSelectMP3">导入多个mp3</el-button>

    <el-button type="primary" size="small" icon="el-icon-download" @click="btnDownloadZip_OnClick" >歌词打包为zip</el-button>

    <el-divider content-position="left">{{mListInfo}}</el-divider>

    <div>
        <el-table :data="mList" 
            style="width: 100%" 
            v-loading="mIsBusy"
            :element-loading-text="mBusyContent"
        >
            <el-table-column prop="FileName" label="FileName">
            </el-table-column>
            <el-table-column width="120" label="是否成功">
                <template slot-scope="scope">
                    <span>{{scope.row.IsSuccess ? "成功" : "失败"}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="ExceptionInfo" label="ExceptionInfo">
            </el-table-column>
        </el-table>
    </div>
</div>`,
    data: function ()
    {
        return {
            mList: [],
            mListInfo: "",
            mIsBusy: false,
            mBusyContent: ""
        };
    },
    mounted: function() {
        
    },
    methods: {
        btnSelectMP3: function() {
            this.mIsBusy = true;
            this.$refs.upload0.click();
        },

        upload0_ChangeEvent_Handler: async function (event) {
            this.mList = []; // 清空
            let tempList = [];

            console.log(`进入 upload0_ChangeEvent_Handler`);
            console.log(`用户选择共 ${event.target.files.length} 个文件`);

            const files = event.target.files;
            const that = this;

            //#region 逐个mp3文件分析里面的歌词信息

            for (let index = 0; index < files.length; index++) {
                // const fileReader = new FileReader(); // 无需fileReader

                let selectedFile = files[index];

                console.log(`正在分析第 ${(index + 1)} ${selectedFile.name}`);
                this.mBusyContent = `正在分析第 ${(index + 1)} ${selectedFile.name}`;
                
                // fileReader.readAsArrayBuffer(selectedFile); // 无需fileReader

                try 
                {
                    let tag = await that.execute_read_mp3_lyrics_Stepbystep(selectedFile); // 无需fileReader, 只需将 selectedFile ( 即系 files[index] ), 传比 jsmediatags.read(selectedFile, ... ) 

                    const lyrics = tag.tags.lyrics.lyrics; // 歌词信息

                    let toAdd = {
                        "FileName": selectedFile.name,
                        "IsSuccess": true,
                        "ExceptionInfo": null,
                        "LyricsFileName": `${selectedFile.name.substring(0, selectedFile.name.lastIndexOf('.'))}.lrc`,
                        "Lyrics": lyrics
                    };                                
                    tempList.push(toAdd);
                    console.log(`成功分析第 ${(index + 1)} ${selectedFile.name}`);
                }
                catch(error)
                {
                    let toAdd = {
                        "FileName": selectedFile.name,
                        "IsSuccess": false,
                        "ExceptionInfo": `${error.type}: ${error.info}`
                    };
                    tempList.push(toAdd);
                    console.log(`失败分析第 ${(index + 1)} ${selectedFile.name}`);   
                }           
            }

            //#endregion            

            this.mList = Enumerable.from(tempList).orderBy(i=>i.IsSuccess).toArray(); // 排序

            const k0 = Enumerable.from(this.mList).where(i=>i.IsSuccess).count(i => 1);
            const k1 = Enumerable.from(this.mList).where(i=>!i.IsSuccess).count(i => 1);

            this.mListInfo = `共 ${this.mList.length} 个, 成功 ${k0} 个, 失败 ${k1} 个`;

            // !!!坑点!!! 如果连续两次导入的文件路径一致, 则不会触发 change 事件
            event.target.value = null;

            this.mIsBusy = false;
        },

        execute_read_mp3_lyrics_Stepbystep: function (selectedFile) {
            // 使用 await Promise 实现逐个 mp3 文件进行分析
            return new Promise(function(resolve, reject) {
                jsmediatags.read(selectedFile, {
                    onSuccess: function(tag) {
                        if(tag.tags.lyrics && tag.tags.lyrics.lyrics) {
                            resolve(tag);   
                        }
                        else {
                            reject(`没有歌词信息. tag.tags.lyrics is undefined`);
                        }   
                    },
                    onError: function(error) {
                        reject(error);
                    }
                });
            });
        },

        btnDownloadZip_OnClick: function () {
            if (this.mList == null || this.mList.length == 0) {
                console.error('未选择音乐文件');
                return;
            }

            // 创建一个新的JSZip实例
            const zip = new JSZip();

            for (let index = 0; index < this.mList.length; index++) {
                const current = this.mList[index];
                if(current.IsSuccess == false) { continue; }
                zip.file(current.LyricsFileName, current.Lyrics);
            }

            // 生成zip文件
            zip.generateAsync({ type: 'blob' })
                .then((content) => {
                    // 创建一个 Blob URL
                    const blobUrl = URL.createObjectURL(content);

                    // 创建一个链接元素
                    const downloadLink = document.createElement('a');

                    // 设置链接属性
                    downloadLink.href = blobUrl;
                    downloadLink.download = `歌词${Date.now()}.zip`;

                    // 将链接添加到文档中
                    document.body.appendChild(downloadLink);

                    // 模拟点击链接以触发下载
                    downloadLink.click();

                    // 移除链接元素
                    document.body.removeChild(downloadLink);

                    // 释放 Blob URL
                    URL.revokeObjectURL(blobUrl);
                })
                .catch((error) => {
                    console.error('压缩失败', error);
                });
        }
    }
};