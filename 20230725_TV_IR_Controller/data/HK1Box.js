/**
 * HK1Box红外数据
 */
function getData_HK1Box_Arr0() {
    return [        
            { "name": "待机", "icon": "aim", "data": `9045,4487,584,546,589,541,590,541,587,542,589,541,587,544,590,541,585,1670,586,1670,
587,1670,585,1670,590,1667,584,1673,590,1665,590,1667,587,542,585,1672,583,548,584,
544,586,547,584,546,585,546,585,545,587,1668,585,548,581,1672,591,1666,587,1667,587,
1670,584,1670,587,1670,587,544,585,39888,9059,2228,590` },

        { "name": "选项", "icon": "aim", "data": `9043,4487,584,546,585,546,583,548,584,546,584,545,587,544,585,544,585,1672,584,1671,
586,1670,584,1671,586,1671,584,1671,584,1672,606,1649,586,543,587,1670,586,1670,585,
548,582,547,584,548,586,545,584,548,584,1671,586,548,584,545,584,1673,581,1672,587,
1670,587,1670,587,1670,583,548,584,39880,9047,2232,580` },
        
        { "name": "HOME", "icon": "aim", "data": `9047,4486,587,543,586,545,586,544,587,545,584,545,586,543,584,550,584,1671,584,1672,
583,1674,583,1672,585,1672,584,1671,590,1667,587,1670,586,545,584,1671,562,1695,586,
545,584,548,584,1671,586,1673,581,1673,586,544,587,545,584,548,584,1670,585,1673,584,
548,584,545,584,548,584,1673,584,39887,9056,2233,580` },


{ "name": "音量减", "icon": "aim", "data": `9052,4485,592,543,587,544,587,541,587,546,587,544,587,541,587,545,584,1673,586,1670,
585,1671,590,1667,587,1670,587,1670,590,1667,587,1670,587,546,585,1672,587,543,587,
544,587,1668,587,545,587,544,585,544,587,1670,585,548,587,1668,589,1668,585,545,587,
1668,589,1670,586,1670,589,544,587,39911,9054,2229,580` },

{ "name": "音量加", "icon": "aim", "data": `9046,4487,586,545,585,546,585,546,584,547,584,548,587,544,584,545,586,1671,587,1670,
584,1672,585,1670,586,1669,586,1670,587,1671,584,1673,587,544,586,1671,586,1671,590,
1667,587,544,587,544,585,545,584,546,585,1672,585,545,584,548,584,548,584,1671,584,
1672,584,1673,587,1670,585,544,580` },

{ "name": "模拟鼠标", "icon": "aim", "data": `9046,4490,584,548,589,540,585,546,587,544,583,548,584,546,585,548,584,1671,584,1673,
586,1670,585,1673,587,1667,586,1672,586,1671,586,1670,586,545,586,545,584,548,584,
548,581,1673,584,550,584,548,581,1674,584,549,581,1674,586,1670,585,1672,586,545,584,
1672,584,1671,586,548,584,1672,584,39901,9047,2230,580` },

{ "name": "返回", "icon": "aim", "data": `9082,4454,624,509,617,514,616,515,615,514,616,517,616,514,617,513,616,1637,618,1639,
624,1634,622,1635,620,1635,624,1634,620,1637,620,1636,621,536,595,1636,619,1636,620,
1635,626,509,620,508,624,1631,622,535,596,535,595,536,595,536,593,538,593,1634,624,
1636,625,532,593,1636,624,1634,624` },

    ];
}

/**
 * HK1Box 红外数据 - 区域2 上下左右 OK
 */
function getData_HK1Box_Arr1() {
    return [
        { "name": "empty" },
        { "name": "up", "icon": "arrow-up", "data": `9000, 4500, 
600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 1600, 
600, 1600, 600, 1600, 600, 1600, 600, 1600, 600, 1600, 600, 1600, 600, 1600, 600, 600, 
600, 600, 600, 600, 600, 600, 600, 1600, 600, 1600, 600, 1600, 600, 600, 600, 600, 
600, 1600, 600, 1600, 600, 1600, 600, 600, 600, 600, 600, 600, 600, 1600, 600, 1600, 
600, 39867, 9000, 2230, 600` },
        { "name": "empty" },
        { "name": "left", "icon": "arrow-left", "style": "margin-left: 50px", "data": `9048,4485,586,545,586,545,585,548,584,546,585,545,584,548,586,543,586,1671,584,1672,
        589,1668,585,1672,585,1672,584,1671,586,1673,581,1673,585,546,585,1670,586,1670,587,
        1670,587,543,584,1672,585,1670,586,545,584,548,585,546,585,545,584,548,584,1672,585,
        545,586,545,584,1673,590,1667,580` },
        { "name": "ok", "icon": "aim", "data": `9046,4490,583,550,581,550,584,548,585,545,586,545,584,548,584,548,585,1670,590,1670,
585,1670,584,1673,584,1671,586,1671,586,1671,586,1671,586,545,584,1673,587,1667,587,
546,585,544,586,1670,585,545,586,548,584,545,585,546,584,548,583,1672,584,1673,584,
548,585,1670,587,1670,587,1667,586,39907,9051,2228,580
` },
        { "name": "right", "icon": "arrow", "style": "margin-right: 50px", "data": `9079,4456,617,514,613,518,589,542,587,542,589,542,593,538,617,513,618,1637,591,1664,
615,1644,591,1664,587,1667,616,1639,591,1664,617,1639,616,513,620,1636,594,537,617,
514,615,1638,591,1664,617,1639,617,516,613,518,587,544,587,1666,619,1638,622,509,622,
509,617,512,617,1638,591,1663,622,39839,9086,2195,590
` },
        { "name": "empty" },
        { "name": "down", "icon": "arrow-down", "data": `9000, 4500, 
600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 1600, 
600, 1600, 600, 1600, 600, 1600, 600, 1600, 600, 1600, 600, 1600, 600, 1600, 600, 600, 
600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 1600, 600, 600, 
600, 1600, 600, 1600, 600, 1600, 600, 1600, 600, 1600, 600, 1600, 600, 600, 600, 1600, 
600` },
        { "name": "empty" },
    ];
}