const url = 'https://demo.the-happiness-index.com/api.json/';
const key = 'api_key=82be191d81c3bc659805c6c7801cd17b';
var apiid = 'api_id=391121'; // document.cookie
const main = document.querySelector('#analysis');
const header = document.querySelector('#header');
const navBar = document.querySelector('#navBar');
const firstChoice = document.querySelector('#firstChoice-section');
const firstSurveyButton = document.querySelector('#firstSurveys');
const firstQuestionButton = document.querySelector('#firstQuestions');
const logo = document.querySelector('#logoCont');
const surveyMenu = document.querySelector('#choice-section');
const questionMenu = document.querySelector('#question-section');

// RENDER HOME MENU

function renderFirstChoice () {
    return `
    <div id="home-selection" class="content-wrap form-entry-container">
            <h2 class="settings-title">
                Your Happiness Index <br> <h3 class="under-message">Connection Succesful</h3>
            </h2>
            <p>
                Thank you for using our App. To begin viewing your results please select either Surveys or Questions:
            </p>
            <form>
                <div class="choice-button-cont">
                    <input class="choice-button" id="firstSurveys" type="button" value="Surveys" onclick="nav2SurveySelection()">
                </div>
                    <div class="choice-button-cont">
                    <input class="choice-button" id="firstQuestions" type="button" value="Questions" onclick="nav2QuestionSelection()">
                </div>
                </form>
        </div>
</section>
    `;
};

// GET API DATA

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', url + 'campaigns?' + apiid + '&' + key);
ourRequest.onload = function(){
    var surveyList = JSON.parse(ourRequest.responseText);
    findSurveys();
    firstChoice.innerHTML = renderFirstChoice();
    surveyMenu.style.display = 'none';
 /* if('serviceWorker' in navigator) {
     try {
          navigator.serviceWorker.register('sw.js');
          console.log('SW Registered');
       } catch (error) {
           console.log('SW Failed');
      }
 } */
};
ourRequest.send();

var anotherRequest = new XMLHttpRequest();
anotherRequest.open('GET', url + 'surveys/09/overview?' + apiid + '&' + key);
anotherRequest.onload = function(){
    var questionList = JSON.parse(anotherRequest.responseText);
    findQuestions();
};
anotherRequest.send();

// MATCH DATA AND CREATE MENU SCREENS

function findQuestions(){
    var questionList = JSON.parse(anotherRequest.responseText);
    var anotherObjList = questionList.data.survey.questions;
    anotherObjList.forEach(element => {
        this.questionText = element.display_text;
        this.questionID = element.id;
        this.questionScore = element.average;
        this.questionVotes = element.votes;
        if(questionText.length > 22 && document.body.clientWidth < 800) questionText = questionText.substring(0,22) + '...';
            renderQuestions(questionText, questionID, questionScore);
            })
            };

function renderQuestions(questionText, questionID, questionScore, questionVotes){
    var questionDestination = document.querySelector('#questionTarget');
    var questionCont = document.createElement('input');
    var qstatsCont = document.createElement('div');
    questionDestination.appendChild(questionCont);
    questionDestination.appendChild(qstatsCont);
    qstatsCont.setAttribute('class', 'stats-cont');
    var qroundedScore = Math.round( this.questionScore * 10 ) / 10;
    qstatsCont.textContent = qroundedScore + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + this.questionVotes;
    questionCont.setAttribute('class', 'choice-button');
    questionCont.setAttribute('value', questionText);
    questionCont.setAttribute('type', 'button');   
    questionCont.setAttribute('id', questionID);
    questionCont.addEventListener('click', updateQuestionAnalysis);
        };


