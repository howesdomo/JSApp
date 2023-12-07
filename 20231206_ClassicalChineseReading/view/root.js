const view_Root =
{
    template: 
`<div>
    <el-input
        placeholder="请输入关键词"
        prefix-icon="el-icon-search"
        clearable
        v-model="mSearchArgs">
    </el-input>
    <el-table
        :data="resultArr"
        height="450"
        style="width: 100%"
        @cell-click="table_cell_clickHandler">
        <el-table-column
            prop="Title"
            label="古诗文名称"
            width="300">
        </el-table-column>
        
        <el-table-column
            prop="Author"
            label="作者"
            width="130">
        </el-table-column>
        
        <el-table-column
            prop="KeyWord"
            label="内容">
            <template slot-scope="scope">
                <el-tag 
                    v-for="child in scope.row.Content"
                    style="margin-right: 5px; margin-bottom: 5px;">
                    {{child}}
                </el-tag>                
            </template>
      </el-table-column>
    </el-table>    
</div>`,
    data: function ()
    {
        return {            
            mSearchArgs: "",
            mArray: [], // 数据从 data.json 文件中获取
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
                .where( i=> i.Title.indexOf(this.mSearchArgs) >= 0 || i.Author.indexOf(this.mSearchArgs) >= 0 || Enumerable.from(i.Content).count(j => j.indexOf(this.mSearchArgs) >= 0 ) > 0 )
                .toArray();
            
            return query;
        }
    },
    methods: {
        table_cell_clickHandler: function() {
            const data = arguments[0];
            console.log(data);
            
            this.$router.push({ path: '/view/Content', query: { "jsonStr": JSON.stringify(data) }});
        }
    }
};