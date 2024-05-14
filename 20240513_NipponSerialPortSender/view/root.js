const view_Root =
{
    template: 
`<div>
    <el-button type="primary" @click="selectSerailPort">1.选择串口</el-button>

    <el-card v-if="!mPort_IsOpen">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="波特率">
                <el-select v-model="mBaudRate" placeholder="请选择">
                    <el-option
                        v-for="item in mBaudRateArr"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="数据位">                
                <el-select v-model="mDataBits" placeholder="请选择">
                    <el-option
                        v-for="item in mDataBitsArr"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="校验位">
                <el-select v-model="mParity" placeholder="请选择">
                    <el-option
                        v-for="item in mParityArr"
                        :key="item.Value"
                        :label="item.DisplayValue"
                        :value="item.Value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="停止位">
                <el-select v-model="mStopBits" placeholder="请选择">
                    <el-option
                        v-for="item in mStopBitsArr"
                        :key="item.Value"
                        :label="item.DisplayValue"
                        :value="item.Value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>

    
    <el-card v-if="mPort_IsSelected">
        <el-button type="primary" @click="openSerial">2.打开串口</el-button>
        <el-button type="primary" @click="closeSerial">关闭串口</el-button>
    </el-card>
    
    <el-card v-if="mPort_IsOpen">
        <el-button type="primary" @click="importData">3.导入数据</el-button>
        <input ref="upload0" id="btnFileInput" type="file" style="display: none;" @change="upload0_ChangeEvent_Handler" />
        <el-button type="primary" @click="btnSend">4.发送选中行内容</el-button>

        <el-tag>按键盘 S 发送内容</el-tag>

        <!-- v-slot是Vue.js 2.6.0版本中引入的新语法，用于替代旧的slot-scope语法。
        v-slot="{row}"中的{row}是一个解构赋值，用于从插槽的作用域中提取数据。在这个例子中，它提取了当前行的数据。 -->
        <el-table 
            ref="singleTable"
            height="530" 
            :data="mArr"
            highlight-current-row
            @row-click="handleRowClick"
        >
            <el-table-column
                type="index"
                width="50">
            </el-table-column>
            <el-table-column label="值">
                <template v-slot="{row}">
                    {{ row }}
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</div>`,
    data: function ()
    {
        return {
            mIsSupportSerialPort: false,           
            mBaudRateArr: [110, 300, 1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200, 230400, 460800, 921600],
            mBaudRate: 9600,

            mDataBitsArr: [5, 6, 7, 8],
            mDataBits: 8,

            mParityArr: [ { "DisplayValue": "None(无)", "Value": "none" }, { "DisplayValue": "Odd(奇校验)", "Value": "odd" }, { "DisplayValue": "Even(偶校验)", "Value": "even" } ],
            mParity: "none",

            mStopBitsArr: [ { "DisplayValue": "None(无)", "Value": 0 }, { "DisplayValue": "1", "Value": 1 }, { "DisplayValue": "1.5", "Value": 1.5 }, { "DisplayValue": "2", "Value": 2 } ],
            mStopBits: 1,

            mPort: null,
            mPort_IsOpen: false,
            mContent: "",
            mIndex: 0,
            mArr: []
        };
    },
    mounted: function() {        
        if (!('serial' in navigator)) {
            console.warn('Web Serial API is not supported.');
            return;
        }
        
        this.mIsSupportSerialPort = true;

        // 在 document 上添加 keydown 和 keyup 事件
        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("keyup", this.handleKeyUp);
    },
    computed: {
        mPort_IsSelected: function() {
            return this.mPort != null;
        }
    },
    methods: {
        selectSerailPort: async function() {
            let that = this;
            // 客户端授权
            try {
                await navigator.serial.requestPort().then(async (port) => {
                    // 关闭旧的串口
                    that.mPort?.close();
                    await that.mPort?.forget();
                    that.mPort = port;
                })
            } catch (e) {
                console.error('获取串口权限出错' + e.toString())
            }
        },

        //关闭串口
        closeSerial: async function () {
            if (this.mPort) {
                this.mPort_IsOpen = false
                
                this.mPort.close();
				await this.mPort.forget();
            }
        },
        
        //打开串口
        openSerial: async function () {
            // let SerialOptions = {
            //     baudRate: parseInt(get('serial-baud')),
            //     dataBits: parseInt(get('serial-data-bits')),
            //     stopBits: parseInt(get('serial-stop-bits')),
            //     parity: get('serial-parity'),
            //     bufferSize: parseInt(get('serial-buffer-size')),
            //     flowControl: get('serial-flow-control'),
            // };

            let SerialOptions = {
                baudRate: this.mBaudRate,
                dataBits: this.mDataBits,
                stopBits: this.mStopBits,
                parity: this.mParity
            };

            let that = this;
            this.mPort
                .open(SerialOptions)
                .then(() => {
                    that.mPort_IsOpen = true;

                    // serialToggle.innerHTML = '关闭串口'
                    // serialOpen = true
                    // serialClose = false
                    // disabledOptions(true)
                    // localStorage.setItem('serialOptions', JSON.stringify(SerialOptions))
                    // readData()

                })
                .catch((e) => {
                    console.error(`打开串口失败:`);
                    console.error(e);
                })
        },

        //串口数据收发
        send: async function () {
            if (!this.mContent) {
                // addLogErr('发送内容为空')
                return;
            }

            // if (toolOptions.hexSend) {
            //     await sendHex(content);
            // } else {
            //     await sendText(content);
            // }

            await this.sendText(this.mContent);
        },

        //发送HEX到串口
        sendHex: async function (hex) {
            const value = hex.replace(/\s+/g, '')
            if (/^[0-9A-Fa-f]+$/.test(value) && value.length % 2 === 0) {
                let data = []
                for (let i = 0; i < value.length; i = i + 2) {
                    data.push(parseInt(value.substring(i, i + 2), 16))
                }
                await writeData(Uint8Array.from(data))
            } else {
                addLogErr('HEX格式错误:' + hex)
            }
        },

        // 发送ASCII到串口
        sendText: async function (text) {
            const encoder = new TextEncoder()
            this.writeData(encoder.encode(text))
        },

        //写串口数据
        writeData: async function (data) {
            // if (!serialPort || !serialPort.writable) {
            //     addLogErr('请先打开串口再发送数据')
            //     return
            // }
            const writer = this.mPort.writable.getWriter()
            // if (toolOptions.addCRLF) {
            //     data = new Uint8Array([...data, 0x0d, 0x0a])
            // }

            data = new Uint8Array([...data, 0x0d, 0x0a])
            await writer.write(data)
            writer.releaseLock()
            // addLog(data, false)
        },

        handleRowClick: function(row, event, column) {
            console.log(`点击中`, row);
            this.sendText(row);
            let i = this.mArr.indexOf(row);
            if(i<0)
            {
                i = 0;
            }
            this.mIndex = i;
        },

        setCurrent(row) {
            this.$refs.singleTable.setCurrentRow(row);
        },


        btnSend() {
            let row = this.mArr[this.mIndex];
            this.sendText(row);
        },

        sendAndMoveNext() {
            let row = this.mArr[this.mIndex];
            this.setCurrent(row);
            this.sendText(row);

            if(this.mArr.length > this.mIndex + 1)
            {
                this.mIndex++;
            } 
        },

        sendAndMovePrevois() {
            let row = this.mArr[this.mIndex];
            this.setCurrent(row);
            this.sendText(row);

            if(this.mIndex - 1 >= 0)
            {
                this.mIndex--;
            } 
        },


        
        importData: function() {
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

                    // 将读取到的值复制到 编辑器中

                    // editor.session.setMode("ace/mode/json"); // TODO 根据文件类型设置 ace 编辑器的格式
                    // editor.getSession().setValue(this.result);
                    
                    let arr = this.result.split(/\r\n|\r|\n/);
                    arr = arr.filter(line => line.trim() !== '');
                    that.mArr = arr;
                };
            }
        },


        //#region 监听键盘
        handleKeyDown: function(e) {
            // if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
            //     this.onShift = true;
            // }

            // if (e.code === "KeyC") {
            //     this.onC = true;
            // }

            // if (e.code === "KeyM") {
            //     this.onM = true;
            // }

            // // 判断是否同时按下了 shift 和 c 键
            // if (this.onShift && this.onC) {
            //     this.onC = false;
            //     this.btnPause();
            //     return;
            // }

            // // 判断是否同时按下了 shift 和 m 键
            // if (this.onShift && this.onM) {
            //     this.onM = false;
            //     this.btnPlay();
            //     return;
            // }
        },
        // 定义一个方法，用于处理 keyup 事件
        handleKeyUp: function(e) {
            if (e.code === "KeyS") {
                this.sendAndMoveNext();
                return;
            }
        },
        //#endregion
    }
};