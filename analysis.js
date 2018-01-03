const url = 'https://demo.the-happiness-index.com/api.json/';
const key = 'api_key=82be191d81c3bc659805c6c7801cd17b';
const apiid = 'api_id=391121';
const main = document.querySelector('#analysis');
const header = document.querySelector('#header');
const navBar = document.querySelector('#navBar');
const firstChoice = document.querySelector('#firstChoice-section');
const firstSurveyButton = document.querySelector('#firstSurveys');
const firstQuestionButton = document.querySelector('#firstQuestions');



function renderFirstChoice () {
    return `
    <section id="choice-section" class="grid">
    <div id="form-entry-container" class="content-wrap">
            <h2 id="settings-title">
                Your Happiness Index <br> <h3 class="under-message">Connection Succesful</h3>
            </h2>
            <p>
                Thank you for using our App. To begin viewing your results please select either Surveys or Questions:
            </p>
            <form>
                <div class="choice-button-cont">
                    <input class="choice-button" id="firstSurveys" type="button" value="Surveys">
                </div>
                    <div class="choice-button-cont">
                    <input class="choice-button" id="firstQuestions" type="button" value="Questions">
                </div>
                </form>
        </div>
</section>
    `;
};

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', url + 'campaigns?' + apiid + '&' + key);
ourRequest.onload = function(){
    var surveyList = JSON.parse(ourRequest.responseText);
    findSurveys();
    renderSurveys(menuText);
    navBar.innerHTML = renderNavbar();
    firstChoice.innerHTML = renderFirstChoice();
};
ourRequest.send();

function findSurveys(){
    var surveyList = JSON.parse(ourRequest.responseText);
    var objList = surveyList.data.items;
    objList.forEach(element => {
        this.menuText = element.name;
        this.idMatch = element.id;
        this.score = element.average_score;
        this.respondents = element.votes;
        if(menuText.length > 22 && document.body.clientWidth < 800) menuText = menuText.substring(0,22) + '...';
            renderSurveys(menuText, idMatch, score);
            })
            };     

 function renderSurveys(menuText, idMatch, score, respondents){
    var surveyDestination = document.querySelector('.choice-button-cont');
    var surveyCont = document.createElement('input');
    var statsCont = document.createElement('div');
    surveyDestination.appendChild(surveyCont);
    surveyDestination.appendChild(statsCont);
    statsCont.setAttribute('class', 'stats-cont');
    var roundedScore = Math.round( this.score * 10 ) / 10;
    statsCont.textContent = roundedScore + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + this.respondents;
    surveyCont.setAttribute('class', 'choice-button');
    surveyCont.setAttribute('value', menuText);
    surveyCont.setAttribute('type', 'button');   
    surveyCont.setAttribute('id', idMatch);
    surveyCont.addEventListener('click', updateAnalysis);
        };

//Analysis View

 //window.addEventListener('click', e => {
 //   updateAnalysis();
// });

async function updateAnalysis (clickedID,) {
    const res = await fetch(url + 'campaigns?' + apiid + '&' + key);
    const json = await res.json();
    var data = json.data.items;
    var title = json.data.items[0];
    var surveySelection = document.querySelector('#choice-section');
    surveySelection.style.display = 'none';
    var logo = document.querySelector('#logoCont');
    logo.style.display = 'none';
    main.innerHTML = data.map(renderAnalysis).join('\n');
    header.innerHTML = renderHeader(title);
    document.body.style.backgroundColor = '#fcfcfc';
    prepNavButtons();
    clickedID = this.id;
    console.log(clickedID);
};

function renderHeader(title) {
    return `
    <section id="section-a" class="grid">
    <div class="content-wrap">
    <div id="navCont">
    <input class="navButton grid" id="Surveys" type="button" value="Surveys">
    <input class="navButton grid" id="Questions" type="button" value="Questions">
</div>
    <h1 id="title">
        ${title.name}
    </h1>
    <div class="filter-section">
        <form>
            <input id="filter-input" type="text" value="All">
            <input id="filter-button" type="button" value="Filter">
        </form>
    </div>
</div>
</section>
`;
}

function renderAnalysis(data){
    return `
    <section class="grid analysisCont">
    <div class="content-wrap">
        <h2 class="content-title">
            ${data.name}
        </h2>
            <hr>
            </hr>
            <div class="analysis-wrapper">
                <p>votes - ${data.votes}</p>
                <p>average score - ${data.average_score}</p>
            </div>
    </div>
</section>    
    `;
}

// Nav Buttons
function prepNavButtons () {
    var surveyButton = document.querySelector('#Surveys');
    surveyButton.addEventListener('click', function(){
        var surveySelection = document.querySelector('#choice-section');
        surveySelection.style.display = 'block';
        var headerCont = document.querySelector('#section-a');
        headerCont.style.display = 'none';
        var analysisCont = document.querySelectorAll('.analysisCont');
        for (var x = 0; x < analysisCont.length; x++) {
            analysisCont[x].style.display = 'none';
        }
        var logo = document.querySelector('#logoCont');
        logo.style.display = 'block';
        document.body.style.backgroundColor = '#FDDB2F';

})};

function renderNavbar () {
    return `
    <ul class="breadcrumb">
    <li><a href="#">Home</a></li>
    <li><a href="#">> Surveys</a></li>
    <li><a href="#">> Questions</a></li>
    <li><a href="#">>> Do you like work</a></li>
    <li>&#10516; Summary</li>
  </ul>
    `;
};
