const view_Permission =
{
    template: `
<div>
    <div>
        以下所有权限都需要开启才能运行录屏功能
        <el-button type="text" @click="Permission_Check">刷新</el-button>
    </div>
    <el-table
        :height="385"
        :data="mPermissionArr"
        stripe>
        <el-table-column
            label="权限"
            prop="ShortName"
            width="180"
            style="font-size: 8px"
            >
        </el-table-column>

        <el-table-column
            label="描述"
            prop="WhyUsePermission"
            width="200"
            style="font-size: 8px"
            >
        </el-table-column>

        <el-table-column
            fixed="right"
            label="操作"
            width="60">
            <template slot-scope="scope">                
                <el-button
                    type="text"
                    size="small"
                    style="color: red"
                    v-if="!scope.row.IsDeclareInManifest">
                    未定义
                </el-button>

                <el-button
                    type="text"
                    size="small"
                    v-if="scope.row.IsDeclareInManifest && scope.row.GrantResult <= 0"
                    @click="requestPermission(scope.row.Name)">
                    开启
                </el-button>

                <el-button
                    type="text"
                    size="small"
                    style="color: green"
                    v-if="scope.row.IsDeclareInManifest && scope.row.GrantResult == 1">
                    已授权
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</div>`,
    data: function ()
    {
        return {
            mPermissionArr: //[],
            [
                { "WhyUsePermission": "测试样式1", "ShortName": "TestStyle_1", "IsDeclareInManifest": false, "GrantResult": 0 },
                { "WhyUsePermission": "测试样式2", "ShortName": "TestStyle_2", "IsDeclareInManifest": true, "GrantResult": 0 },                
                { "WhyUsePermission": "测试样式3", "ShortName": "TestStyle_3", "IsDeclareInManifest": true, "GrantResult": 1 },                
                { "WhyUsePermission": "测试样式4", "ShortName": "TestStyle_4", "IsDeclareInManifest": true, "GrantResult": -1 },                
            ], 
        };
    },
    mounted: function() {
        this.mPermissionArr = this.Permission_Check();
    },
    methods: {

        //#region 权限列表
        Permission_Check: function() {
            const jsonStr = $device.Permission_GetPermissionInfoList();
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
        
        //#endregion
    }
};