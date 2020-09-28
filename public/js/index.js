//简单请求
// fetch(`http://localhost:5008/api/student`).then(res => res.json()).then(res => {
//     console.log(JSON.parse(res.data));
// });


//需要域检的请求

fetch(`http://localhost:5008/api/student`,{
    method: 'POST',
    headers:{
        "content-type": 'application/json',
        a: 1,
    },
    credentials: "include"
}).then(res=>res.json()).then(res=>{
    console.log(res);
});
