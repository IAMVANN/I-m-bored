///////////////////// CONSTANTS /////////////////////////////////////z
let levelz = document.getElementById("levels");
let board = document.getElementById("board");
let ctx. = board.getContext("2d");
let control =  document.getElementById("Control")

///////////////////// APP STATE (VARIABLES) /////////////////////////

let statScreen;
let game;
let player = [
    width = 50,
    hieght = 100,
    sprite = undefined,
    x-vel = 0,//velocity
    y-vel = 0
]
let ground = [
    x-start = 0,
    x-end = 
    
]
let terrain = {}

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
    startScreen.remove()
    ctx.clearRect();
    game = setInterval(action, 30);
}
function action(){
    
    draw();
}
function draw(){
    
    
}

