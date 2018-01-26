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
                    <input class="choice-button" id="firstSurveys" type="button" value="Surveys" onclick="nav2SurveySelection()">
                </div>
                    <div class="choice-button-cont">
                    <input class="choice-button" id="firstQuestions" type="button" value="Questions" onclick="nav2QuestionSelection()">
                </div>
                <div class="choice-button-cont">
                    <input class="choice-button" id="logout" type="button" value="Logout" onclick="alogout()">
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
     //   if(questionText.length > 22 && document.body.clientWidth < 800) questionText = questionText.substring(0,28) + '...';
            renderQuestions(questionText, questionID, questionScore);
            })
            };

function renderQuestions(questionText, questionID, questionScore, questionVotes){
    var questionDestination = document.querySelector('#questionTarget');
    var questionCont = document.createElement('div');
    var qstatsCont = document.createElement('div');
    var qvotesCont = document.createElement('div');
    questionDestination.appendChild(questionCont);
    questionDestination.appendChild(qstatsCont);
    questionDestination.appendChild(qvotesCont);
    qstatsCont.setAttribute('class', 'qstats-cont');
    qvotesCont.setAttribute('class', 'qvotes-cont');
    var qroundedScore = Math.round( this.questionScore * 10 ) / 10;
    qstatsCont.textContent = qroundedScore; // + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + this.questionVotes;
    qvotesCont.textContent = this.questionVotes;
    questionCont.setAttribute('class', 'choice-button');
    questionCont.textContent = questionText;
    //questionCont.setAttribute('type', 'button');   
    questionCont.setAttribute('id', questionID);
    questionCont.addEventListener('click', updateQuestionAnalysis);
        };
 

/* function findSurveys(){
    var surveyList = JSON.parse(ourRequest.responseText);
    var objList = surveyList.data.survey;
    objList.forEach(element => {
        // this.menuText = element.name;
        this.idMatch = element.id;
        this.score = element.average;
        this.respondents = element.votes;
        if(menuText.length > 22 && document.body.clientWidth < 800) menuText = menuText.substring(0,22) + '...';
            renderSurveys(menuText, idMatch, score, respondents);
            })
            };     */

 function renderSurveys(menuText, idMatch, score, respondents){
    var surveyDestination = document.querySelector('.choice-button-cont');
    var surveyCont = document.createElement('div');
    var statsCont = document.createElement('div');
    var votesCont = document.createElement('div');
    surveyDestination.appendChild(surveyCont);
    surveyDestination.appendChild(statsCont);
    surveyDestination.appendChild(votesCont);
    statsCont.setAttribute('class', 'stats-cont');
    votesCont.setAttribute('class', 'votes-cont');
    var roundedScore = Math.round( this.score * 10 ) / 10;
    statsCont.textContent = roundedScore; // + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + '\u00A0' + this.respondents;
    respondents = respondents.toLocaleString();
    votesCont.textContent = respondents;
    surveyCont.setAttribute('class', 'choice-button');
    surveyCont.textContent = menuText;
    // surveyCont.setAttribute('type', 'button');   
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
        <form class="filterForm">
            <input id="filter-input" type="text" value="All">
            <input id="filter-button" type="button" value="Filter">
        </form>
    </div>
</div>
</section>
`;
}

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
                <div class="figureBorder">
                <p class="avScoreText">${votesDisplay}</p>
                </div>
                </div>
                <hr></hr>
                <p class="analysisTitle">Standard Deviation</p>
                <div class="avScoreCont">
                <div class="figureBorder">
                <p class="avScoreText">${qe.std_dev}</p>
                </div>
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
        <form class="filterForm">
            <input id="filter-input" type="text" value="All">
            <input id="filter-button" type="button" value="Filter">
        </form>
    </div>
</div>
</section>
`;
}

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
                <div class="figureBorder">
                <p class="avScoreText">${votesDisplay}</p>
                </div>
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
    var avScoreChart = document.querySelector('#avScoreChart').getContext('2d');
    var avScoreStep = data.average;
    var avScoreRounded = Math.round( avScoreStep * 10 ) / 10;
    var outOf = 10 - avScoreRounded;
    var avScore = new Chart(avScoreChart, {
        type: 'doughnut',
        data: {
            labels:['Average Score'],
            datasets:[{
                label: 'Points',
                backgroundColor: ['#61c3a8', '#eaeaea'],
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
    var qavScoreChart = document.querySelector('#qavScoreChart').getContext('2d');
    var qoutOf = 10 - qe.average;
    var qavScore = new Chart(qavScoreChart, {
        type: 'doughnut',
        data: {
            labels:['Average Score'],
            datasets:[{
                label: 'Points',
                backgroundColor: ['#61c3a8', '#eaeaea'],
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