const view_Root =
{
    template: 
`<div>
    <el-row style="margin-top: 10px; margin-bottom: 10px">
        <el-button
            type="primary"
            icon="el-icon-microphone"
            style="width: 100%;"
            @click="$router.push('/view/TTS');"
        >
            TTS语音引擎
        </el-button>
    </el-row>


    <el-divider content-position="center" style="margin-top: 30px">
        <div style="font-size: large;">
        {{mTime.DateTimeInfo}}
        </div>
    </el-divider>


    <div id="myClock" style="padding-left: 70px;"></div>
    
    <el-divider content-position="center" style="margin-top: 30px">
        <div style="font-size: large;">
        {{mTime.Yue}}
        </div>
    </el-divider>
    <div>
        <el-button 
            type="primary" 
            icon="el-icon-microphone" 
            :disabled="!mBtnPlay_IsEnabled"
            @click="playTTS" style="width: 100%">播放</el-button>
    </div>
    <div style="margin-top: 100px">
        <el-button type="primary" @click="calcNextClock" style="width: 100%">下一个</el-button>
    </div>
</div>`,
    data: function ()
    {
        return {
            // mHoursArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
            mHoursArr: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0],
            mMinutesArr: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
            mTime: {
                Date: new Date(),
                DateTimeInfo: "零点",
                Yue: "零点"
            },
            mIsPlaying: false,
            mIsPlaying_DateTime: null,
            mCountDownTaskId: null,
            mBtnPlay_IsEnabled: false,
        };
    },
    mounted: function() {
        this.calcNextClock();
    },
    computed: {
    },
    methods: {
        calcNextClock: function() {
            let myClock = document.getElementById("myClock");
            while (myClock.firstChild) {
                myClock.removeChild(myClock.firstChild);
            }

            let h = this.mHoursArr[this.getRandomNumber(this.mHoursArr.length - 1)];
            let m = this.mMinutesArr[this.getRandomNumber(this.mMinutesArr.length - 1)];

            let now = new Date();

            // console.debug(`${now.getFullYear()}, ${now.getMonth()}, ${now.getDate()}, ${h}, ${m}, 0`);
            let d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);
            
            let r = {
                Date: d,
                // DateTimeInfo: d.toLocaleString(),
                DateTimeInfo: d.toTimeString().substring(0, 8),
                Yue: this.calcYue(h, m),
            }
            
            this.mTime = r;
            AnalogClock("myClock", new AnalogClockOption(200, "#000", "#fff"), d);

            if (this.mCountDownTaskId) {
                clearTimeout(this.mCountDownTaskId); // 取消定时器
                this.mCountDownTaskId = null; // 重置timerId
            }

            let that = this;
            mCountDownTaskId = setTimeout(()=>{
                that.mBtnPlay_IsEnabled = true;
            }, 8000);

            this.mBtnPlay_IsEnabled = false;
        },

        getRandomNumber: function(max, min) {
            if(!min) {
                min = 0;
            }

            // 确保max和min是数值，并且max大于等于min
            if (typeof min !== 'number' || typeof max !== 'number') {
                throw new Error('Both min and max must be numbers.');
            }
            if (max < min) {
                throw new Error('max must be greater than or equal to min.');
            }
        
            // Math.random() 生成[0, 1)之间的随机数，通过调整使其落在[min, max]范围内
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        calcYue: function(hour, minute) {
            let period;
            if (hour >= 0 && hour < 6) {
                period = '凌晨';
            } else if (hour >= 6 && hour < 12) {
                period = '早上';
            } else if (hour === 12) {
                period = '中午';
            } else if (hour > 12 && hour < 18) {
                period = '下午';
                hour -= 12; // 转换为12小时制
            }
            else {
                period = '夜晚';
                hour -= 12; // 转换为12小时制
            }

            // 特殊处理0点和12点的情况
            if (hour === 0) hour = 12;    
            let hourInfo = this.calcYue_HourInfo(hour);
            let minuteInfo = this.calcYue_MinuteInfo(minute);

            return `${period}${hourInfo}${minuteInfo}`;
        },
        calcYue_HourInfo(hour)
        {
            switch(hour)
            {
                case 0:
                    hourInfo = "零";
                    break;
                case 1:
                    hourInfo = "一";
                    break;
                case 2:
                    hourInfo = "两";
                    break;
                case 3:
                    hourInfo = "三";
                    break;
                case 4:
                    hourInfo = "四";
                    break;
                case 5:
                    hourInfo = "五";
                    break;
                case 6:
                    hourInfo = "六";
                    break;
                case 7:
                    hourInfo = "七";
                    break;
                case 8:
                    hourInfo = "八";
                    break;
                case 9:
                    hourInfo = "九";
                    break;
                case 10:
                    hourInfo = "十";
                    break;
                case 11:
                    hourInfo = "十一";
                    break;
                case 12:
                    hourInfo = "十二";
                    break;
            }

            return hourInfo + "点";
        },

        calcYue_MinuteInfo(m) {
            let hourInfo = "";
            switch(m / 5) {
                case 0:
                    return "正";
                case 6:
                    return "半";
                case 1:
                    hourInfo = "一";
                    break;
                case 2:
                    hourInfo = "两";
                    break;
                case 3:
                    hourInfo = "三";
                    break;
                case 4:
                    hourInfo = "四";
                    break;
                case 5:
                    hourInfo = "五";
                    break;            
                case 7:
                    hourInfo = "七";
                    break;
                case 8:
                    hourInfo = "八";
                    break;
                case 9:
                    hourInfo = "九";
                    break;
                case 10:
                    hourInfo = "十";
                    break;
                case 11:
                    hourInfo = "十一";
                    break;
            }
            hourInfo = hourInfo + "个字";
            return hourInfo;    
        },

        playTTS() {
            if(this.mIsPlaying) {
                return;
            }

            let now = Date.now();
            if(this.mIsPlaying_DateTime)
            {
                if(now - this.mIsPlaying_DateTime < 4000)
                {
                    console.error(`播放按得太快了`);
                    return;
                }
            }

            this.mIsPlaying = true;
            
            try 
            {
                this.mIsPlaying_DateTime = now;
                let data = this.mTime;
                console.log(data);

                // TODO 多语言学习
                // switch(this.mSelectedLang)
                // {
                //     case '汉':
                //         $device.TTS_Play(data.Chinese);
                //         break;
                //     case '英':
                //         $device.TTS_Play(data.English);
                //         break;
                //     default:
                //         break;
                // }

                $device.TTS_Play(data.Yue);
            }
            finally
            {
                this.mIsPlaying = false; 
            }
        },

    }
};