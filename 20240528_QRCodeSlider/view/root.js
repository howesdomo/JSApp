// V 1.0.1 -- 2024-06-12 15:56:30
// 1. 增加倒计时
// 2. 优化UI界面 调整条码位置
const view_Root =
{
    template: 
`<div>
    <el-collapse v-model="mActiveName">
        <el-collapse-item name="1" title="1. 制作条码列表">
            <el-tabs type="border-card" v-model="mTabs_ActiveName">
                <el-tab-pane label="计算条码流水号" name="1-1">            
                    <el-form :model="mSearchArgs" label-width="120px">
                        <el-form-item label="内容">
                            <el-input v-model="mSearchArgs.Content"></el-input>
                        </el-form-item>
                        <el-form-item label="数量">
                            <el-input v-model="mSearchArgs.Qty"></el-input>
                        </el-form-item>
                        <el-form-item label="流水号起始位置">
                            <el-input v-model="mSearchArgs.SNStartAtIndex"></el-input>
                        </el-form-item>
                        <el-form-item label="流水号长度">
                            <el-input v-model="mSearchArgs.SNLength"></el-input>
                        </el-form-item>
            
                        <el-form-item>
                            <el-button type="primary" @click="calcData">计算数据</el-button>                    
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="导入文本文档" name="1-2">
                    <div>
                        <el-button @click="btnImportTXT">导入文本</el-button>
                        <input ref="upload0" id="btnFileInput" type="file" style="display: none;" @change="upload0_ChangeEvent_Handler" />
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-collapse-item>
        <el-collapse-item name="2" title="2. 显示条码列表">
            <el-table
                ref="myTable"
                :data="mArray"
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
        <el-collapse-item name="3" title="3. 条码格式">
            <el-form :model="mSliderArgs" label-width="120px">
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
            </el-form>
        </el-collapse-item>
        <el-collapse-item name="4" title="4. 幻灯片播放">
            <el-form :model="mSliderArgs" label-width="120px">
                <el-form-item label="翻页间隔(毫秒)">
                    <el-input v-model="mSliderArgs.Interval"></el-input>
                </el-form-item>
                <el-form-item label="翻页页数">                    
                    <el-input v-model="mSliderArgs.PlusX"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="playSlider" :loading="IsSliderPlaying">幻灯片播放</el-button>
                    <el-button type="danger" @click="stopSlider" :disabled="!IsSliderPlaying">停止播放</el-button>
                </el-form-item>
            </el-form>
        </el-collapse-item>
    </el-collapse>

    <div style="margin-top: 10px;">    
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

        <div style="display: flex; flex-direction: row; flex-wrap: nowrap; align-items: center; justify-content: flex-start;">
            <canvas ref="myCanvas" :style="canvasStyle"></canvas>
            <el-slider v-if="mMarginBar_Visible" v-model="mMarginTop" vertical height="600px" :min="mMarginTop_Min" :max="mMarginTop_Max" style="margin-top: 10px; margin-left: auto;"></el-slider>
        </div>

    </div>
</div>`,
    data: function ()
    {
        return {

            mActiveName: ['2', '4'],

            mTabs_ActiveName: '1-1',

            mTable_Height: 300,
            mArray: [], // 数据从 data.json 文件中获取
            
            // mSearchArgs: new SearchArgs(`E01107`, 99, 1, 5),
            mSearchArgs: new SearchArgs(`ABC0001XYZ`, 10, 3, 4),            
            
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

            mScreenKeepOn_IsVisible: true,
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
        calcData: function() {
            this.calcData_ActualMethod(this.mSearchArgs);
        },

        calcData_ActualMethod(args) {
            let prefix = ``;
            let suffix = ``;
            let sn = ``;
            
            if(!args.Qty) {
                console.error(`没有填写数量`);
                return ;
            }

            try 
            {
                args.Qty = parseInt(args.Qty);
            } 
            catch (error) 
            {
                console.error('执行数量转换int发生异常');    
            }

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
             
            let r = [];
            for(let index = 0; index < args.Qty; index++)
            {
                let current = `${prefix}${(sn+index).toString().padStart(args.SNLength, `0`)}${suffix}`;
                var toAdd = 
                {
                    Index : index,
                    Number : index + 1,
                    Content : current
                };
                r.push(toAdd);
            }

            this.mArray = r;
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
            
            // 马上执行一次绘制
            this.drawBarcode();
        },

        drawBarcode: function() {
            this.mDeadline = Date.now() + this.mSliderArgs.Interval;

            let data = this.mArray[this.mIndex];
            
            this.render(data);
            this.setCurrent(data);
            this.scrollTable2Obj(this.mIndex);

            if(this.mArray.length <= this.mIndex + this.mSliderArgs.PlusX)
            {
                const msg = `完成幻灯片播放`;
                console.log(msg);
                this.$notify({
                    type: 'success',
                    title: '提示',
                    message: msg,
                    duration: 0
                });

                clearInterval(this.mIntervalId);
                this.mIntervalId = null;

                return;
            }

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


        //#region 导入文本文档

        btnImportTXT: function() {
            this.$refs.upload0.click();
        },
    
        upload0_ChangeEvent_Handler(event) {
            const files = event.target.files;
            const that = this;
            for (let index = 0; index < files.length; index++) {
                const fileReader = new FileReader();

                let selectedFile = files[index];
                this.fileName = selectedFile.name;
                fileReader.readAsText(selectedFile);

                fileReader.onload = function () {                
                    // 当文件读取完成时，FileReader对象的onload事件会被触发。
                    // 这个事件的处理函数会被执行，而且它的this.result属性会包含读取的文件内容。
                    // 这个属性的类型取决于你使用的读取方法。例如，如果你使用readAsText()方法，那么this.result属性就是一个字符串，
                    // 如果你使用readAsArrayBuffer()方法，那么this.result属性就是一个ArrayBuffer对象。
                    if (fileReader == this) {
                        console.log(`this 是代表 fileReader`);
                    }
                    console.log("fileReader.result 的类型是", typeof this.result);
                    console.log(`读取结果[${typeof this.result}]\n`, this.result);
                    
                    let arr = this.result.split(/\r\n|\r|\n/);
                    arr = arr.filter(line => line.trim() !== '');
                    
                    let r = [];
                    for(let i = 0; i < arr.length; i++)
                    {
                        r.push
                        ({
                            Index : i,
                            Number : i + 1,
                            Content : arr[i]
                        });
                    }
                    that.mArray = r;
                };
            }
        },

        //#endregion
    }
};