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

    <el-input
        placeholder="请输入关键词"
        prefix-icon="el-icon-search"
        clearable
        v-model="mSearchArgs">
    </el-input>
    <el-table
        :data="resultArr"
        :height="mTable_Height"
        style="width: 100%"
        @cell-click="table_cell_clickHandler">
        <el-table-column
            prop="Title"
            label="古诗文名称">
        </el-table-column>
        
        <el-table-column
            prop="Author"
            label="作者"
            width="70"
            >
        </el-table-column>
        
        <el-table-column
            prop="KeyWord"
            label="内容">
            <template slot-scope="scope">
                <el-tag 
                    v-for="child in scope.row.Content"
                    :key="scope.index"
                    style="margin-right: 5px; margin-bottom: 5px;">
                    {{child}}
                </el-tag>                
            </template>
      </el-table-column>
    </el-table>
    共 {{mArray.length}} 篇文章
</div>`,
    data: function ()
    {
        return {            
            mAuthorArray: [], // 数据从 author.json 文件中获取
            mSearchArgs: "",
            mTable_Height: window.innerHeight - 130,
            mArray: [], // 数据从 data.json 文件中获取            
        };
    },
    mounted: function() {
        this.getAuthor(); // 获取作者列表和古诗词列表
    },
    computed: {
        resultArr: function() {
            if(!this.mSearchArgs) 
            {
                return this.mArray;
            }

            const query = 
                Enumerable.from(this.mArray)
                .where( i=> i.Title.indexOf(this.mSearchArgs) >= 0 || i.Author.indexOf(this.mSearchArgs) >= 0 || Enumerable.from(i.Content).count(j => j.indexOf(this.mSearchArgs) >= 0 ) > 0 )
                .toArray();
            
            return query;
        }
    },
    methods: {
        getAuthor: function() {        
            fetch(`data/author.json`, {method: 'GET', mode: 'cors', credentials: 'include'})
            .then((resp)=>{
                resp.json()
                .then((data)=>{
                    this.mAuthorArray = data;
                    this.getData();
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

        getData: function() {
            fetch(`data/data.json`, {method: 'GET', mode: 'cors', credentials: 'include'})
            .then((resp)=>{
                resp.json()
                .then((data)=>{
                    // 古诗词集合 left join 作者列表
                    const query = Enumerable.from(data).groupJoin(this.mAuthorArray, "$.Author", "$.Author", (left, right) => ({
                        ...left,                        
                        Age: right.select(r => r.Age).firstOrDefault() // left join
                    })).toArray();
                        
                    this.mArray = query;
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

        table_cell_clickHandler: function() {
            const data = arguments[0];
            console.log(data);
            
            this.$router.push({ path: '/view/Content', query: { "jsonStr": JSON.stringify(data) }});
        }
    }
};