function findSurveys(){
    var surveyList = JSON.parse(ourRequest.responseText);
    var objList = surveyList.data.items;
    objList.forEach(element => {
        this.menuText = element.name;
        this.idMatch = element.id;
        this.score = element.average_score;
        this.respondents = element.votes;
        if(menuText.length > 22 && document.body.clientWidth < 800) menuText = menuText.substring(0,22) + '...';
            renderSurveys(menuText, idMatch, score, respondents);
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

// LOGIC FOR HOME MENU

function nav2SurveySelection () {
    surveyMenu.style.display = 'grid';
    navBar.innerHTML = renderNavbar();
    logo.style.display = 'none';
    homeSelection = document.querySelector('#home-selection');
    homeSelection.style.display = 'none';
    currentAnalysisMenu = document.querySelector('.currentAnalysisMenu');
    currentAnalysisMenu.style.display = 'none';
};

function nav2QuestionSelection () {
    navBar.innerHTML = renderNavbar();
    logo.style.display = 'none';
    homeSelection = document.querySelector('#home-selection');
    homeSelection.style.display = 'none';
    questionMenu.style.display = 'grid';
    currentAnalysisMenu = document.querySelector('.currentAnalysisMenu');
    currentAnalysisMenu.style.display = 'none';
};

// CREATE ANALYSIS SCREEN

async function updateAnalysis (clickedID) {
    const res = await fetch(url + 'campaigns?' + apiid + '&' + key);
    const json = await res.json();
    var data = json.data.items;
    var surveySelection = document.querySelector('#choice-section');
    surveySelection.style.display = 'none';
    document.body.style.backgroundColor = '#fcfcfc';
    currentAnalysisMenu = document.querySelector('.currentAnalysisMenu');
    currentAnalysisMenu.style.display = 'block';
    clickedID = this.id;
    console.log(clickedID);
    data.forEach(function(e)
    {
       if (e.id == clickedID)
       {
          header.innerHTML = renderHeader(e);
          main.innerHTML = renderAnalysis(e);
          var chartTarget = document.querySelector('#avScoreChart');
          chartTarget.innerHTML = createCharts(e);
       }
    });
  };

async function updateQuestionAnalysis (clickedQuestionID) {
    strURL = url + 'surveys/09/overview?' + apiid + '&' + key;
    const res = await fetch(strURL);
    const json = await res.json();
    var qmonthlyAv = json.data.survey.breakdown;
    var qscores = json.data.survey.scores;
    var qdata = json.data.survey.questions;
    var questionSelection = document.querySelector('#question-section');
    questionSelection.style.display = 'none';
    document.body.style.backgroundColor = '#fcfcfc';
    currentAnalysisMenu = document.querySelector('.currentAnalysisMenu');
    currentAnalysisMenu.style.display = 'block';
    clickedQuestionID = this.id;
    qdata.forEach(function(qe)
    {
       if (qe.id == clickedQuestionID)
       {
          header.innerHTML = renderQuestionHeader(qe);
          main.innerHTML = renderQuestionAnalysis(qe);
          var qchartTarget = document.querySelector('#qavScoreChart');
          qchartTarget.innerHTML = createQuestionCharts(qe, qmonthlyAv, qscores);
       }
    });
  };

function renderQuestionHeader(qe){
    return `
    <section id="section-a" class="grid">
    <div class="content-wrap">
    <hr>
    </hr>
    <h1 id="title">
        ${qe.display_text}
    </h1>
    <div class="filter-section content-wrap">
        <form>
            <input id="filter-input" type="text" value="All">
            <input id="filter-button" type="button" value="Filter">
        </form>
    </div>
</div>
</section>
`;
}

function renderQuestionAnalysis(qe){
    return `
    <section class="grid analysisCont">
    <div class="content-wrap">
            <hr>
            </hr>
            <div class="analysis-wrapper">
                <p class="analysisTitle">Votes</p>
                <div class="figureBorder">
                <p class="analysisFigure">${qe.votes}</p>
                </div>
                <hr></hr>
                <p class="analysisTitle">Standard Deviation</p>
                <div class="figureBorder">
                <p class="analysisFigure">${qe.std_dev}</p>
                </div>
                <hr></hr>
                <div>
                <p class="analysisTitle">Average Score</p>
                <div class="avScoreCont">
                <p class="avScoreText">
                ${qe.average}
                </p>
                <canvas id="qavScoreChart">
                </canvas>
                </div>
                <hr>
                </hr>
                <p class="analysisTitle">Monthly Averages</p>
                <canvas id="qmonthlySpread">
                </canvas>
                <hr>
                </hr>
                <p class="analysisTitle">Score Spread</p>
                <canvas id="qscoreSpread">
                </canvas>
                <hr>
                </hr>
                </div>
            </div>
    </div>
</section>    
    `;
}

function renderHeader(e) {
    return `
    <section id="section-a" class="grid">
    <div class="content-wrap">
    <hr>
    </hr>
    <h1 id="title">
        ${e.name}
    </h1>
    <div class="filter-section content-wrap">
        <form>
            <input id="filter-input" type="text" value="All">
            <input id="filter-button" type="button" value="Filter">
        </form>
    </div>
</div>
</section>
`;
}

function renderAnalysis(e){
    var avScoreStep = e.average_score;
    var avScoreRounded = Math.round( avScoreStep * 10 ) / 10;
    return `
    <section class="grid analysisCont">
    <div class="content-wrap">
            <hr>
            </hr>
            <div class="analysis-wrapper">
            <p class="analysisTitle">Votes</p>
                <div class="figureBorder">
                <p class="analysisFigure">${e.votes}</p>
                </div>
                <hr></hr>
                <p class="analysisTitle">Average score</p>
                <p class="avScoreText">${avScoreRounded}</p>
                <canvas id="avScoreChart">
                </canvas>
                <hr>
                </hr>
            </div>
    </div>
</section>    
    `;
}

function createCharts (e) {
    var avScoreChart = document.querySelector('#avScoreChart').getContext('2d');
    var avScoreStep = e.average_score;
    var avScoreRounded = Math.round( avScoreStep * 10 ) / 10;
    var outOf = 10 - avScoreRounded;
    var avScore = new Chart(avScoreChart, {
        type: 'doughnut',
        data: {
            labels:['Average Score'],
            datasets:[{
                label: 'Points',
                backgroundColor: ['#61c3a8', '#666666'],
                borderWidth: ['80px'],
                data: [avScoreRounded, outOf]
            }],
        },
        options: {
            legend: {
                display: false
            },
            cutoutPercentage: 80
        }
    });
};

function createQuestionCharts (qe, qmonthlyAv, qscores) {
    var qavScoreChart = document.querySelector('#qavScoreChart').getContext('2d');
    var qoutOf = 10 - qe.average;
    var qavScore = new Chart(qavScoreChart, {
        type: 'doughnut',
        data: {
            labels:['Average Score'],
            datasets:[{
                label: 'Points',
                backgroundColor: ['#61c3a8', '#666666'],
                borderWidth: ['80px'],
                data: [qe.average, qoutOf]
            }],
        },
        options: {
            legend: {
                display: false
            },
            cutoutPercentage: 80
        }
    })
    var qMonthlySpreadChart = document.querySelector('#qmonthlySpread').getContext('2d');
    var monthlyResults = [];
    var dateResults = [];
    var dateConverted = [];
    qmonthlyAv.forEach(function(i) {
        monthlyResults.push(i.average);
        dateResults.push(i.label);
    })
    dateResults.forEach(function(x){
        var lol = x.toString();
        year = lol.slice(2,4);
        lolrofl = lol.slice(4,6);
            if (lolrofl.indexOf('01') >= 0) {
                lolrofl = 'Jan ' + year;
            }
            else if(lolrofl.indexOf('02') >= 0) {
                lolrofl = 'Feb ' + year;
            }
            else if(lolrofl.indexOf('03') >= 0) {
                lolrofl = 'Mar ' + year;
            }
            else if(lolrofl.indexOf('04') >= 0) {
                lolrofl = 'Apr ' + year;
            }
            else if(lolrofl.indexOf('05') >= 0) {
                lolrofl = 'May ' + year;
            }
            else if(lolrofl.indexOf('06') >= 0) {
                lolrofl = 'Jun ' + year;
            }
            else if(lolrofl.indexOf('07') >= 0) {
                lolrofl = 'Jul ' + year;
            }
            else if(lolrofl.indexOf('08') >= 0) {
                lolrofl = 'Aug ' + year;
            }
            else if(lolrofl.indexOf('09') >= 0) {
                lolrofl = 'Sep ' + year;
            }
            else if(lolrofl.indexOf('10') >= 0) {
                lolrofl = 'Oct ' + year;
            }
            else if(lolrofl.indexOf('11') >= 0) {
                lolrofl = 'Nov ' + year;
            }
            else if(lolrofl.indexOf('12') >= 0) {
                lolrofl = 'Dec ' + year;
            }
                else {
                    console.log('fail');
                }
           dateConverted.push(lolrofl);
            });



    var qMonthlySpread = new Chart(qMonthlySpreadChart, {
        type: 'bar',
        data: {
            labels: dateConverted,
            datasets:[{
                label: 'Monthly Averages',
                backgroundColor: ['#fadc32', '#d7dc50', '#96cd7d', '#5fc3aa', '#32becd', '#2db4d2', '#55a0be', '#969196', '#d27873', '#f0645f', '#00353f', '#ffbffb'],
                data: monthlyResults
            }],
        },
        options: {
            legend: {
                display: false
            },
            barBackground: '#e2e2e2',
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Av. Score'
                    }
                }]
            },
        }
    })
    var qscoreSpreadChart = document.querySelector('#qscoreSpread').getContext('2d');
    var scoreResults = [];
    for (var prop in qscores) {
        scoreResults.push(qscores[prop]);
    }
    scoreResults.reverse();
    var qscoreSpread = new Chart(qscoreSpreadChart, {
        type: 'horizontalBar',
        data: {
            labels:['10', '9', '8', '7', '6', '5', '4', '3', '2', '1'],
            datasets:[{
                label: 'Score Spread',
                backgroundColor: ['#fadc32', '#d7dc50', '#96cd7d', '#5fc3aa', '#32becd', '#2db4d2', '#55a0be', '#969196', '#d27873', '#f0645f', '#00353f', '#ffbffb'],
                data: scoreResults
            }],
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Number of Votes'
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                    display: true,
                    labelString: 'Rating'
                    }
                }]
            },
            cutoutPercentage: 80,
        }
        });
        
    };



