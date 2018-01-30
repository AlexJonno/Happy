const url = 'https://demo.the-happiness-index.com/api.json/';
const newurl = 'https://thehappinessindicator.the-happiness-index.com/api.json/';
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
                Your Happiness Index <br> <h3 class="under-message">Connection Successful</h3>
            </h2>
            <p>
                Thank you for using our App. To begin viewing your results please select either Surveys or Questions:
            </p>
            <form>
                <div class="choice-button-cont">
                    <input class="firstchoice-button" id="firstSurveys" type="button" value="Surveys" onclick="nav2SurveySelection()">
                </div>
                    <div class="choice-button-cont">
                    <input class="firstchoice-button" id="firstQuestions" type="button" value="Questions" onclick="nav2QuestionSelection()">
                </div>
                <div class="choice-button-cont">
                    <input class="firstchoice-button" id="logout" type="button" value="Logout" onclick="alogout()">
                </div>
                </form>
        </div>
</section>
    `;
};

// GET API DATA



function findSurveys(){
    var surveyList = JSON.parse(ourRequest.responseText);
    var surveyArray = [];
    var objList = surveyList.data;
    if (objList.hasOwnProperty("survey")){
        surveyArray.push(objList.survey);
        surveyArray.forEach(element => {
            this.respondents = element.votes;
            this.idMatch = element.id;
            this.score = element.average;
            this.menuText = element.id;
            renderSurveys(menuText, idMatch, score, respondents);
        })}
};

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', newurl + 'surveys/50/overview?' + 'api_id=196110385519&api_key=b34d68f6d23f26a9ff0750cc9787ab87');
ourRequest.onload = function(){
    var surveyList = JSON.parse(ourRequest.responseText);
    findSurveys();
    // getCookie();
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

/* function getCookie(){
    var cookiesArray = document.cookie.split("; ");  
    var getDomain = cookiesArray[0].split("=");
    var clientDomain = getDomain[1];
    var clientID = cookiesArray[1];
    var clientKey = cookiesArray[2];
    console.log(cookiesArray);
  }; */

// MATCH DATA AND CREATE MENU SCREENS

function findQuestions(){
    var questionList = JSON.parse(anotherRequest.responseText);
    var anotherObjList = questionList.data.survey.questions;
    anotherObjList.forEach(element => {
        this.questionText = element.display_text;
        this.questionID = element.id;
        this.questionScore = element.average;
        this.questionVotes = element.votes;
            renderQuestions(questionText, questionID, questionScore);
            })
            };

function renderQuestions(questionText, questionID, questionScore, questionVotes){
    var questionDestination = document.querySelector('#questionTarget');
    var questionCont = document.createElement('div');
    var qstatsCont = document.createElement('div');
    var menuCont = document.createElement('div');
    questionDestination.appendChild(menuCont);
    menuCont.appendChild(questionCont);
    menuCont.appendChild(qstatsCont);
    menuCont.setAttribute('class', 'menuCont');
    qstatsCont.setAttribute('class', 'qstats-cont texttochange');
    var qroundedScore = Math.round( this.questionScore * 10 ) / 10;
    qstatsCont.textContent = qroundedScore;
    questionCont.setAttribute('class', 'choice-button');
    questionCont.textContent = questionText;   
    questionCont.setAttribute('id', questionID);
    questionCont.addEventListener('click', updateQuestionAnalysis);
        };
 

 function renderSurveys(menuText, idMatch, score, respondents){
    var surveyDestination = document.querySelector('#surveyTarget');
    var surveyCont = document.createElement('div');
    var statsCont = document.createElement('div');
    var menuCont = document.createElement('div');
    surveyDestination.appendChild(menuCont);
    menuCont.appendChild(surveyCont);
    menuCont.appendChild(statsCont);
    menuCont.setAttribute('class', 'menuCont');
    statsCont.setAttribute('class', 'stats-cont texttochange');
    var roundedScore = Math.round( this.score * 10 ) / 10;
    statsCont.textContent = roundedScore;
    surveyCont.setAttribute('class', 'choice-button');
    surveyCont.textContent = menuText;
    surveyCont.setAttribute('id', idMatch);
    surveyCont.addEventListener('click', updateAnalysis);
        };
    // surveyDestination.appendChild(surveyCont);
    // surveyDestination.appendChild(statsCont);
    // statsCont.setAttribute('class', 'stats-cont');
    
    // respondents = respondents.toLocaleString();
    
       
    
    

// LOGIC FOR HOME MENU

function nav2SurveySelection () {
    surveyMenu.style.display = 'grid';
    navBar.innerHTML = renderNavbar();
    logo.style.display = 'none';
    homeSelection = document.querySelector('#home-selection');
    homeSelection.style.display = 'none';
    var nav2Target = document.querySelector('#nav2');
    nav2Target.setAttribute('class', 'activeNav');
};

function nav2QuestionSelection () {
    navBar.innerHTML = renderNavbar();
    logo.style.display = 'none';
    homeSelection = document.querySelector('#home-selection');
    homeSelection.style.display = 'none';
    questionMenu.style.display = 'grid';
    var nav3Target = document.querySelector('#nav3');
    nav3Target.setAttribute('class', 'activeNav');
};

// CREATE ANALYSIS SCREEN

async function updateAnalysis (clickedID) {
    const res = await fetch(newurl + 'surveys/50/overview?' + 'api_id=196110385519&api_key=b34d68f6d23f26a9ff0750cc9787ab87');
    const json = await res.json();
    var monthlyAv = json.data.survey.breakdown;
    var scores = json.data.survey.scores;
    var surveySelection = document.querySelector('#choice-section');
    var data = json.data.survey;
    surveySelection.style.display = 'none';
    document.body.style.backgroundColor = '#fcfcfc';
    clickedID = this.id;
    console.log(clickedID);
    document.documentElement.scrollTop = 0;
          header.innerHTML = renderHeader(data);
          main.innerHTML = renderAnalysis(data);
          var chartTarget = document.querySelector('#avScoreChart');
          chartTarget.innerHTML = createCharts(data, scores, monthlyAv);
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

    clickedQuestionID = this.id;
    document.documentElement.scrollTop = 0;
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
    <h1 class="title">
        ${qe.display_text}
    </h1>
    <div class="filter-section content-wrap">
    </div>
</div>
</section>
`;
}

