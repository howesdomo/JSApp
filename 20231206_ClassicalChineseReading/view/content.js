const view_Content =
{
    template: `
<div>
    <el-page-header
        :content="mData.Title"
        @back="page_header_goBack_OnClick">
    </el-page-header>

    <!-- 
        <el-row>{{mData.Title}}</el-row>
    -->
    <el-row>{{mData.Author}}</el-row>
    <el-row>
        <el-table 
            :data="mData.Content"
            :show-header="false">
            <el-table-column label="值">
                <template v-slot="{row}">
                    {{ row }}
                </template>
            </el-table-column>
        </el-table>
    </el-row>
</div>`,
    data: function ()
    {
        return {
            mData: {
                "Key": "2023-12-06 09:40:52",
                "Title": "江南",
                "Author": "汉乐府〔两汉〕",
                "Content": [
                    "江南可采莲，莲叶何田田。鱼戏莲叶间。",
                    "鱼戏莲叶东，鱼戏莲叶西，鱼戏莲叶南，鱼戏莲叶北。"
                ]
            }
        };
    },
    mounted: function() {
        console.log("run mounted");
        
        // 获取路由传递过来的参数
        console.log("$route.query", this.$route.query);
        console.log("$route.params", this.$route.params);
        
        this.mData = JSON.parse(this.$route.query.jsonStr)
    },
    methods: {
        page_header_goBack_OnClick: function() {
            this.$router.go(-1);
        }
    }
};