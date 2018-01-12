var input ="";
input = document.getElementById('clientidtext').value;
console.log(input);

function setCookie(input) {
   document.cookie = "ClientID=" + input;
   var x = document.cookie;
   console.log(x);
};

document.cookie = 'lolrofl=1344';

var y = document.cookie;

console.log(y);



