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
    <el-row>
        <el-col>            
            <el-radio v-model="mSelectedLang" label="汉">汉</el-radio>
            <el-radio v-model="mSelectedLang" label="英">英</el-radio>
        </el-col>
        <!--
        <el-col>
            <el-input
                placeholder="请输入关键词"
                prefix-icon="el-icon-search"
                clearable
                v-model="mSearchArgs">
            </el-input>
        </el-col>
        -->
    </el-row>
    <el-table
        :data="resultArr"
        :height="mTable_Height"
        style="width: 100%"
        @cell-click="table_cell_clickHandler">
        <el-table-column
            prop="Key"
        >
            <template slot-scope="scope">
                <el-tag
                    :color="scope.row.Key"
                    style="width: 100px; height: 100px;"
                    >
                </el-tag>                
            </template>
        </el-table-column>
       
        <el-table-column
            prop="Chinese"
            label="中文"
            >
        </el-table-column>

        <el-table-column
            prop="English"
            label="英文"
            >
        </el-table-column>        
    </el-table>
    共 {{mArray.length}} 种颜色
</div>`,
    data: function ()
    {
        return {            
            mAuthorArray: [], // 数据从 author.json 文件中获取
            mSearchArgs: "",
            mTable_Height: window.innerHeight - 130,
            mSelectedLang: "汉", // 选择的语音, 默认汉
            mArray: [], // 数据从 data.json 文件中获取            
        };
    },
    mounted: function() {
        this.getData(); // 获取颜色列表
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
        getData: function() {
            fetch(`data/data.json`, {method: 'GET', mode: 'cors', credentials: 'include'})
            .then((resp)=>{
                resp.json()
                .then((data)=>{
                    // // 古诗词集合 left join 作者列表
                    // const query = Enumerable.from(data).groupJoin(this.mAuthorArray, "$.Author", "$.Author", (left, right) => ({
                    //     ...left,
                    //     Age: right.select(r => r.Age).firstOrDefault() // left join
                    // })).toArray();
                        
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

            let now = Date.now();
            if(this.mDateTime)
            {
                if(now - this.mDateTime < 1000)
                {
                    console.error(`播放按得太快了`);
                    return;
                }
            }

            this.mIsPlaying = true;
            
            try 
            {
                this.mDateTime = now;

                const data = arguments[0];
                console.log(data);
                switch(this.mSelectedLang)
                {
                    case '汉':
                        $device.TTS_Play(data.Chinese);                
                        break;
                    case '英':
                        $device.TTS_Play(data.English);                
                        break;
                    default:
                        break;
                }                
            }
            finally
            {
                this.mIsPlaying = false; 
            }
        }
    }
};