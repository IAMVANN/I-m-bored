///////////////////// CONSTANTS /////////////////////////////////////z
let levelz = document.getElementById("levels");
let board = document.getElementById("board");
let canvas = board.getContext("2d");
let control =  document.getElementById("Control")

///////////////////// APP STATE (VARIABLES) /////////////////////////
let GameState = ¨OFF¨;
let start;
let statScreen;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////

///////////////////// EVENT LISTENERS ///////////////////////////////
//start screen
window.onload = function(){
    startScreen = document.createElement(¨div¨);
    start = docuemnt.createElement(¨h2¨)
    start.id = ¨start¨;
    start.innerHTML = ¨start¨;
    startScreen.append(start);
    control.append(startScreen); 
}
control.onclick = init;
document.addEventListener("keydown", direction);

///////////////////// FUNCTIONS /////////////////////////////////////
function init(){
}
function direction(){
}