// CREATE BREADCRUMB MENU

function renderNavbar () {
    return `
    <ul class="breadcrumb content-wrap">
    <li onclick="goHome()"><a href="#">Home</a></li>
    <li onclick="goSurveys()"><a href="#">> Surveys</a></li>
    <li onclick="goQuestions()"><a href="#">> Questions</a></li>
    <div class="currentAnalysisMenu">
    <li>>> Do you like work</a></li>
    <li>&#10516; Summary</li>
    </div>
  </ul>
    `;
};

// BREADCRUMB LOGIC

function goHome () {
    homeSelection = document.querySelector('#home-selection');
    homeSelection.style.display = 'block';
    logo.style.display = 'grid';
    surveyMenu.style.display = 'none';
    questionMenu.style.display = 'none';
    document.body.style.backgroundColor = '#FDDB2F';
    breadcrumb = document.querySelector('.breadcrumb');
    breadcrumb.style.display = 'none';
    surveyHeader = document.querySelector('#section-a');
    surveyHeader.style.display = 'none';
    var analysisCont = document.querySelectorAll('.analysisCont');
    for (var x = 0; x < analysisCont.length; x++) {
        analysisCont[x].style.display = 'none';
    }
};

function goSurveys () {
    surveyMenu.style.display = 'grid';
    questionMenu.style.display = 'none';
    document.body.style.backgroundColor = '#FDDB2F';
    breadcrumb = document.querySelector('.breadcrumb');
    breadcrumb.style.display = 'block';
    surveyHeader = document.querySelector('#section-a');
    surveyHeader.style.display = 'none';
    currentAnalysisMenu = document.querySelector('.currentAnalysisMenu');
    currentAnalysisMenu.style.display = 'none';
    var analysisCont = document.querySelectorAll('.analysisCont');
    for (var x = 0; x < analysisCont.length; x++) {
        analysisCont[x].style.display = 'none';
    }
};

function goQuestions () {
    surveyMenu.style.display = 'none';
    questionMenu.style.display = 'grid';
    document.body.style.backgroundColor = '#FDDB2F';
    breadcrumb = document.querySelector('.breadcrumb');
    breadcrumb.style.display = 'block';
    surveyHeader = document.querySelector('#section-a');
    surveyHeader.style.display = 'none';
    currentAnalysisMenu = document.querySelector('.currentAnalysisMenu');
    currentAnalysisMenu.style.display = 'none';
    var analysisCont = document.querySelectorAll('.analysisCont');
    for (var x = 0; x < analysisCont.length; x++) {
        analysisCont[x].style.display = 'none';
}};