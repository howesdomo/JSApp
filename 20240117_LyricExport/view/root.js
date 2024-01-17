const view_root =
{
    template: 
`<div>
    <input ref="upload0" id="btnFileInput" type="file" multiple accept="audio/mp3" style="display: none;" @change="upload0_ChangeEvent_Handler" />
    <el-button type="primary" size="small" icon="el-icon-folder-opened" @click="btnSelectMP3">导入多个mp3</el-button>

    <el-button type="primary" size="small" icon="el-icon-download" @click="btnDownloadZip_OnClick" >歌词打包为zip</el-button>

    <el-divider content-position="left">{{mListInfo}}</el-divider>

    <div>
        <el-table :data="mList" style="width: 100%">
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
            mListInfo: ""
        };
    },
    mounted: function() {
        
    },
    methods: {
        btnSelectMP3: function() {
            this.$refs.upload0.click();
        },

        upload0_ChangeEvent_Handler: function (event) {
            this.mList = []; // 清空

            const files = event.target.files;
            const that = this;

            let list = [];
            //#region 分析
            for (let index = 0; index < files.length; index++) {
                const fileReader = new FileReader();

                let selectedFile = files[index];
                this.fileName = selectedFile.name;
                fileReader.readAsArrayBuffer(selectedFile);

                jsmediatags.read(selectedFile, {
                    onSuccess: function (tag) {
                        if(tag.tags.lyrics && tag.tags.lyrics.lyrics) {
                            const lyrics = tag.tags.lyrics.lyrics; // 歌词信息

                            let toAdd = {
                                "FileName": selectedFile.name,
                                "IsSuccess": true,
                                "ExceptionInfo": null,
                                "LyricsFileName": `${selectedFile.name.substring(0, selectedFile.name.lastIndexOf('.'))}.lrc`,
                                "Lyrics": lyrics
                            };                                
                            list.push(toAdd); // that.mList.push(toAdd);
                        }
                        else {
                            let toAdd = {
                                "FileName": selectedFile.name,
                                "IsSuccess": false,
                                "ExceptionInfo": `没有歌词信息. tag.tags.lyrics is undefined`
                            };
                            list.push(toAdd); // that.mList.push(toAdd);
                        }
                    },
                    onError: function (error) {
                        let toAdd = {
                            "FileName": selectedFile.name,
                            "IsSuccess": false,
                            "ExceptionInfo": `${error.type}: ${error.info}`
                        };
                        list.push(toAdd); // that.mList.push(toAdd);
                    }
                });

                if(index + 1 == files.length) {
                    console.log(`读取完毕 - ${Date.now().toString()}`);
                    setTimeout(()=> {
                        this.mList = Enumerable.from(list).orderBy(i=>i.IsSuccess).toArray(); // 排序

                        const k0 = Enumerable.from(this.mList).where(i=>i.IsSuccess).count(i => 1);
                        const k1 = Enumerable.from(this.mList).where(i=>!i.IsSuccess).count(i => 1);
                        this.mListInfo = `共 ${this.mList.length} 个, 成功 ${k0} 个, 失败 ${k1} 个`;                            
                    }, 2000);
                }
            }
            //#endregion

            // !!!坑点!!! 如果连续两次导入的文件路径一致, 则不会触发 change 事件
            event.target.value = null;
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