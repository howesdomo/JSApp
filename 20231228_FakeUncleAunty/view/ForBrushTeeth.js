const view_ForBrushTeeth =
{
    template: `
<div>
    <el-page-header @back="$router.go(-1)" content="场景: 刷牙"></el-page-header>
    <el-row v-for="item in mArray"
        style="margin-top: 10px;"
    >
        <el-tag @click="onClickHandler(item)">{{item.DisplayName}}</el-tag>
    </el-row>
</div>`,
    data: function ()
    {
        return {
            mArray: [
                {
                    "ID": "2023-12-07 15:39:15",
                    "DisplayName": "边个小朋友系度玩水。边个玩水就批评佢！",
                    "Value": "边个小朋友系度玩水。边个玩水就批评佢！",
                    "Pitch": 0.9,
                    "SpeechRate": 1.2
                },
                {
                    "ID": "2023-12-07 15:41:46",
                    "DisplayName": "阿峰仔，你要认真啲刷牙咯",
                    "Value": "阿峰仔，你要认真啲刷牙咯",
                    "Pitch": 0.9,
                    "SpeechRate": 1.2
                },
            ]
        };
    },
    mounted: function() {
        
    },
    methods: {
        onClickHandler: function() {
            const row = arguments[0];
            console.log(row);

            $device.TTS_SetPitch(row.Pitch, false);
            $device.TTS_SetSpeechRate(row.SpeechRate, false);
            $device.TTS_Play(row.Value);
        },
    }
};