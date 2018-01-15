function setCookie(){
    var value = document.getElementById('clientidtext').innerHTML.value;
    console.log(value);
    document.cookie = "clientid=" + value;
    var x = document.cookie;
    console.log(x);
};