const view_Root =
{
    template: 
`<div>
    <el-collapse v-model="mActiveName">
        <el-collapse-item name="1" title="计算条码流水号">
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
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </el-collapse-item>
        <el-collapse-item name="2" title="条码列表">
            <el-table
                ref="myTable"
                :data="mArray"
                :height="mTable_Height"
                style="width: 100%"
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
        <el-collapse-item name="3" title="幻灯片播放">
            <el-form :model="mSliderArgs" label-width="120px">
                <el-form-item label="执行频率(毫秒)">
                    <el-input v-model="mSliderArgs.Interval"></el-input>
                </el-form-item>
                <el-form-item label="PlusX">
                    <el-input v-model="mSliderArgs.PlusX"></el-input>
                </el-form-item>        
                <el-form-item>
                    <el-button type="primary" @click="playSlider" :loading="IsSliderPlaying">幻灯片播放</el-button>
                    <el-button type="danger" @click="stopSlider" :disabled="!IsSliderPlaying">停止播放</el-button>
                </el-form-item>
            </el-form>
            <div>
                <canvas ref="myCanvas"></canvas>
            </div>
        </el-collapse-item>
    </el-collapse>
</div>`,
    data: function ()
    {
        return {

            mActiveName: ['2', '3'],

            mTable_Height: 300,
            mArray: [], // 数据从 data.json 文件中获取
            
            // mSearchArgs: new SearchArgs(`ABC0001XYZ`, 10, 3, 4),
            
            mSearchArgs: new SearchArgs(`E01107`, 99, 1, 5),
            mSliderArgs: {
                Interval: 10000,
                PlusX: 1,
            },
            mScale: 5,

            mIntervalId: null,
            mIndex: 0
        };
    },
    mounted: function() {
        this.calcData();
    },
    computed: {
        IsSliderPlaying() {
            return this.mIntervalId != null;
        }
    },
    methods: {
        calcData: function() {
            console.log(this.mSearchArgs);
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
            try 
            {
                const data = arguments[0];
                this.render(data);
            }
            finally
            {
                
            }
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

            // 设置定时器，每 X 秒执行一次绘制函数
            this.mIntervalId = setInterval(this.drawBarcode, this.mSliderArgs.Interval);
            
            // 马上执行一次绘制
            this.drawBarcode();
        },

        drawBarcode: function() {
            let data = this.mArray[this.mIndex];
            
            this.render(data);
            this.setCurrent(data);

            if(this.mArray.length <= this.mIndex + this.mSliderArgs.PlusX)
            {
                console.log(`完成幻灯片播放`);

                clearInterval(this.mIntervalId);
                this.mIntervalId = null;

                return;
            }

            this.mIndex = this.mIndex + this.mSliderArgs.PlusX;
        },

        render: function() {
            let opts = {};

            let a0 = arguments[0];
            opts.text = a0.Content;
            opts.alttext = a0.Content;
            opts.scaleX = this.mScale;
            opts.scaleY = this.mScale;

            const canvas = this.$refs.myCanvas;

            opts.bcid = "qrcode";

            try 
            {
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

    }
};