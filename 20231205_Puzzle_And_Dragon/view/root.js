const view_root =
{
    template: 
`<div>
    <el-input ref="txtDoCopy" 
        v-model="mText"
        style="opacity: 0%;
        display: block;
        position: absolute;
        x: 0px; y: 0px;"></el-input>
    <el-input
        placeholder="请输入关键词"
        prefix-icon="el-icon-search"
        v-model="mSearchArgs">
    </el-input>
    <el-table
        :data="resultArr"
        :height="mTable_Height"
        style="width: 100%"
        @cell-click="table_cell_clickHandler">
        <el-table-column
            prop="Value"
            label="Value">
        </el-table-column>
        <!--
        <el-table-column
            prop="DateTimeInfo"
            label="日期">
        </el-table-column>
        -->
        <el-table-column
            prop="KeyWord"
            label="关键词">
            <template slot-scope="scope">
                <el-tag
                    v-for="child in scope.row.Keyword"
                    style="margin-right: 5px; margin-bottom: 5px;">
                    {{child}}
                </el-tag>
            </template>
      </el-table-column>
    </el-table>
    <button ref="btn0"></button>
</div>`,
    data: function ()
    {
        return {            
            mSearchArgs: "",
            mTable_Height: window.innerHeight - 90,
            mArray: [], // 数据从 data.json 文件中获取
            mText: ""
        };
    },
    mounted: function() {
        fetch(`data/data.json`, {method: 'GET', mode: 'cors', credentials: 'include'})
        .then((resp)=>{
            resp.json()
            .then((data)=>{
                this.mArray = data;                
            })
            .catch((e)=>{
                this.$notify({
                    type: "warning",
                    title: "解析json时捕获异常",
                    message: `${e}`,
                });
            }); 
        })
        .catch((e)=>{
            this.$notify({
                type: "warning",
                title: "获取data.json时捕获异常",
                message: `${e}`,
            });
        });           
    },
    computed: {
        resultArr: function() {
            if(!this.mSearchArgs) 
            {
                return this.mArray;
            }
            const query = 
                Enumerable.from(this.mArray)            
                .where(i=> Enumerable.from(i.Keyword).count(j => j.indexOf(this.mSearchArgs) != -1 ) > 0 )            
                .toArray();
            
            return query;
        }
    },
    methods: {
        table_cell_clickHandler: function() {
            console.log(arguments);
            let div0 = arguments[2].firstChild;

            const data = arguments[0];
            this.mText = data.Value;

            // let editor = this.$refs.tAreaDoCopy;
            // this.$nextTick(() => {
            //     editor.select();
            //     const execResult2 = document.execCommand("copy");
            //     if (!execResult2) {
            //         console.log(`无法执行 execCommand('copy');`);
            //     }
            //     // editor.clearSelection();
            // });

            let txt0 = this.$refs.txtDoCopy.$el.firstElementChild;
            this.$nextTick(() => {                
                txt0.select();
                const execResult0 = document.execCommand("copy");
                if (!execResult0) {
                    console.log(`无法执行 execCommand('copy');`);
                }

                // div0.focus();
                // 取消选中区域
                window.getSelection().removeAllRanges();  

                // TODO 在手机浏览器中, 选中 input 输入框后, 会弹出键盘
                this.$refs.btn0.dispatchEvent(new Event('click')); // 模拟一个鼠标点击操作

                this.$notify({
                    type: "success",
                    position: 'bottom-left',
                    title: "提示",
                    message: `${this.mText} 已拷贝到粘贴板`,                    
                });
            });
        }
    }
};