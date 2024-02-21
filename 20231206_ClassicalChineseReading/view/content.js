const view_Content =
{
    template: `
<div>
    <el-page-header        
        @back="page_header_goBack_OnClick">
    </el-page-header>
    <el-row style="margin-left: 5px; margin-top: 40px; margin-bottom: 10px; font-size: 28px; font-weight: bold;">
        {{mData.Title}}
    </el-row>
    <el-row style="margin-left: 15px; font-size: 15px; color: gray;">
        {{mData.Author}}〔{{mData.Age}}〕
    </el-row>
    <el-row>
        <el-table 
            :data="mData.Content"
            :show-header="false"
            @row-click="table_row_click_Handler"
            >
            <el-table-column label="值">
                <template v-slot="{row}">
                    <span>{{ row }}</span>
                    <i class="el-icon-headset" style="margin-left: 15px"></i>
                </template>
            </el-table-column>
        </el-table>

        <el-row style="margin-top: 10px">
            <el-button
                type="primary"
                icon="el-icon-microphone"
                style="width: 100%;"
                :loading="mIsPlaying"
                @click="btnPlay_OnClick"            
            >
                播放
            </el-button>
        </el-row>
    </el-row>
<!--
    <el-row>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-row>
-->
</div>`,
    data: function ()
    {
        return {
            mIsPlaying: false,
            mData: {},


            input: ""
        };
    },
    mounted: function() {
        console.log("run mounted");
        
        // 获取路由传递过来的参数
        console.log("$route.query", this.$route.query);
        console.log("$route.params", this.$route.params);
        
        this.mData = JSON.parse(this.$route.query.jsonStr)
    },
    methods: {
        page_header_goBack_OnClick: function() {
            this.$router.go(-1);
        },
        table_row_click_Handler: function() {
            if(this.mIsPlaying) {
                return;
            }

            this.mIsPlaying = true;

            const text = arguments[0];
            $device.TTS_Play(text);

            this.mIsPlaying = false;
        },
        btnPlay_OnClick: function() {
            this.auto_play();
        },
        auto_play: function() {
            if(this.mIsPlaying) {
                return;
            }

            this.mIsPlaying = true;

            // TODO 用 Promise 封装 $device.TTS_Play_WaitForPrevious, 看看能否解决漏斗(卡顿问题)
            // $device.TTS_Play_WaitForPrevious(this.mData.Title, $WebViewHashCode);

            // $device.TTS_Play_WaitForPrevious(this.mData.Author, $WebViewHashCode);

            // this.mData.Content.forEach(item => {
            //     $device.TTS_Play_WaitForPrevious(item, $WebViewHashCode);
            // });
            
            let args = { "WebView_HashCode" : $WebViewHashCode, "Data" : "123" };

            args.Data = this.mData.Title;
            $device.TTS_Play2(JSON.stringify(args));

            args.Data = this.mData.Author;
            $device.TTS_Play2(JSON.stringify(args));

            this.mData.Content.forEach(item => {
                args.Data = item;
                $device.TTS_Play2(JSON.stringify(args));
            });

            this.mIsPlaying = false;
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

    }
};