/*         <form class="filterForm">
            <input id="filter-input" type="text" value="All">
            <input id="filter-button" type="button" value="Filter">
        </form>

        */

function renderQuestionAnalysis(qe){
    var votesStep = qe.votes
    var votesDisplay = votesStep.toLocaleString();
    return `
    <section class="grid analysisCont">
    <div class="content-wrap">
            <div class="analysis-wrapper">
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
            <p class="analysisTitle">Votes</p>
            <div class="avScoreCont">
                <p class="avScoreText">${votesDisplay}</p>
                <canvas id="qtotalVoters"></canvas>
                </div>
                <hr></hr>
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
                <p class="analysisTitle">Standard Deviation</p>
                <div class="avScoreCont">
                <p class="avScoreText">${qe.std_dev}</p>
                <canvas id="qstandardDev">
                </canvas>
                </div>
                </div>
                <hr></hr>
                </div>
            </div>
    </div>
</section>    
    `;
}

function renderHeader(data) {
    return `
    <section id="section-a" class="grid">
    <div class="content-wrap">
    <h1 class="title">
        ${data.id}
    </h1>
    <div class="filter-section content-wrap">

        </form>
    </div>
</div>
</section>
`;
}

/*
        <form class="filterForm">
            <input id="filter-input" type="text" value="All">
            <input id="filter-button" type="button" value="Filter">
*/

function renderAnalysis(data){
    var votesStep = data.votes
    var votesDisplay = votesStep.toLocaleString();
    var avScoreStep = data.average;
    var avScoreRounded = Math.round( avScoreStep * 10 ) / 10;
    return `
    <section class="grid analysisCont">
    <div class="content-wrap">
            <div class="analysis-wrapper">
            <p class="analysisTitle">Average score</p>
            <div class="avScoreCont">
            <p class="avScoreText">${avScoreRounded}</p>
            <canvas id="avScoreChart">
            </canvas>
            </div>
            <hr>
            </hr>
            <p class="analysisTitle">Votes</p>
            <div class="avScoreCont">
                <p class="avScoreText">${votesDisplay}</p>
                <canvas id="totalVoters"></canvas>
                </div>
                <hr></hr>
                <p class="analysisTitle">Monthly Averages</p>
                <canvas id="monthlySpread">
                </canvas>
                <hr>
                </hr>
                <p class="analysisTitle">Score Spread</p>
                <canvas id="scoreSpread">
                </canvas>
                <hr>
                </hr>
            </div>
    </div>
</section>    
    `;
}

