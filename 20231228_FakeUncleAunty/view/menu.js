const view_menu =
{
    template: 
`<div>
    <el-divider>合成语音</el-divider>
    <el-table
        ref="table0"
        :data="mMenuArr"
        :height="mTable_Height"
        :show-header="mTable_ShowHeader"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%">
        <el-table-column
            prop="DisplayName"
            label="主菜单">
        </el-table-column>        
    </el-table>    
</div>`,
    data: function ()
    {
        return {
            mTable_ShowHeader: false,
            mTable_Height: window.innerHeight - 90,            
            mMenuArr: [],
        };
    },
    mounted: function() {
        this.mMenuArr = routerArr.filter(i=>!i.IsIgnore)
    },
    methods: {
        handleCurrentChange: function(menu) {
            if(menu.path == "/view/Drawer")
            {
                console.log(app.__vue__._data.mDrawer);                
                app.__vue__._data.mDrawer = true;
                return;
            }

            app.__vue__.Set_Page_Header_Content(menu.DisplayName); // 修改 header
            this.$router.push(menu.path);
        },
    }
};