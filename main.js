'use strict'

let jsonData;
fetch("product.json").then(
    res=>{      
        return res.json();
    }
).then(data=>{
    
    jsonData=data;
    
    console.log(jsonData,"data");
})
// console.log(jsonData,"jsonData");