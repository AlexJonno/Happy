const url = 'https://demo.the-happiness-index.com/api.json/';
const key = 'api_key=82be191d81c3bc659805c6c7801cd17b';
const id = 'api_id=391121';

// Get the Data

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', url + 'campaigns?' + id + '&' + key);
ourRequest.onload = function(){
    var surveyList = JSON.parse(ourRequest.responseText);
    findSurveys();
    renderSurveys(menuText);
};
ourRequest.send();

function findSurveys(){
    var surveyList = JSON.parse(ourRequest.responseText);
    var objList = surveyList.data.items;
    objList.forEach(element => {
        menuText = "";
        this.menuText = element.name;
        this.idMatch = element.id;
        this.score = element.average_score;
        if(menuText.length > 22) menuText = menuText.substring(0,22) + '...';
            renderSurveys(menuText, idMatch, score);
            })
            };     

 function renderSurveys(menuText, idMatch, score){
    var surveyDestination = document.querySelector('.choice-button-cont');
    var surveyCont = document.createElement('input');
    surveyDestination.appendChild(surveyCont);
    surveyCont.setAttribute('class', 'choice-button');
    surveyCont.setAttribute('value', menuText);
    surveyCont.setAttribute('type', 'button');   
    surveyCont.setAttribute('id', idMatch);
    surveyCont.addEventListener('click', function(){
       window.location.href = 'analysis.html';
    surveyCont.addEventListener('click', function(){
    });
    });
    };

