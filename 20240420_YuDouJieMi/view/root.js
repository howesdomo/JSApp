const view_Root =
{
    template: 
`<div>
    <el-input
    type="textarea"
    :rows="14"
        placeholder="请输入密码"
        clearable
        v-model="txtSec">
    </el-input>

    <el-button type="primary" @click="JieMi">解密</el-button>

    <el-collapse v-model="activeNames">
        <el-collapse-item name="1" title="详细情况">
            <div>
                密码: {{txtPassword}}
            </div>
            <div>
                解密:
                <el-input
                    type="textarea"
                    :rows="8"
                    placeholder="请输入内容"
                    readonly
                    v-model="txtData">
                </el-input>
            </div>
        </el-collapse-item>
        <el-collapse-item name="2" title="简单结果">
            BlackCat:<el-input v-model="txtMatchBlackCat" readonly></el-input>
            V2: <el-input v-model="txtMatchV2" readonly></el-input>
        </el-collapse-item>
    </el-collapse>
</div>`,
    data: function ()
    {
        return {
            txtSec: "",
            txtPassword: "",
            txtData: "",
            activeNames: ['2'] // 手风琴默认开启
        };
    },
    mounted: function() {
        
    },
    computed: {
        txtMatchBlackCat: function() {
            if(this.txtData) {
                const arr = this.txtData.match("http[s]?://[A-Za-z0-9/.-]{1,}.yaml");
                if(arr == null)
                    return "0"
                else
                    return arr[0];
            }
            else
                return "null";
        },
        txtMatchV2: function() {
            if(this.txtData) {
                const arr = this.txtData.match("http[s]?://[A-Za-z0-9/.-]{1,}.txt");
                if(arr == null)
                    return "0"
                else
                    return arr[0];
            }
            else
                return "null";
        }
    },
    methods: {
        JieMi: function ()
        {
            let item = this.txtSec.toString();
            let pwd = 0;
            for(let i = 0; i < 10000; i++)
            {
                let current = i.toString().padStart(4, "0");
                try
                {
                    let a = CryptoJS.AES.decrypt(item, current);
                    let b = a.toString(CryptoJS.enc.Utf8);
                    let c = decodeURIComponent(b);
                    if ( c == 0 ) 
                    { 
                        console.log(`${i}解密失败`);
                        continue;
                    }
                    else
                    {
                        pwd = i;
                        this.txtPassword = pwd;
                        this.txtData = c;
                        break;
                    }
                }
                catch ( ex ) 
                {
                    // console.log(`ex ${current}: ${ex}`);
                }
            }
        }
    }
};