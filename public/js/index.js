const login = document.getElementById('login');
login.onclick = function () {
    fetch(`/api/admin/login`,{
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            loginId: 'mrtq',
            loginPwd: '123123'
        })
    }).then(res=>res.json()).then(res=>console.log(res));
}

const update = document.getElementById('update');
update.onclick = function () {
    fetch(`/api/student/1`,{
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            name: '夏涛'
        })
    }).then(res=>res.json()).then(res=>console.log(res));
}
