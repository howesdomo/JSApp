Vue.component
(
    "ho-js-version",
    {
        template: `
<el-card>
    <div>本项目使用的js库情况</div>
    <el-table
        :data="libVersionArr"
        :stripe=true
        style="width: 100%">
        <el-table-column
            label="库"
            prop="key"
            ></el-table-column>
        <el-table-column
            label="版本"
            prop="value"
            ></el-table-column>
    </el-table-column>
  </el-table>
</el-card>`,
        data: function ()
        {
            return {
                libVersionArr: [
                    {
                        "key": "vue.js",
                        "value": Vue.version
                    },
                    {
                        "key": "vue-router.js",
                        "value": VueRouter.version
                    },
                    {
                        "key": "Element-Ui",
                        "value": ELEMENT.version
                    },
                    {
                        "key": "axios",
                        "value": axios.VERSION
                    },
                    {
                        "key": "linq.js",
                        "value": Enumerable.VERSION
                    }
                ]
            }
        }
    }
);