///////////////////// CONSTANTS /////////////////////////////////////

///////////////////// APP STATE (VARIABLES) /////////////////////////
let start;
let started = false;
let game;
let movement;
let gametime = 0;
let jumpcounter = 0;
let cooldown = 0;
var player = {
    x1 : 300,
    x2 : 300,
    y1 : 300,
    y2 : 300,
    status : "normal"
}
let used = false;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
let board = document.getElementById("board");
let canvas = board.getContext("2d");
let control =  document.getElementById("Control")
///////////////////// EVENT LISTENERS ///////////////////////////////
// start screen//
window.onload = function(){
    start = document.createElement("h2");
    start.id = "start";
    start.innerHTML = "start";
    control.append(start);
}
control.onclick = init;
document.addEventListener("keydown", direction);
///////////////////// FUNCTIONS /////////////////////////////////////
function init(object){
    if(object.target === start){
        started = true;
        start.remove();
        canvas.clearRect(0, 0, 1024, 500);
        // Make all init variables
        game = setInterval(action, 100);


    }

}
function action(){
    gametime += 1;
    position();
    reset();//finds current screen and passes it on to render
    render();//renders the whole thing

    player.x2 = player.x1;
    player.y2 = player.y1;

    console.log(cooldown)
    if(cooldown == 0){
        used = false;
    } else {
        cooldown--;
    }
}
function position(){
    if(movement == "top"){
        //need to fix this sometimeas
        used = true;
        if(jumpcounter < 5){
            canvas.clearRect(player.x2 - 1, player.y2 - 1, 22, 22);
            player.y1 -= 20;
            player.y2 -= 20;
            jumpcounter++;
        } else {

            jumpcounter = 0;
            movement = "fall";

        }


    } else if(movement == "fall"){
        if(jumpcounter < 5){
            canvas.clearRect(player.x2 - 1, player.y2 - 1, 22, 22);
            player.y1 += 20;
            player.y2 += 20;
            jumpcounter++;
        } else {
            jumpcounter = 0;
            movement = undefined;
            used = false;
        }
    }
    canvas.clearRect(player.x1 - 1, player.y1 - 1, 22, 22);

}
function reset(){
    for(var x = 0; x <= 1000; x++) {

            // Get the pixel at this location
            if(x <= 995 ){
                var pixelfront = canvas.getImageData(x+5, 0, 1, 500);

            } else {
                canvas.clearRect(x, 0, 1, 500 )
            }
            canvas.putImageData(pixelfront, x , 0);

        }

}
function render(){
    canvas.beginPath();
    canvas.moveTo(997, 300);
    canvas.lineTo(1000, 300);
    canvas.stroke();
    canvas.beginPath();
    canvas.moveTo(995, 200);
    canvas.lineTo(1000, 200);
    canvas.stroke();
    canvas.beginPath();
    canvas.moveTo(995, 100);
    canvas.lineTo(1000, 100);
    canvas.stroke();
    canvas.beginPath();
    canvas.rect(player.x1, player.y1, 20, 20);
    canvas.stroke();
}
function direction(event){
    if(event.keyCode == 37){
        movement = "left";
    } else if (event.keyCode == 39){
        movement = "right";
    } else if (event.keyCode == 38){
        if(used == false){
            movement = "top"
            used = true;
            cooldown = 11;
        }
    }
}
