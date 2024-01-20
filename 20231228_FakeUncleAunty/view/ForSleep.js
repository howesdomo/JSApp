const view_ForSleep =
{
    template: `
<div style="margin-bottom: 15px;">
    <el-page-header @back="$router.go(-1)" content="场景: 瞓教"></el-page-header>
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
                    "DisplayName": "等我睇下边个小朋友仲未瞓觉先",
                    "Value": "等我睇下边个小朋友仲未瞓教先",
                    "Pitch": 0.9,
                    "SpeechRate": 0.8
                },
                {
                    "ID": "2023-12-07 15:41:46",
                    "DisplayName": "阿峰仔，你唔好嘈住楼下个细蚊仔瞓教",
                    "Value": "阿峰仔，你唔好嘈住楼下个细蚊仔瞓教",
                    "Pitch": 0.9,
                    "SpeechRate": 1.2
                },
                {
                    "ID": "2024-01-20 23:52:45",
                    "DisplayName": "峰峰，你仲唔瞓教我就叫你爸爸夹实你咯",
                    "Value": "峰峰，你仲唔瞓教我就叫你爸爸夹实你咯",
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