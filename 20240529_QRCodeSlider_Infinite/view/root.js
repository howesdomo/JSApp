// V 1.0.1 -- 2024-06-12 15:56:30
// 1. 增加倒计时
// 2. 优化UI界面 调整条码位置
const view_Root =
{
    template: 
`<div>
    <el-collapse v-model="mActiveName">
        <el-collapse-item name="1" title="1. 计算条码流水号">
            <el-form :model="mSearchArgs" label-width="120px">
                <el-form-item label="内容">
                    <el-input v-model="mSearchArgs.Content"></el-input>
                </el-form-item>
                <el-form-item label="流水号起始位置">
                    <el-input v-model="mSearchArgs.SNStartAtIndex"></el-input>
                </el-form-item>
                <el-form-item label="流水号长度">
                    <el-input v-model="mSearchArgs.SNLength"></el-input>
                </el-form-item>
                <el-form-item label="条码格式">
                    <el-select v-model="mBarcodeType_sym" placeholder="请选择条码格式">
                        <el-option
                            v-for="item in mBarcodeTypeArr"
                            :key="item.sym"
                            :label="item.desc"
                            :value="item.sym">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="条码比例 (Scale)">
                    <el-input-number v-model="mScale" :min="1" :max="20" @change="render(mQueue.items[mIndex])"></el-input-number>
                </el-form-item>
                <el-form-item label="显示条码内容">
                    <el-checkbox v-model="mShowContentText">显示</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="calcData">确认</el-button>

                    <el-button type="danger" @click="resetCarpoly">嘉宝莉</el-button>
                </el-form-item>
            </el-form>
        </el-collapse-item>
        <el-collapse-item name="2" title="2. 生成条码日志">
            <el-table
                ref="myTable"
                :data="mQueue.items"
                :height="mTable_Height"
                style=""
                highlight-current-row
                @cell-click="table_cell_clickHandler">
                <el-table-column
                    prop="Number"
                    label="序号"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="Content"
                    label="内容">
                </el-table-column>
            </el-table>
        </el-collapse-item>
        <el-collapse-item name="3" title="3. 幻灯片播放">
            <el-form :model="mSliderArgs" label-width="120px">
                <el-form-item label="翻页间隔(毫秒)">
                    <el-input v-model="mSliderArgs.Interval"></el-input>
                </el-form-item>
                <el-form-item label="翻页页数">                    
                    <el-input v-model="mSliderArgs.PlusX"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="playSlider" :loading="IsSliderPlaying">播放</el-button>
                    <el-button type="danger" @click="stopSlider" :disabled="!IsSliderPlaying">停止</el-button>
                </el-form-item>
            </el-form>
        </el-collapse-item>
    </el-collapse>

    <div v-if="mScreenKeepOn_IsVisible">
        <el-tag
            v-if="mScreenKeepOn_Checkbox_Disable" 
            type="danger">{{mScreenKeepOn_Checkbox_DisableReason}}</el-tag>

        <el-divider 
            v-if="mScreenKeepOn_Checkbox_Disable"
            direction="vertical" ></el-divider>

        <el-checkbox 
            :disabled="mScreenKeepOn_Checkbox_Disable"
            v-model="mScreenKeepOn"
            @change="screenKeepOn_OnChanged">屏幕常亮</el-checkbox>
    </div>

    <el-statistic v-if="mIntervalId" :value="mDeadline" time-indices></el-statistic>

    <div style="display: flex; flex-direction: row; flex-wrap: nowrap; align-items: center; justify-content: flex-start;">
        <el-button icon="el-icon-moon" circle @click="mMarginBar_Visible = !mMarginBar_Visible"></el-button>
        <div style="width: 20px"></div>
        <el-slider v-if="mMarginBar_Visible" v-model="mMarginLeft" :min="mMarginLeft_Min" :max="mMarginLeft_Max" style="width: 100%; margin-left: auto;"></el-slider>
    </div>    

    <el-row>
        <el-col :span="22">
            <canvas ref="myCanvas" :style="canvasStyle"></canvas>
        </el-col>
        <el-col :span="2">
            <el-slider v-if="mMarginBar_Visible" v-model="mMarginTop" vertical height="600px" :min="mMarginTop_Min" :max="mMarginTop_Max" style="margin-top: 10px;"></el-slider>
        </el-col>
    </el-row>

    
</div>`,
    data: function ()
    {
        return {

            mActiveName: ['1', '3'],

            mTable_Height: 300,
            mQueue: new Queue(10), // 只显示最近 X 条记录
            
            mSearchArgs: {
                Content: `ABC0001XYZ`,
                SNStartAtIndex: 3,
                SNLength: 4
            },
            mSliderArgs: {
                Interval: 10000,
                PlusX: 1,
            },
            mScale: 2,

            mIntervalId: null,
            mDeadline: null, // 下一个条码倒计时

            mIndex: 0,

            mMarginBar_Visible: false,
            
            mMarginLeft_Min: 0,
            mMarginLeft_Max: 0,
            mMarginLeft: 0,

            mMarginTop_Min: 0,
            mMarginTop_Max: 0,
            mMarginTop: 0,

            mPrefix: '',
            mSuffix: '',
            mSNLength: 4,
            mSN: 1,

            
            mBarcodeTypeArr: [    
            {
                sym: "qrcode",
                desc: "QR Code",
                text: "http://goo.gl/0bis",
                opts: "eclevel=M"
            },
            {
                sym: "ean13",
                desc: "EAN-13",
                text: "9520123456788",
                opts: "includetext guardwhitespace"
            },
            {
                sym: "code128",
                desc: "Code 128",
                text: "Count01234567!",
                opts: "includetext"
            },
            {
                sym: "code39",
                desc: "Code 39",
                text: "THIS IS CODE 39",
                opts: "includetext includecheck includecheckintext"
            },
            {
                sym: "code93",
                desc: "Code 93",
                text: "THIS IS CODE 93",
                opts: "includetext includecheck"
            },
            {
                sym: "datamatrix",
                desc: "Data Matrix",
                text: "This is Data Matrix!",
                opts: ""
            }],
            mBarcodeType_sym: "qrcode",
            mBarcodeType: null,

            mShowContentText: true,




            //#region 屏幕常亮

            mScreenKeepOn_IsVisible: false,
            mScreenKeepOn_Checkbox_Disable: true,
            mScreenKeepOn_Checkbox_DisableReason: "找不到 $device 对象",
            mScreenKeepOn: false
            
            //#endregion  
        };
    },
    mounted: function() {
        this.mMarginLeft_Min = -window.innerWidth / 3;
        this.mMarginLeft_Max = window.innerWidth;

        this.mMarginTop_Min = -window.innerHeight / 6;
        this.mMarginTop_Max = window.innerHeight;

        this.calcData();

        //#region 屏幕常亮
        try
        {
            this.mScreenKeepOn = ( this.getScreenKeepOn() === "true"? true : false );
            this.Permission_Check();
        }
        catch(e)
        {
            this.mScreenKeepOn_IsVisible = false;
        }
        //#endregion 
    },
    computed: {
        IsSliderPlaying() {
            return this.mIntervalId != null;
        },
        canvasStyle() {
            let style = {
                "margin-left": `${this.mMarginLeft}px`,
                "margin-top": `${this.mMarginTop}px`
            };
            return style;
        }
    },
    methods: {

        resetCarpoly: function() {
            this.mSearchArgs = {
                Content: `E00001`,
                SNStartAtIndex: 1,
                SNLength: 5
            };
        },

        calcData: function() {
            this.calcData_ActualMethod(this.mSearchArgs);
        },

        calcData_ActualMethod(args) {
            let prefix = ``;
            let suffix = ``;
            let sn = ``;
            
            //#region 计算前缀

            let p = 0;
            if(args.SNStartAtIndex) 
            {
                p = parseInt(args.SNStartAtIndex);
            }

            
            if(p > 0)
            {
                prefix = args.Content.substring(0, p);
            }

            //#endregion

            //#region 计算后缀 + 
            
            if(!args.SNLength)
            {
                console.error(`没有填写流水号长度`);
                return;
            }
            
            args.SNLength = parseInt(args.SNLength);
            if(args.Content.length > p + args.SNLength)
            {
                suffix = args.Content.substring(p + args.SNLength);
            }                    
            
            //#endregion

            try
            {
                sn = parseInt(args.Content.substring(p, p + args.SNLength)) ; // 计算流水号
            }
            catch(e)
            {
                console.error('执行流水号转换int发生异常');
                return;
            }
            
            this.mPrefix = prefix;
            this.mSuffix = suffix;
            this.mSN = sn;
            this.mSNLength = args.SNLength;
        },

        table_cell_clickHandler: function() {
            const data = arguments[0];
            if(data) 
                this.mIndex = data.Index; // 用户选中列表, 更改当前 mIndex 为 用户选中的项
            
            this.render(data);
        },

        stopSlider: function() {
            clearInterval(this.mIntervalId);
            this.mIntervalId = null;
            this.mDeadline = Date.now();
        },
        
        playSlider: function() {
            if(this.mIntervalId) {
                clearInterval(this.mIntervalId);
            }

            // TODO 验证用户输入的参数
            this.mSliderArgs.Interval = parseInt(this.mSliderArgs.Interval);
            this.mSliderArgs.PlusX = parseInt(this.mSliderArgs.PlusX);

            this.mIndex = 0; // 重置 Index 为 0

            // 设置定时器，每 X 秒执行一次绘制函数
            this.mIntervalId = setInterval(this.drawBarcode, this.mSliderArgs.Interval);
            
            this.mDeadline = Date.now() + this.mSliderArgs.Interval;

            // 马上执行一次绘制
            this.drawBarcode();
        },

        drawBarcode: function() {
            let content = `${this.mPrefix}${(this.mSN + this.mIndex).toString().padStart(this.mSNLength, `0`)}${this.mSuffix}`;

            var data = 
            {
                Index : this.mIndex,
                Number : this.mIndex + 1,
                Content : content
            };

            this.mQueue.enqueue(data);
            
            this.render(data);
            
            this.$nextTick(()=>{
                this.mDeadline = Date.now() + this.mSliderArgs.Interval;
                this.setCurrent(data);
                this.scrollTable2Obj(this.mIndex);
            });            

            this.mIndex = this.mIndex + this.mSliderArgs.PlusX;
        },

        render: function() {                        
            try 
            {
                let a0 = arguments[0];
                
                let opts = {};                
                
                opts.bcid = this.mBarcodeType_sym;
                opts.text = a0.Content;
                if(this.mShowContentText)
                {
                    opts.alttext = a0.Content;
                }
                opts.scaleX = this.mScale;
                opts.scaleY = this.mScale;

                const canvas = this.$refs.myCanvas;
                bwipjs.toCanvas(canvas, opts);
            } 
            catch(e) 
            {
                console.error(e);
            }
        },

        setCurrent: function(row) {
            this.$refs.myTable.setCurrentRow(row);
        },

        scrollTable2Obj: function (index) {
            // 滚动到当前位置
            const wrapper = this.$refs.myTable.bodyWrapper;
            const rows = wrapper.children[0].rows;
            if (rows[index]) {
                wrapper.scrollTop = rows[index].offsetTop;
            }
        },

        //#region 屏幕常亮

        //#region 权限列表

        Permission_Check: function() {
            const jsonStr = $device.Screen_CheckPermissions();
            const m = JSON.parse(jsonStr);
            if(!m.IsSuccess) 
            {
                return;
            }
            this.mPermissionArr = JSON.parse(m.Data);
            this.Permission_Check_WAKE_LOCK();
        },

        requestPermission: function() {
            $device.Permission_Request(arguments[0]);
        },
        
        Permission_Check_WAKE_LOCK: function() {
            const jsonStr = $device.Permission_Check("android.permission.WAKE_LOCK");
            const m = JSON.parse(jsonStr);
            if(!m.IsSuccess) 
            {
                this.mScreenKeepOn_Checkbox_Disable = true;
                this.mScreenKeepOn_Checkbox_DisableReason = m.ExceptionInfo;
                return;
            }

            this.mScreenKeepOn_Checkbox_Disable = false;
        },

        //#endregion
        
        getScreenKeepOn: function() {
            return $device.Screen_GetScreenKeepOn();
        },

        screenKeepOn_OnChanged: function() 
        {
            const v = arguments[0];
            const checked = arguments[1];
            const jsonStr = $device.Screen_SetScreenKeepOn(v);
            const m = JSON.parse(jsonStr);

            if(!m.IsSuccess) 
            {
                // 在下一个DOM更新周期之前执行, 阻止 checked 值的修改
                this.$nextTick(() => {
                    this.mScreenKeepOn = !checked;
                });

                this.$notify({
                    type: "error",
                    title: "捕获异常",
                    message: `${m.ExceptionInfo}`,
                    position: 'bottom-left',
                });
            }
        },

        //#endregion

    }
};