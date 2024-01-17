const view_TTS =
{
    template: `
<div>
    <el-page-header @back="$router.go(-1)" content="TTS语音引擎"></el-page-header>    
    <el-row v-if="!mIsInit">    
        <el-statistic 
            title="刷新"
            :value="mIsInit_Check_Timer_Value" 
            format="mm:ss.SSS"
            time-indices></el-statistic>

        <el-button
            type="primary"
            icon="el-icon-s-tools"
            :disabled="mIsInit"
            @click="btnStart_OnClick"
        >
            开启TTS语音引擎
        </el-button>
    </el-row>

    <el-divider>语言 & 语音</el-divider>
    <div style="margin-left: 10px; margin-right: 10px;">   
        <span>
            Lang 语言<el-tag style="margin-left: 5px;">{{mLangStr}}</el-tag>
        </span>

        <div style="margin-top: 5px;">
            Voice 语音<el-tag style="margin-left: 5px;">{{mVoiceStr}}</el-tag>

            <el-button 
                type="primary"
                size="small"
                :disabled="!mIsInit"
                @click="btnLang_OnClick"
            >选择</el-button>
        </div>

        <el-drawer
            title="选择语言 Lang"
            size="90%"
            :visible.sync="mLang_Drawer"
            :direction="mLang_DrawerDirection">
            <el-table
                ref="table0"
                :data="mLang_Arr"
                :show-header="false"
                highlight-current-row
                @current-change="mLang_Table_CurrentChange_OnHandle"
                style="width: 100%">
                <el-table-column
                    width="60">
                    <template slot-scope="scope">
                        <div>
                            <el-tag v-if="mLangStr == scope.row.LangStr">选中</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <div>
                            <div style="font-size: 24px; line-height: 40px;">{{scope.row.Title}}</div>
                            <div>{{scope.row.SubTitle}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    width="60">
                    <template slot-scope="scope">
                        <div>
                            <el-tag
                                type="info"
                                v-if="scope.row.IsDefault">默认</el-tag>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-drawer>

        <el-drawer
            :title="mLang_SubDrawer_Title"
            size="90%"
            :visible.sync="mLang_SubDrawer"
            :direction="mLang_SubDrawerDirection">
            <div style="margin-left: 10px; margin-right: 10px;">
                <div style="margin-bottom: 10px;">
                    <el-button @click="btnSubmitVoice">确认</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-checkbox v-model="mLang_SubDrawer_IsDefault">设为默认</el-checkbox>
                </div>
                <div style="margin-bottom: 10px;">
                    
                </div>
                <div>            
                    <el-radio-group 
                        v-model="mLang_SubDrawer_Voice_SelectedName"
                        @input="mLang_SubDrawer_Voice_SelectedName_Change_OnHandle"
                        >
                        <div v-for="v in mLang_SubDrawer_VoiceArr" style="margin-bottom: 5px;">
                            <el-radio
                                :label="v.VoiceName"
                                border></el-radio>
                            <el-tag 
                                type="info"
                                v-if="v.IsDefault">默认</el-tag>                            
                        </div>                    
                    </el-radio-group>                
                </div>
            </div>
        </el-drawer>

    </div>    

    <el-divider>Control Audio</el-divider>
    <el-row>
        <div style="margin-left: 10px; margin-right: 10px;">
            Pitch 语调<el-tag style="margin-left: 10px">{{mPitch}}</el-tag>
            <el-button
                type="primary"
                :disabled="!mIsInit"
                size="small"
                @click="btnSetDefaultPitch_OnClick"
            >保存为默认</el-button>

            <el-slider 
                v-model="mPitch"
                :marks="mPitchMarks"
                :min="mPitchMin"
                :max="mPitchMax"
                :step="0.1"
                :disabled="!mIsInit"
                :show-tooltip="false"
                @change="mPitch_OnChange"
                ></el-slider>            
        </div>
    </el-row>

    <el-row>
        <div style="margin-left: 10px; margin-right: 10px; margin-top: 20px;">
            SpeedRate 语速<el-tag style="margin-left: 10px">{{mSpeedRate}}</el-tag>
            <el-button
                type="primary"
                :disabled="!mIsInit"
                size="small"
                @click="btnSetDefaultSpeedRate_OnClick"
            >保存为默认</el-button>
            <el-slider 
                v-model="mSpeedRate"
                :marks="mSpeedRateMarks"
                :min="mSpeedRateMin"
                :max="mSpeedRateMax"
                :step="0.1"
                :disabled="!mIsInit"
                :show-tooltip="false"
                @change="mSpeedRate_OnChange"
                ></el-slider>
        </div>
    </el-row>

    <el-divider>文本内容</el-divider>
    <el-input 
        v-model="mContent"
        type="textarea"
        :disabled="!mIsInit"
        :rows="5"
        placeholder="请输入文本内容"        
        clearable
    ></el-input>

    <el-row style="margin-top: 10px">
        <el-button
            type="primary"
            icon="el-icon-microphone"
            :disabled="!mIsInit"
            style="width: 100%;"
            @click="btnPlay_OnClick"            
        >
            播放
        </el-button>
    </el-row>

    <!--    
    <el-row style="margin-top: 10px">
        <el-button
            type="primary"
            icon="el-icon-microphone"
            :disabled="!mIsInit"
            @click="btnPlayChinese_OnClick"
        >
            普通话
        </el-button>

        <el-button
            type="primary"
            icon="el-icon-microphone"
            :disabled="!mIsInit"
            @click="btnPlayCantonese_OnClick"
        >
            粤语
        </el-button>
    </el-row>

    <el-row style="margin-top: 10px">
        <el-button
            type="primary"
            icon="el-icon-microphone"
            :disabled="!mIsInit"
            @click="btnPlayEnglish_US_OnClick"
        >
            英语US
        </el-button>

        <el-button
            type="primary"
            icon="el-icon-microphone"
            :disabled="!mIsInit"
            @click="btnPlayEnglish_UK_OnClick"
        >
            英语UK
        </el-button>

    </el-row>

    <el-row style="margin-top: 10px">
        <el-button
            type="primary"
            icon="el-icon-microphone"
            :disabled="!mIsInit"
            @click="btnPlayJapanese_OnClick"
        >
            日语
        </el-button>

        
        <el-button
            type="primary"
            icon="el-icon-microphone"
            :disabled="!mIsInit"
            @click="btnPlayKorean_OnClick"
        >
            韩语
        </el-button>
    </el-row>
    -->
</div>`,
    data: function ()
    {
        return {
            mContent: `測試`, // `測試안녕`

            mIsInit: false,
            mIsInit_Check_Timer: null,
            mIsInit_Check_Timer_Value: Date.now() + 1000 * 2, // 每 2 秒检测一次, 直到用户点击授权

            //#region 语言
                        
            mLang_Drawer: false,
            mLang_DrawerDirection: "btt",
            mLang_Arr: [
                { "Index": 0, "LangStr": "zh_CN", "LangTag": "zh-CN", "Title": "中文", "SubTitle": "中国", "IsDefault": false, "TestContent": "这是一段测试语音", "VoiceArr": []},
                { "Index": 1, "LangStr": "yue_HK", "LangTag": "yue-HK", "Title": "粤语", "SubTitle": "香港", "IsDefault": true, "TestContent": "這是一段測試語音", "VoiceArr": [{
                    "Index": 0,
                    "IsNetworkConnectionRequired": false,
                    "VoiceName": "cmn-cn-x-ssa-local"
                }, {
                    "Index": 1,
                    "IsNetworkConnectionRequired": false,
                    "VoiceName": "zh-CN-language"
                }, {
                    "Index": 2,
                    "IsNetworkConnectionRequired": true,
                    "VoiceName": "cmn-cn-x-ssa-network",
                    "IsDefault": true,
                }]},
            ],

            
            mLang_SubDrawer: false,
            mLang_SubDrawer_Model: null,
            mLang_SubDrawer_IsDefault: false,
            mLang_SubDrawerDirection: "btt",
            mLang_SubDrawer_Voice_SelectedName: null,

mLangStr: "",
mVoiceStr: "",

            //#endregion

            //#region Pitch 语调
            
            mPitchMin: 0,
            mPitchMax: 2.5,
            mPitchMarks: {
                1: {
                  style: {
                    color: '#1989FA'
                  },
                  label: this.$createElement('span', '[标准] 1')
                }
            },
            mPitch: 1,
            
            //#endregion

            //#region SpeedRate 语速

            mSpeedRateMin: 0,
            mSpeedRateMax: 2.5,
            mSpeedRateMarks: {
                1: {
                  style: {
                    color: '#1989FA'
                  },
                  label: this.$createElement('span', '[标准] 1')
                }
            },
            mSpeedRate: 1,

            //#endregion
        };
    },
    computed: {
        mLang_SubDrawer_Title: function() {
            let r = "";
            if(this.mLang_SubDrawer_Model) { r = `${this.mLang_SubDrawer_Model.Title} - 选择语音 Voice`; }
            return r;
        },
        mLang_SubDrawer_VoiceArr: function() {
            let r = [];
            if(this.mLang_SubDrawer_Model) { r = this.mLang_SubDrawer_Model.VoiceArr; }
            return r;
        },
        // mLang_SubDrawer_VoiceArr: function() {
        //     let r = [];
            
        //     this.mLang_SubDrawer_Model.VoiceArr;

        //     if(this.mLang_SubDrawer_Model) 
        //     {
        //         this.mLang_SubDrawer_Voice_SelectedName = "";    
        //     }
        //     return r;
        // }
    },
    mounted: function() {        
        this.mIsInit_Check_Timer = setInterval(this.IsInit_Check_Timer, 3000);
        this.TTS_GetInfo();
    },
    methods: {
        IsInit_Check_Timer: function() {
            console.log("执行定时检测");
            try
            {
                this.TTS_GetInfo();
            }
            catch(e)
            {
                console.error(e);
                if(e.toString().indexOf("$device is not defined") >= 0)
                {
                    this.Cancel_Init_Check_Timer();
                }
            }

            // 每 2 秒检测一次, 直到用户点击授权
            this.mIsInit_Check_Timer_Value = Date.now() + 1000 * 2;
        },
        Cancel_Init_Check_Timer: function() {
            if(this.mIsInit_Check_Timer)
            {
                clearInterval(this.mIsInit_Check_Timer);
                this.mIsInit_Check_Timer = null;
                console.log("定时检测取消了");
            }            
        },

        TTS_GetInfo: function() {
            const jsonStr = $device.TTS_GetInfo();
            const m = JSON.parse(jsonStr);
            if(!m.IsSuccess) 
            {
                return;
            }
            
            const ttsInfo = JSON.parse(m.Data);            
            this.mIsInit = ttsInfo.IsInit;
            if(this.mIsInit)
            {
                // this.mLang = ttsInfo.Lang;
                this.mPitch = ttsInfo.Pitch;
                this.mSpeedRate = ttsInfo.SpeedRate;

                this.mLangStr = ttsInfo.LangInfo.LangStr;
                this.mVoiceStr = ttsInfo.Voice.name;

                this.Cancel_Init_Check_Timer(); // 定时检测取消了
            }
        },

        btnLang_OnClick: function() {
            this.mLang_Drawer = true;

            const jsonStr = $device.TTS_GetLangArr();
            const m = JSON.parse(jsonStr);
            if(!m.IsSuccess) 
            {
                this.$notify({
                    type: "error",
                    title: "捕获异常",
                    message: `${m.ExceptionInfo}`,
                    position: 'bottom-left',
                });
                return;
            }            
            
            this.mLang_Arr = JSON.parse(m.Data);            
            this.mLang_Drawer = true;
        },

        mLang_Table_CurrentChange_OnHandle: function() {            
            const row = arguments[0];
            // const jsonStr = $device.TTS_SetLang(row.LangStr);
            // const m = JSON.parse(jsonStr);
            // if(!m.IsSuccess) 
            // {
            //     this.$notify({
            //         type: "error",
            //         title: "捕获异常",
            //         message: `${m.ExceptionInfo}`,
            //         position: 'bottom-left',
            //     });
            //     return;
            // }
            
            // this.mLang_Drawer = false;
            // this.TTS_GetInfo();

            this.mLang_SubDrawer_Model = row;
            this.mLang_SubDrawer_IsDefault = row.IsDefault;
            this.mLang_SubDrawer = true;

            // 如果当前 VoiceArr 集合中含有 mVoiceStr, 则设置 mLang_SubDrawer_Voice_SelectedName 为 mVoiceStr
            if(Enumerable.from(row.VoiceArr).count(i=>i.VoiceName.indexOf(this.mVoiceStr)) > 0)
            {
                this.mLang_SubDrawer_Voice_SelectedName = this.mVoiceStr; // 勾选当前选中语音
            }            
        },

        mLang_SubDrawer_Voice_SelectedName_Change_OnHandle: function() {
            // console.log("Lang", this.mLang_SubDrawer_Model);
            // console.log("Voice", this.mLang_SubDrawer_Voice_SelectedName);

            const selectedVoice = this.mLang_SubDrawer_Model.VoiceArr.filter(i => i.VoiceName === this.mLang_SubDrawer_Voice_SelectedName)[0];

            // console.log("Index of Lang, Voice", `${this.mLang_SubDrawer_Model.Index}, ${selectedVoice.Index}`);
            $device.TTS_Test(this.mLang_SubDrawer_Model.Index, selectedVoice.Index);
        },

        btnSubmitVoice: function() {
            if(!this.mLang_SubDrawer_Voice_SelectedName)
            {
                this.$notify({
                    type: "error",
                    title: "捕获异常",
                    message: `请选择语音。`,
                    position: 'bottom-left',
                });
                return;
            }


            const selectedVoice = this.mLang_SubDrawer_Model.VoiceArr.filter(i => i.VoiceName === this.mLang_SubDrawer_Voice_SelectedName)[0];            
            $device.TTS_SubmitVoice(this.mLang_SubDrawer_Model.Index, selectedVoice.Index, this.mLang_SubDrawer_IsDefault);

            this.mLang_SubDrawer_Voice_SelectedName = null;
            this.mLang_SubDrawer = false;
            this.mLang_SubDrawer_Model = null;
            this.mLang_Drawer = false;

            this.TTS_GetInfo();
        },


        btnStart_OnClick: function() {
            const jsonStr = $device.TTS_Init();
            const r = JSON.parse(jsonStr);
            if(!r.IsSuccess) {
                this.$notify({
                    type: "error",
                    title: "捕获异常",
                    message: `${r.ExceptionInfo}`,
                    position: 'bottom-left',
                });
                return;
            }
            this.mFileName = r.Data;
        },
        
        mPitch_OnChange: function()
        {
            $device.TTS_SetPitch(this.mPitch, false);
        },
        btnSetDefaultPitch_OnClick: function()
        {
            $device.TTS_SetPitch(this.mPitch, true);
        },
                
        mSpeedRate_OnChange: function()
        {
            $device.TTS_SetSpeechRate(this.mSpeedRate, false);
        },

        btnSetDefaultSpeedRate_OnClick: function()
        {
            $device.TTS_SetSpeechRate(this.mSpeedRate, true);
        },

        //#region 播放
        
        checkBeforePlay: function()
        {
            if(!this.mContent || this.mContent == "")
            {
                return false;
            }
            
            return true;
        },
        btnPlay_OnClick: function()
        {
            if(this.checkBeforePlay() == false)
                return;

            $device.TTS_Play(this.mContent);
        },
        btnPlayChinese_OnClick: function()
        {
            if(this.checkBeforePlay() == false)
                return;

            $device.TTS_PlayChinese(this.mContent);
        },
        btnPlayCantonese_OnClick: function()
        {
            if(this.checkBeforePlay() == false)
                return;

            $device.TTS_PlayCantonese(this.mContent);
        },
        btnPlayEnglish_US_OnClick: function()
        {
            if(this.checkBeforePlay() == false)
                return;

            $device.TTS_PlayEnglish_US(this.mContent);
        },
        btnPlayEnglish_UK_OnClick: function()
        {
            if(this.checkBeforePlay() == false)
                return;

            $device.TTS_PlayEnglish_UK(this.mContent);
        },
        btnPlayJapanese_OnClick: function()
        {
            if(this.checkBeforePlay() == false)
                return;

            $device.TTS_PlayJapanese(this.mContent);
        },
        btnPlayKorean_OnClick: function()
        {
            if(this.checkBeforePlay() == false)
                return;

            $device.TTS_PlayKorean(this.mContent);
        },

        //#endregion
    }
};