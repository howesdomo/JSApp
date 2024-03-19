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
            label="罗马音"
            width="70">
            <template slot-scope="scope">
                <div style="font-size: 18px">{{scope.row.Content}}</div>
            </template>
        </el-table-column>       
        <el-table-column
            label="平假名"
            width="160">
            <template slot-scope="scope">
                <img :src="scope.row.HiraganaImage" :title="scope.row.Hiragana" style="max-width: 130px;">
            </template>
        </el-table-column>
        <el-table-column
            label="片假名">
            <template slot-scope="scope">
                <img :src="scope.row.KatakanaImage" :title="scope.row.Katakana" style="max-width: 130px;">
            </template>
        </el-table-column>
    </el-table>
    共 {{mArray.length}} 个
</div>`,
    data: function ()
    {
        return {
            mSearchArgs: "",
            mTable_Height: window.innerHeight - 130,
            mArray: [], // 数据从 data.json 文件中获取
            
            mIsPlaying: false,
            mDateTime: null
        };
    },
    mounted: function() {
        this.getData();
    },
    computed: {
        resultArr: function() {
            if(!this.mSearchArgs) 
            {
                return this.mArray;
            }

            const query = 
                Enumerable.from(this.mArray)
                .where( i=> i.Content.indexOf(this.mSearchArgs) >= 0 || i.HiraganaContent.indexOf(this.mSearchArgs) >= 0 || i.KatakanaContent.indexOf(this.mSearchArgs) >= 0 )
                .toArray();
            
            return query;
        }
    },
    methods: {
        getData: function() {
            fetch(`data/data.json`, {method: 'GET', mode: 'cors', credentials: 'include'})
            .then((resp)=>{
                resp.json()
                .then((data)=>{
                    data.forEach(i=> {
                        // 组织图片资源路径
                        i.HiraganaImage = `/20240319_LearningJapaneseWritingStep/img/Hiragana/${i.ID}_${i.Content}.gif`;
                        i.KatakanaImage = `/20240319_LearningJapaneseWritingStep/img/Katakana/${i.ID}_${i.Content}.gif`;
                    });
                        
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

        table_cell_clickHandler: function() {
            if(this.mIsPlaying) {
                return;
            }

            const data = arguments[0];
            console.log(data);
            
            // this.$router.push({ path: '/view/Content', query: { "jsonStr": JSON.stringify(data) }});


            let now = Date.now();
            if(this.mDateTime)
            {
                if(now - this.mDateTime < 1 * 1000)
                {
                    console.error(`播放按得太快了`);
                    return;
                }
            }

            this.mIsPlaying = true;
            
            try 
            {
                this.mDateTime = now;

                const text = data.HiraganaContent;
                $device.TTS_Play(text);
            }
            finally
            {
                this.mIsPlaying = false; 
            }
        }
    }
};