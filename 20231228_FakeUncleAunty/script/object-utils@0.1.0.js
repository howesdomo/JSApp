var ObjUtils = (function(){    
    function GetPropertyNames(obj) {
        // let propArr = Object.keys(obj).sort(); // 自身包含（不包括原型中）的所有可枚举属性的名称的数组
        // console.log('对象的属性:', propArr);

        // 不拆分 string 类型的对象
        if(typeof obj === "string") 
        {
            return [];
        }

        let propArr = Object.getOwnPropertyNames(obj).sort(); // 自身包含（不包括原型中）的所有属性 (无论是否可枚举) 的名称的数组。
        // console.log("对象的属性:", propArr);
        return propArr;
    }

    function GetMethods(obj) {
        return Object.getOwnPropertyNames(obj)
                     .filter((property) => {						
                        // let typeName = typeof obj[property];                        
                        // console.log(`${property}: ${typeName}`);
                        let typeName = Object.prototype.toString.call(obj[property]); // 获取更确切的类型，例如 [object Function], [object Array] 等
                        console.log(typeName == "function");
                        return typeName == "function";
                     })
                     .sort();
    }

    function Convert2Tree(obj) 
    {                       
        let r = [];
        if(Array.isArray(obj))
        {
            for(let i = 0; i < obj.length; i++) {
                return Convert2Tree(obj[i]);
            }
        }
        else 
        {
            const props = GetPropertyNames(obj);
            for(let i = 0; i < props.length; i++) 
            {
                let propName = props[i];
                if(propName == "__ob__") 
                {
                    continue; // 跳过 vue 观察属性
                } 
                else 
                {
                    const value = obj[propName];
                    if(Array.isArray(value))
                    {
                        let children = Convert2Tree(value);
                        r.push({ key: propName, value: value, children: children });                            
                    }
                    else 
                    {
                        r.push({ key: propName, value: value });
                    }
                }
            }
        }
        return r;
    }

    // Convert2Tree 的方法, ChatGPT 提出了他的意见后的代码
    function Convert2TreeV1(obj) 
    {
        let r = [];
        if(Array.isArray(obj))
        {
            let index = 0;
            obj.map((item) => {
                let node = { key: `item${index++}`, value: item, children: Convert2TreeV1(item) };
                r.push(node);
            });
            return r;
        }
        else 
        {
            const props = ObjUtils.GetPropertyNames(obj);
            props.filter((p)=> { return p != "__ob__"})
                 .map((prop)=>{                
                    let value = obj[prop];
                    let node = { key: prop, value: value };
                    if (Array.isArray(value)) 
                    {                        
                        node.children = Convert2TreeV1(value); // 如果值是数组，添加 children 属性                        
                    }
                    r.push(node);
                 });            
        }
        return r;
    }


    // 返回一个对象，暴露您的方法
    return {
        GetPropertyNames: GetPropertyNames,
        GetMethods: GetMethods,
        Convert2Tree: Convert2Tree,
        Convert2TreeV1: Convert2TreeV1,
    };
})();