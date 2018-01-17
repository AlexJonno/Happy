var textAnswer = document.getElementById("clientidtext");
var submitButton = document.getElementById("the-connect-button");
const errorTarget = document.getElementById('errorMessage');
const url = 'https://demo.the-happiness-index.com/api.json/';
const key = 'api_key=82be191d81c3bc659805c6c7801cd17b';

var submitInformation = function(event){
event.preventDefault();
  var x = textAnswer.value;
  document.cookie = "api_id=" + x;
  var y = document.cookie;
  redirect(y);
};

submitButton.addEventListener('click', submitInformation);
// submitButton.addEventListener('click', redirect);

async function redirect(y){
  const res = await fetch(url + 'campaigns?' + y + '&' + key);
  const json = await res.json();
  var message = json.error;
  if (message == true){
    errorTarget.innerHTML = renderErrorMessage();
  } else if (message == false) {
    window.location.assign('file:///C:/Users/Alex Johnston/Desktop/H-appy/index.html');
  } else {
    errorTarget.innerHTML = connectionErrorMessage();
  };};

function renderErrorMessage(){
  return `
    <p id="error">Error: Invalid ID</p>
  `
};

function connectionErrorMessage(){
  return `
  <p id="connectError">Error: Could not Connect</p>
  `
};