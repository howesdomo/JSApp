// V 0.0.1 - 2023-06-02 00:31:04
// 首次创建

/**
 * jsonp 解决跨域问题
 * @param {*} option 
 */
function jsonp(option) {

    // 创建元素
    let script = document.createElement("script");

    // 处理参数
    let param = "";
    for(let item in option.param) {
        param += `&${item}=${option.param[item]}`;
    }

    // 创建全局函数
    // 为了多次调用本方法时不会被覆盖，使用随机数随机回调函数的名称
    fName = "jsonpFunc" + Math.random().toString().replace(".", "");
    window[fName] = option.success; // 回调函数

    // 设置src 
    script.src = option.url + "?callback=" + fName + param;

    // 追加节点
    document.body.appendChild(script);

    script.onload = () => {
        // 由于每次执行 jsonp 方法都会追加节点
        // 加载完成后移出节点，节省资源
        document.body.removeChild(script);
    }
}