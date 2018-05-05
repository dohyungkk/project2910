document.getElementById('myButton').onclick = (e)=>{
    e.preventDefault();
    var xhr = new XMLHttpRequest();

    xhr.open('POST', '/add');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';

    xhr.onload = ()=>{
        alert(xhr.response);
    };

    xhr.send(JSON.stringify({a: 1, b: 2}));
};

