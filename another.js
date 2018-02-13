var idAnswer = document.getElementById("clientidtext");
var apiAnswer = document.getElementById('apikeytext');
var subdomainAnswer = document.getElementById('domainnametext');
var submitButton = document.getElementById("the-connect-button");
const errorTarget = document.getElementById('errorMessage');
const url = 'the-happiness-index.com/api.json/';
// const key = '82be191d81c3bc659805c6c7801cd17b';

var submitInformation = function(event){
event.preventDefault();
  var id = "api_id=" + idAnswer.value;
  var apikey = "api_key=" + apiAnswer.value;
  var subdomain = subdomainAnswer.value;
  document.cookie = "subdomain=" + subdomain;
  document.cookie = id;
  document.cookie = apikey;
  var y = document.cookie;
  redirect(id, apikey, subdomain);
};

submitButton.addEventListener('click', submitInformation);

async function redirect(id, apikey, subdomain){
  if(id.length > 0 && apikey.length > 0 && subdomain.length > 0){
  const res = await fetch('https://' + subdomain + '.' + url + 'surveys/50/overview?' + id + '&' + apikey);
  const json = await res.json();
  var message = json.error;
  if (message == true){
    errorTarget.innerHTML = renderErrorMessage();
  } else if (message == false) {
    window.location.assign('file:///C:/Users/Alex Johnston/Desktop/H-appy/index.html');
  } else {
    errorTarget.innerHTML = connectionErrorMessage();
  };} else {
    errorTarget.innerHTML = fillAllFieldsMessage();
  }};

function renderErrorMessage(){
  return `
    <p id="error">Error: Invalid Credentials</p>
  `
};

function connectionErrorMessage(){
  return `
  <p id="connectError">Error: Could not Connect</p>
  `
};

function fillAllFieldsMessage(){
  return `
  <p id="fillFields">Error: Please fill all fields</p>
  `
};

function prepopulate(){
  if(document.cookie !== null){
  var APIValue = document.cookie.replace(/(?:(?:^|.*;\s*)api_key\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  var IDValue = document.cookie.replace(/(?:(?:^|.*;\s*)api_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  var DomainValue = document.cookie.replace(/(?:(?:^|.*;\s*)subdomain\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  idAnswer.value = IDValue;
  apiAnswer.value = APIValue;
  subdomainAnswer.value = DomainValue;
  }
}

prepopulate();