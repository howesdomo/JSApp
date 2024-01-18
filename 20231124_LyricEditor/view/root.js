const view_root =
{
    template: 
`		<el-container style="height: 100%;">
<el-header style="background-color: #f0f9eb;">				
    <el-row style="margin-top: 5px; margin-bottom: 5px;">
        <el-button type="primary" @click="btnSelectMP3">打开mp3</el-button>
        <input ref="upload0" id="btnFileInput" type="file" style="display: none;" @change="upload0_ChangeEvent_Handler" />

        <!-- #region 导入歌词按钮 -->
        <el-button type="primary" @click="dialogVisible_ImportLylic = true">导入歌词</el-button>
        <el-dialog title="导入歌词" :visible.sync="dialogVisible_ImportLylic">
            <el-row>
                <el-col>
                    <el-input type="textarea" :rows="16" placeholder="请输入歌词" v-model="mTempLylic"></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-top: 10px;">
                <el-col :span="3">
                    <el-button type="primary" @click="importLylic">导入</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button @click="dialogVisible_ImportLylic=false">取消</el-button>
                </el-col>
            </el-row>
        </el-dialog>
        <!-- #endregion -->
    
        <el-divider direction="vertical"></el-divider>

        <span>
            {{fileName}}
        </span>
        
        <el-divider direction="vertical"></el-divider>

        <span>
            当前秒数: {{ currentTime_Fixed }}
        </span>

        <el-divider direction="vertical"></el-divider>

        <span>
            当前分秒: {{ currentTime_MinuteSecond }}
        </span>
        
    </el-row>
</el-header>
<el-main style="background-color: #f2f2f2;">
    <el-row>
        <el-col :span="11">
            <el-table :data="mLeftArr" height="600" border highlight-current-row>
                <el-table-column prop="Time" label="时间" width="80">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row.TimeSecond)" type="text" size="medium">{{scope.row.Time}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="Text" label="内容" size="medium">
                </el-table-column>
            </el-table>
        </el-col>

        <el-col :span="2">
            <el-row>
                <el-col>
                    <el-button @click="btnMoveRight">原封右移 ( O )</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-button @click="btnChangeTimeMoveRight">替换时间 ( P )</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-button @click="btnRollbackLast">撤销上次 ( R )</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-button type="danger" @click="btnLeftArr_DeleteFirstRow">删左第一 ( D )</el-button>
                </el-col>
            </el-row>
        </el-col>

        <el-col :span="11">
            <el-card>
                歌词Next: <span style="color: #606266; font-size: 23px;">{{ mLeftArr_First }}</span>
            </el-card>
            <el-table 
                ref="dt1" 
                height="475" 
                :data="mRightArr" 
                :row-class-name="tableRowClassName"
                border>
                <el-table-column prop="Time" label="时间" width="80">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row.TimeSecond)" type="text" size="medium">{{scope.row.Time}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="Text" label="内容" size="medium"></el-table-column>
            </el-table>
            <el-card>
                歌词Next: <span style="color: #606266; font-size: 23px;">{{ mLeftArr_First }}</span>
            </el-card>
        </el-col>
    </el-row>
</el-main>
<el-footer style="background-color: black;">
    <div>
        <el-row style="margin-top: 12px; margin-bottom: 12px;">
            <el-col :span="4">
                <el-button type="primary" @click="btnPlay">播放 ( Shift + M ) </el-button>
            </el-col>

            <el-col :span="4">
                <el-button type="info" @click="btnPause">暂停 ( Shift + C ) </el-button>
            </el-col>

            <el-col :span="4">
                <el-button type="success" @click="btnExportLylic">导出歌词</el-button>
            </el-col>
            
            <el-col :span="4">
                <el-link type="danger">退回/快进5秒 : 方向键左/右</el-link>
            </el-col>
        </el-row>
        <el-row>
            <audio 
                style="width: 100%;" 
                controls 
                @timeupdate="updateCurrentTime"
                ref="audio0"
                >
                <source src="" type="audio/mpeg">
                <!-- <source src="/assets/林家谦 - 时光倒流一句话 (feat. 张敬轩)(live 2021).mp3" type="audio/mpeg"> -->
                Your browser does not support the audio element.
            </audio>
        </el-row>
    </div>
</el-footer>
</el-container>`,
    data: function () {
        return {
            // 定义两个变量，用于记录 shift 和 c 的按键状态
            onShift: false,
            onC: false,
            onM: false,


            // ========== local ==========
            fileName: ``, // 文件名称
            currentTime: 0, // 音频播放进度
            dialogVisible_ImportLylic: false, // 导入歌词对话框
            mTempLylic: ``, // 临时歌词 ( 未导入 )
            mLeftArr: [], // 左边 ( 未核实的歌词 )
            mRightArr: [], // 右边 ( 正确的歌词 )
            mLeftArr_First: ""
        };
    },
    mounted: function() {
        // 在 document 上添加 keydown 和 keyup 事件
        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("keyup", this.handleKeyUp);
    },
    unmounted(el) {
			
    },
    computed: {
        currentTime_Fixed() {
            return this.currentTime.toFixed(2);
        },
        currentTime_MinuteSecond () {
            return formatTime(this.currentTime_Fixed);
        }
    },
    watch: {

    },
    methods: {
        //#region 监听键盘
        handleKeyDown: function(e) {
            if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
                this.onShift = true;
            }

            if (e.code === "KeyC") {
                this.onC = true;
            }

            if (e.code === "KeyM") {
                this.onM = true;
            }

            // 判断是否同时按下了 shift 和 c 键
            if (this.onShift && this.onC) {
                this.onC = false;
                this.btnPause();
                return;
            }

            // 判断是否同时按下了 shift 和 m 键
            if (this.onShift && this.onM) {
                this.onM = false;
                this.btnPlay();
                return;
            }
        },
        // 定义一个方法，用于处理 keyup 事件
        handleKeyUp: function(e) {
            if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
                this.onShift = false;
                return;
            }
            
            if (e.code === "KeyC") {
                // 如果是，将 onC 设为 false
                this.onC = false;
                return;
            }

            if (e.code === "KeyD") {
                this.btnLeftArr_DeleteFirstRow();
                return;
            }

            if (e.code === "KeyM") {
                this.onM = false;
                return;
            }

            if (e.code === "KeyO") {
                this.btnMoveRight();
                return;
            }

            if (e.code === "KeyP") {
                this.btnChangeTimeMoveRight();
                return;
            }

            if (e.code === "KeyR") {
                this.btnRollbackLast();
                this.btnPause();
                return;
            }

            if (e.code === "ArrowLeft") {
                this.$refs.audio0.currentTime = this.currentTime - 5;
                return;
            }

            if (e.code === "ArrowRight") {
                this.$refs.audio0.currentTime = this.currentTime + 5;
                return;
            }
        },
        //#endregion

        //#region audio控件 监听 播放时间更新事件

        updateCurrentTime: function (event) {
            this.currentTime = event.target.currentTime;
        },

        //#endregion 

        btnSelectMP3: function() {
            this.$refs.upload0.click();
        },

        upload0_ChangeEvent_Handler(event) {
            const files = event.target.files;
            const that = this;
            for (let index = 0; index < files.length; index++) {
                const fileReader = new FileReader();

                let selectedFile = files[index];
                this.fileName = selectedFile.name;
                fileReader.readAsDataURL(selectedFile);

                fileReader.onload = function () {
                    const base64Str = this.result;
                    that.$refs.audio0.src = base64Str;
                    that.btnPlay();
                };

                jsmediatags.read(selectedFile, {
                    onSuccess: function(tag) {
                        if(tag.tags.lyrics && tag.tags.lyrics.lyrics) {
                            console.debug("歌曲内嵌歌词信息");
                            console.log(tag.tags.lyrics.lyrics);

                            that.mTempLylic = tag.tags.lyrics.lyrics;
                            that.importLylic();
                        }
                    },
                    onError: function(error) {
                        console.log(error)   
                    }
                });
            }
        },
        
        importLylic: function () {
            if(!this.mTempLylic) {
                this.$notify({
                    type: "error",
                    title: "捕获异常",
                    message: "歌词为空",
                });
                return;
            }

            let arr = this.mTempLylic.split(/\n|\r|\r\n/);
            let r = [];
            arr.forEach(item => {
                if (item) {
                    r.push(new Lyric(item));
                }
            });
            
            console.log("导入歌词成功。");
            console.log(r);

            this.mLeftArr = r;
            this.getLeftArrFist();

            this.mRightArr = [];

            this.dialogVisible_ImportLylic = false;
        },

        getLeftArrFist: function() {
            if(this.mLeftArr && this.mLeftArr.length > 0)
                this.mLeftArr_First = this.mLeftArr[0].Text;
            else
                this.mLeftArr_First = "";
        },

        btnMoveRight: function () {
            try {
                this.mRightArr.push(this.mLeftArr[0]);
                this.mLeftArr.shift();
                this.getLeftArrFist();

                // TODO 尝试使用防抖函数
                setTimeout(() => {
                    this.scrollToEnd();
                }, 200);
                // Debounce(this.scrollToEnd); // TODO 无法进入 防抖函数
            }
            catch (e) {
                console.error(e);
                debugger;
            }
        },
        btnChangeTimeMoveRight: function () {
            const toChange = this.mLeftArr[0];
            const time = this.currentTime;
            toChange.TimeSecond = time; // 更新秒数
            toChange.Time = formatTime(time.toFixed(2)); // 更新 MM:SS 显示方式
            this.mRightArr.push(toChange);
            this.mLeftArr.shift();
            this.getLeftArrFist();

            // TODO 尝试使用防抖函数
            setTimeout(() => {
                this.scrollToEnd();
            }, 200);
        },
        scrollToEnd: function () {
            let index = this.mRightArr.length - 1;
            const wrapper = this.$refs.dt1.bodyWrapper;
            const rows = wrapper.children[0].rows;
            if (rows[index]) {
                wrapper.scrollTop = rows[index].offsetTop;
            }
        },

        btnRollbackLast: function() {
            if(this.mRightArr.length <= 0) {
                return;
            }
            let index = this.mRightArr.length - 1;
            this.mLeftArr.unshift(this.mRightArr[index]);
            this.mRightArr.pop();
            this.getLeftArrFist();
        },

        btnLeftArr_DeleteFirstRow: function() {
            if(!this.mLeftArr || this.mLeftArr.length == 0) 
                return;

            this.$confirm('确认删除？')
            .then(_ => {            	
                this.mLeftArr.shift();
                this.getLeftArrFist();

                done();
            })
            .catch(_ => {});
        },

        handleClick:function(timeSecond) {				
            this.$refs.audio0.currentTime = timeSecond;
            this.$refs.audio0.play();
        },

        btnPlay: function() {
            this.$refs.audio0.play();
        },

        btnPause: function() {
            this.$refs.audio0.pause();				
        },

        //#region 导出歌词
        
        btnExportLylic: function() {
            if(this.mRightArr.length <= 0) {
                this.$notify({
                    type: "error",
                    title: "捕获异常",
                    message: "歌词列表为空值",
                });
                return;
            }

            // 检查是否存在异常
            const errorArr = this.validateTime();
            if(errorArr.length > 0) {
                this.$notify({
                    type: "error",
                    title: "捕获异常",
                    message: "歌词存在异常",
                });
                return;
            }			

            // 拼接歌词文本
            const r = this.mRightArr.map(item => item.Display).join('\n');
            
            // 文本下载
            let blob = new Blob([r], { type: "text/plain;charset=utf-8" });
            saveAs(blob, `${this.fileName}.lrc`);
        },

        tableRowClassName: function({row, rowIndex}) {
            if(row.IsError) {
                return 'warning-row';
            }
            return '';
        },

        validateTime: function() {
            let errorArr = [];
            for(let i = 0; i < this.mRightArr.length; i++) {
                if(i == 0) continue;
                if(this.mRightArr[i-1].Time >= this.mRightArr[i].Time) {
                    errorArr.push(i);
                    this.mRightArr[i].IsError = true;
                }
            }
            return errorArr;
        },

        //#endregion
    }
};