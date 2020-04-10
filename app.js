///////////////////// CONSTANTS /////////////////////////////////////
/* GUIDE
0 = nothing;
1 = 1 traingle
2 = 1 square
3 = 1 triangle on a square
4 = 2 squares stacked up
5 = 1 triangle on 2 squares
6 = 3 squares stacked up
7 =





*/
const plainlvl = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // each one is worth 50 pixels. 15* 50 = 750;
const lv1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] //triagnle every 150 pixels
const arrayMaster = [ lv1, plainlvl]
///////////////////// APP STATE (VARIABLES) /////////////////////////
let start;
let started = false;
let game;
let movement;
let gametime = 0;
let jumpcounter = 0;
let cooldown = false
let loading = false //tells us if we are in the middle of loading something;
let unpackingcounter;
let arraypicker = -1; //shows which array is being used in array master.
let currentArray;
let arrayposition = 0;
let currentObject;
let hitRay = []; //hit array
let hitRayPos = 0;
var player = {
    x1 : 400,
    x2 : 400,
    y1 : 350,
    y2 : 400,
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
    start.innerHTML = "Start";
    control.append(start);
}
control.onclick = init;
document.addEventListener("keydown", direction);
///////////////////// FUNCTIONS /////////////////////////////////////
function init(object){
    if(object.target === start){
        started = true;
        start.remove();
        canvas.clearRect(0, 0, 1500, 500);
        // Make all init variables
        game = setInterval(action, 15);


    }

}
function action(){
    gametime += 1;
    unpack();
    position();
    refresh();//finds current screen and passes it on to render
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
function unpack(){
    let rando = Math.random();
    if(loading == true){
        if(gametime % 30 == 0){
            currentObject = currentArray[arrayposition];
            arrayposition++;
            if(arrayposition == 10){
                loading = false;
            }

        }

    } else if(loading == false){

        loading = true;
        unpackingcounter++;
        arraypicker++;
        currentArray = arrayMaster[arraypicker];
        loading = true;
    }
}
function position(){
    if(movement == "top"){
        //need to fix this sometimeas
        used = true;
        if(jumpcounter < 5){
            canvas.clearRect(player.x2 - 1, player.y2 - 1, 52, 52);
            player.y1 -= 50;
            player.y2 -= 50;
            jumpcounter++;
        } else {

            jumpcounter = 0;
            movement = "fall";

        }


    } else if(movement == "fall"){
        if(jumpcounter < 5){
            canvas.clearRect(player.x2 - 1, player.y2 - 1, 52, 52);
            player.y1 += 50;
            player.y2 += 50;
            jumpcounter++;
        } else {
            jumpcounter = 0;
            movement = undefined;
            used = false;
        }
    }
    canvas.clearRect(player.x1 - 1, player.y1 - 1, 52, 52);

}
function refresh(){
    for(var x = 0; x <= 1500; x++) {

            // Get the pixel at this location
            if(x <= 1495 ){
                var pixelfront = canvas.getImageData(x+5, 0, 1, 500);

            } else {
                canvas.clearRect(x, 0, 1, 500 )
            }
            canvas.putImageData(pixelfront, x , 0);

        }

}
function render(){
    canvas.beginPath();
    canvas.lineWidth = 10;
    canvas.moveTo(1000, 406);
    canvas.lineTo(995, 406);
    canvas.stroke();
    canvas.lineWidth = 1;
    canvas.beginPath();
    canvas.rect(player.x1, player.y1, 50, 50);
    canvas.stroke();
    if(currentObject !== undefined){
        if(currentObject == 1){
            //triangle
            canvas.beginPath();
            canvas.moveTo(1500, 405);
            canvas.lineTo(1450, 405);
            canvas.lineTo(1475, 355);
            canvas.lineTo(1500, 405);
            canvas.stroke();
            adder(1450, 1475, 405, 355);
            adder(1475, 1450, 355, 405);
        } else if(currentObject == 0){

        }
        currentObject = undefined;
    }
}
function adder(p, p2, l1, l2){
    hitRay[hitRayPos] ;
}
function direction(event){
    if(event.keyCode == 37){
        movement = "left";
    } else if (event.keyCode == 38){
        if(used == false){
            movement = "top"
            used = true;
            cooldown = 11;
        }
    }
}
