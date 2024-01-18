const view_root =
{
    template: 
`<div style="margin: 5px 25px">
    <el-collapse v-model="mActiveNames" @change="handleChange">
        <el-collapse-item v-for="group in mGroupList" :title="group.Name" :name="group.Key">            
            <div v-for="item in mData" v-if="group.Key == item.GroupKey"
                style="margin-top: 15px"
            >
                <el-link type="primary" :href="item.href">{{ (item.Index + 1).toString().padStart(2, '0') }} - {{ item.title }}</el-link>
            </div>
        </el-collapse-item>       
    </el-collapse>
</div>`,
    data: function ()
    {
        return {
            mGroupList: [
                { "Key": 0, "Name": "日常生活", "Seq": 0 },
                { "Key": 1, "Name": "幼崽", "Seq": 1 },
                { "Key": 2, "Name": "办公", "Seq": 2 },
                { "Key": 3, "Name": "音乐", "Seq": 3 },
                { "Key": 4, "Name": "游戏", "Seq": 4 },
            ],
            mData: [
                { "Index": 0, "title": "emoji放大器", "href": "20230725_ZoomInEmoji", "GroupKey": 1 },
                { "Index": 1, "title": "红外遥控器", "href": "20230725_TV_IR_Controller", "GroupKey": 0 },
                { "Index": 2, "title": "Excel文件读取", "href": "20230725_io-excel", "GroupKey": 2 },
                { "Index": 3, "title": "今日补D咩", "href": "20230912_FengSupplement", "GroupKey": 1 },                
                { "Index": 4, "title": "歌词编辑器", "href": "20231124_LyricEditor", "GroupKey": 3 },
                { "Index": 5, "title": "智龙迷城合作搜索", "href": "20231205_Puzzle_And_Dragon", "GroupKey": 4 },
                { "Index": 6, "title": "古诗文", "href": "20231206_ClassicalChineseReading", "GroupKey": 1 },
                { "Index": 7, "title": "虚拟叔叔姨姨", "href": "20231228_FakeUncleAunty", "GroupKey": 1 },
                { "Index": 8, "title": "歌词导出", "href": "20240117_LyricExport", "GroupKey": 3 },
            ],
            mActiveNames: [0, 1, 2, 3, 4], // 展开的栏位
        };
    },
    mounted: function() {
        this.mGroupList = Enumerable.from(this.mGroupList).orderBy(i => i.Seq).toArray(); // 按 Seq 重新排序
    },
    methods: {
        
    }
};