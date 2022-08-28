// Get All Elements
let userInput = document.querySelector('#userInput');
let loaderBtn = document.querySelector('#loaderBtn');
let summaryBtn = document.querySelector('#summaryBtn');
let invalidFeedback = document.querySelector('.invalid-feedback');
let validFeedback = document.querySelector('.valid-feedback');
let outputContainer = document.querySelector('#outputContainer');
let rangeDisplayValue = document.getElementById('display-range-value');
let rangeElement = document.getElementById('SummaryPercentage');
let modalTitle = document.querySelector('.modal-title');
let modalBody = document.querySelector('.modal-body');
let reloadBtn = document.querySelector('.reload');


const URL = 'http://127.0.0.1:5000/api/youtube-summary/';