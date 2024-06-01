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

            mDateTime: null,

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

            let now = Date.now();
            if(this.mDateTime)
            {
                if(now - this.mDateTime < 5 * 1000)
                {
                    console.error(`播放按得太快了`);
                    return;
                }
            }

            this.mIsPlaying = true;
            
            try 
            {
                this.mDateTime = now;

                const text = arguments[0];
                $device.TTS_Play(text);                
            }
            finally
            {
                this.mIsPlaying = false; 
            }
        },
        btnPlay_OnClick: function() {
            this.auto_play();
        },
        auto_play: function() {
            if(this.mIsPlaying) {
                return;
            }

            let now = Date.now();
            if(this.mDateTime)
            {
                if(now - this.mDateTime < 5 * 1000)
                {
                    console.error(`播放按得太快了`);
                    return;
                }
            }

            this.mIsPlaying = true;
            try
            {
                this.mDateTime = now;

                $device.TTS_Play2(this.mData.Title);    
                $device.TTS_Play2(this.mData.Author);
    
                this.mData.Content.forEach(item => 
                {
                    $device.TTS_Play2(item);
                });
            }
            finally
            {
                this.mIsPlaying = false;
            }            
        }
    }
};