function createCharts (data, scores, monthlyAv) {
    var votesStep = data.votes
    var votesDisplay = votesStep.toLocaleString();
    var totalVotesChart = document.querySelector('#totalVoters');
    var ylabel = data.votes + 16000;
    var thetotalVotersChart = new Chart(totalVotesChart, {
        type: 'bar',
        data: {
            label:'Total Votes',
            datasets:[{
                label: 'Responses',
                backgroundColor: '#d7dc50',
                data: [data.votes]
            },
            {
            label: 'Non-Responses',
            backgroundColor: '#d27873',
            data: [16000]
            }
        ],
        },
        options: {
            scales: {
                xAxes: [{
                    stacked: true,
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        maxTicksLimit: 2,
                        max: ylabel,
                    },
                    gridlines: {
                        color: "rgba(0, 0, 0, 0)",
                    },
                }]
            },
        }
    });


    var avScoreChart = document.querySelector('#avScoreChart').getContext('2d');
    var avScoreStep = data.average;
    var avScoreRounded = Math.round( avScoreStep * 10 ) / 10;
    var outOf = 10 - avScoreRounded;
    var colorToUse;
    if (avScoreRounded < 2){
        colorToUse = '#f0645f';
    } else if(avScoreRounded >= 2 && avScoreRounded < 3){
        colorToUse = '#d27873';
    } else if(avScoreRounded >= 3 && avScoreRounded < 4){
        colorToUse = '#969196';
    } else if(avScoreRounded >= 4 && avScoreRounded < 5){
        colorToUse = '#55a0be';
    } else if(avScoreRounded >= 5 && avScoreRounded < 6){
        colorToUse = '#2db4d2';
    } else if(avScoreRounded >= 6 && avScoreRounded < 7){
        colorToUse = '#32becd';
    } else if(avScoreRounded >= 7 && avScoreRounded < 8){
        colorToUse = '#5fc3aa';
    } else if(avScoreRounded >= 8 && avScoreRounded < 9){
        colorToUse = '#96cd7d';
    } else if(avScoreRounded >= 9 && avScoreRounded < 10){
        colorToUse = '#fadc32';
    } else if(avScoreRounded == 10){
        colorToUse = '#d7dc50';
    }
    var avScore = new Chart(avScoreChart, {
        type: 'doughnut',
        data: {
            labels:['Average Score'],
            datasets:[{
                label: 'Points',
                backgroundColor: [colorToUse, '#eaeaea'],
                borderWidth: ['80px'],
                data: [avScoreRounded, outOf]
            }],
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            cutoutPercentage: 80
        }
    });
    var MonthlySpreadChart = document.querySelector('#monthlySpread').getContext('2d');
    var monthlyResults = [];
    var dateResults = [];
    var dateConverted = [];
    monthlyAv.forEach(function(a) {
        monthlyResults.push(a.average);
        dateResults.push(a.label);
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



    var MonthlySpread = new Chart(MonthlySpreadChart, {
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
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
        }
    })
    var scoreSpreadChart = document.querySelector('#scoreSpread').getContext('2d');
    var scoreResults = [];
    for (var prop in scores) {
        scoreResults.push(scores[prop]);
    }
    scoreResults.reverse();
    var scoreSpread = new Chart(scoreSpreadChart, {
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

function createQuestionCharts (qe, qmonthlyAv, qscores) {
    var qvotesStep = qe.votes
    var qvotesDisplay = qvotesStep.toLocaleString();
    var qtotalVotesChart = document.querySelector('#qtotalVoters');
    var qylabel = qe.votes + 16;
    var qthetotalVotersChart = new Chart(qtotalVotesChart, {
        type: 'bar',
        data: {
            label:'Total Votes',
            datasets:[{
                label: 'Responses',
                backgroundColor: '#d7dc50',
                data: [qe.votes]
            },
            {
            label: 'Non-Responses',
            backgroundColor: '#d27873',
            data: [16]
            }
        ],
        },
        options: {
            scales: {
                xAxes: [{
                    stacked: true,
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        maxTicksLimit: 2,
                        max: qylabel,
                    },
                    gridlines: {
                        color: "rgba(0, 0, 0, 0)",
                    },
                }]
            },
        }
    });


    var qavScoreChart = document.querySelector('#qavScoreChart').getContext('2d');
    var qoutOf = 10 - qe.average;
    var colorToUse;
    if (qe.average < 2){
        colorToUse = '#f0645f';
    } else if(qe.average >= 2 && qe.average < 3){
        colorToUse = '#d27873';
    } else if(qe.average >= 3 && qe.average < 4){
        colorToUse = '#969196';
    } else if(qe.average >= 4 && qe.average < 5){
        colorToUse = '#55a0be';
    } else if(qe.average >= 5 && qe.average < 6){
        colorToUse = '#2db4d2';
    } else if(qe.average >= 6 && qe.average < 7){
        colorToUse = '#32becd';
    } else if(qe.average >= 7 && qe.average < 8){
        colorToUse = '#5fc3aa';
    } else if(qe.average >= 8 && qe.average < 9){
        colorToUse = '#96cd7d';
    } else if(qe.average >= 9 && qe.average < 10){
        colorToUse = '#d7dc50';
    } else if(qe.average == 10){
        colorToUse = '#fadc32';
    }
    var qavScore = new Chart(qavScoreChart, {
        type: 'doughnut',
        data: {
            labels:['Average Score'],
            datasets:[{
                label: 'Points',
                backgroundColor: [colorToUse, '#eaeaea'],
                borderWidth: ['80px'],
                data: [qe.average, qoutOf]
            }],
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            cutoutPercentage: 80
        }
    })

    var qstandardDev = document.querySelector('#qstandardDev').getContext('2d');
    var sdoutOf = 4.5 - qe.std_dev;


    //, , , , , , , , , '#00353f', '#ffbffb'
    var qstddev = new Chart(qstandardDev, {
        type: 'doughnut',
        data: {
            labels:['Standard Deviation'],
            datasets:[{
                label: 'Points',
                backgroundColor: ['#61c3a8', '#eaeaea'],
                borderWidth: ['80px'],
                data: [qe.std_dev , sdoutOf]
            }],
        },
        options: {
            maintainAspectRatio: false,
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
                    },
                    ticks: {
                        beginAtZero: true
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
    <div class="triplegrid">
    <div id="nav1" onclick="goHome()"><a href="#">Home</a></div>
    <div id="nav2" onclick="goSurveys()"><a href="#">Surveys</a></div>
    <div id="nav3" onclick="goQuestions()"><a href="#">Questions</a></div>
    </div>
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
    breadcrumb = document.querySelector('.triplegrid');
    breadcrumb.style.display = 'none';
    surveyHeader = document.querySelector('#section-a');
    surveyHeader.style.display = 'none';
    var analysisCont = document.querySelectorAll('.analysisCont');
    for (var x = 0; x < analysisCont.length; x++) {
        analysisCont[x].style.display = 'none';
    }
};

function goSurveys () {
    var nav3Target = document.querySelector('#nav3');
    nav3Target.classList.remove('activeNav');
    var nav2Target = document.querySelector('#nav2');
    nav2Target.setAttribute('class', 'activeNav');
    surveyMenu.style.display = 'grid';
    questionMenu.style.display = 'none';
    document.body.style.backgroundColor = '#FDDB2F';
    breadcrumb = document.querySelector('.triplegrid');
    breadcrumb.style.display = 'grid';
    surveyHeader = document.querySelector('#section-a');
    surveyHeader.style.display = 'none';
    var analysisCont = document.querySelectorAll('.analysisCont');
    for (var x = 0; x < analysisCont.length; x++) {
        analysisCont[x].style.display = 'none';
    }
};

function goQuestions () {
    var nav2Target = document.querySelector('#nav2');
nav2Target.classList.remove('activeNav'); 
var nav3Target = document.querySelector('#nav3');
nav3Target.setAttribute('class', 'activeNav');
    surveyMenu.style.display = 'none';
    questionMenu.style.display = 'grid';
    document.body.style.backgroundColor = '#FDDB2F';
    breadcrumb = document.querySelector('.triplegrid');
    breadcrumb.style.display = 'grid';
    surveyHeader = document.querySelector('#section-a');
    surveyHeader.style.display = 'none';
    var analysisCont = document.querySelectorAll('.analysisCont');
    for (var x = 0; x < analysisCont.length; x++) {
        analysisCont[x].style.display = 'none';
}
};

function alogout() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    window.location.assign('file:///C:/Users/Alex Johnston/Desktop/H-appy/landing.html');
};