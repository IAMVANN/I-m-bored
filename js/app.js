///////////////////// CONSTANTS /////////////////////////////////////
/* GUIDE !!!!
0 = nothing;
1 = 1 traingle
2 = 1 square
-----------------------------------------------------------------------------------------------
How To make a level !!!!
Remember that character moves about 100 pixels per jumpcounter
lvl = ["Type of level", then buildings!!!!];

*/
const plainlvl = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // each one is worth 50 pixels. 15* 50 = 750;
const lv1 = ["Reg",1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0] //triagnle every 150 pixels // 150 * 10 = 1500 pixels
const lv2 = ["Reg", 2, 0 ,0, 2, 0,0, 2, 0, 0];
const lv3 = ["Backwards-Grav"];
const defalt = ["Reg", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const arrayMaster = [lv2, defalt] //put the levels u want here!!!!
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
let arrayposition = 1;
let currentObject;
let hitRay = []; //hit array
let hitRayPos = 0;
let groundRay = [];
let groundRayPos = 0;
let groundLevel = 400;
let groundStateCount = 0;
let groundedState = "off";
let groundStateTime = 0;
var player = {
    x1 : 400,
    x2 : 400, // prob gonna change this to GROUND LEVEL!!!
    y1 : 350,
    y2 : 400, //player.y1 is to act as the last position of y1.
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
        canvas.clearRect(0, 0, 1500, 500);
        // Make all init variables
        game = setInterval(action, 25);


    }

}
function action(){
    gametime += 1;
    hitRay.forEach((item, i) => {
        item.x1 -= 5;
        item.x2 -= 5;
    });
    groundRay.forEach((item, i) => {
        item.x1 -= 5;
        item.x2 -= 5;
    });

    unpack();
    ground();
    position();


    refresh();//finds current screen and passes it on to render
    render();//renders the whole thing
    contact();

    player.x2 = player.x1;
    player.y2 = player.y1;

    if(cooldown == 0){
        used = false;
    } else {
        cooldown--;
    }
}
function unpack(){
    let rando = Math.random();
    if(loading == true){
        if(gametime % 10 == 0){
            currentObject = currentArray[arrayposition];
            arrayposition++;
            if(arrayposition == currentArray.length - 1){
                loading = false;
            }

        }

    } else if(loading == false){

        loading = true;
        unpackingcounter++;
        arraypicker++;
        currentArray = arrayMaster[arraypicker];
        loading = true;
        arrayposition = 1;
    }
}
function contact(){
    hitRay.forEach((item, i) => {
        if(player.x1 + 50 >= item.x1 && player.x1 + 50 <= item.x2 && player.y1 + 50 >= item.y2){
            alert("Game end")
        }
    });

}

function endgame(){

}
function position(){
    if(currentArray[0] == "Reg"){
        if(movement == "top"){
            //need to fix this sometimeas
            used = true;
            if(jumpcounter < 10){
                canvas.clearRect(player.x2 - 1, player.y2 - 1, 52, 52);
                player.y1 -= 17;
                player.y2 -= 17;
                jumpcounter++;
            } else {

                movement = undefined;

            }


        }
         if(movement == undefined && player.y1 + 67 <= groundLevel){ //THIS 75 NEEDS TO BE CHANGED 50 + CHANGE;
            console.log(groundLevel)
            console.log(player.y1)
            if(player.y1 + 67 <= groundLevel ){
                canvas.clearRect(player.x2 - 1, player.y2 - 1, 52, 52);
                player.y1 += 17;
                player.y2 += 17;
            }
                jumpcounter = 10;
                movement = undefined;
                used = false;

        } else if(movement != "top"){
            jumpcounter = 0;
        }/*else if(movement == "Auto-Fall"){
            canvas.clearRect(player.x2 - 1, player.y2 - 1, 52, 52);
            player.y1 += 50;
            player.y2 += 50;
            jumpcounter = 0;
            movement = undefined;
            used = false;
        }*/
        canvas.clearRect(player.x1 - 1, player.y1 - 1, 52, 52);

        canvas.beginPath();
        canvas.moveTo(player.x1 + 5, player.y1 + 25);
        canvas.lineTo(player.x1, player.y1 + 25);
        canvas.strokeStyle = "white"
        canvas.stroke();
        canvas.strokeStyle = "white"
    } /*else if(currentArray[0] == "Backwards-Grav") {
        if(movement == "top"){
            //need to fix this sometimeas
            used = true;
            if(jumpcounter < 10){
                canvas.clearRect(player.x2 - 1, player.y2 - 1, 52, 52);
                player.y1 += 17;
                player.y2 += 17;
                jumpcounter++;
            } else {

                movement = undefined;

            }


        }
         if(movement == undefined && player.y1 - 67 >= groundLevel){ //THIS 75 NEEDS TO BE CHANGED 50 + CHANGE;
            console.log(groundLevel)
            console.log(player.y1)
            if(player.y1 - 67 >= groundLevel){
                canvas.clearRect(player.x2 - 1, player.y2 - 1, 52, 52);
                player.y1 -= 17;
                player.y2 -= 17;
            }
                jumpcounter = 10;
                movement = undefined;
                used = false;

        } else if(movement != "top"){
            jumpcounter = 0;
        }
        canvas.clearRect(player.x1 - 1, player.y1 - 1, 52, 52);

        canvas.beginPath();
        canvas.moveTo(player.x1 + 5, player.y1 + 25);
        canvas.lineTo(player.x1, player.y1 + 25);
        canvas.strokeStyle = "#9acd32"
        canvas.stroke();
        canvas.strokeStyle = "black"
    }
    */
}
function refresh(){
        var pixelfront = canvas.getImageData(5, 0, 1500, 500);
        canvas.clearRect(1495, 0, 5, 500);
        canvas.putImageData(pixelfront, 0, 0);
}
function render(){
    canvas.beginPath();
    canvas.lineWidth = 10;
    canvas.moveTo(1000, 406);
    canvas.lineTo(995, 406);
    canvas.stroke();
    canvas.lineWidth = 1;
    if(cooldown == 0){
        canvas.beginPath();
        canvas.rect(player.x1, player.y1, 50, 50);
        canvas.stroke();
    } else if (cooldown > 0){
        canvas.beginPath();
        canvas.rect(player.x1, player.y1, 50, 50);
        canvas.stroke();
    }

/*    canvas.beginPath()
        canvas.fillStyle = "red";
        canvas.rect(995, 0, 5, 166);
    canvas.fill();
    canvas.beginPath()
        canvas.fillStyle = "blue";
        canvas.rect(995, 166, 5, 166);
    canvas.fill();
    canvas.beginPath()
        canvas.fillStyle = "green";
        canvas.rect(995, 332, 5, 168);
    canvas.fill();
    canvas.fillStyle = "black"*/
    if(currentObject !== undefined){
        if(currentObject == 1){
            //triangle
            canvas.beginPath();
            canvas.moveTo(1500, 400);
            canvas.lineTo(1450, 400);
            canvas.lineTo(1475, 350);
            canvas.lineTo(1500, 400);
            canvas.stroke();
            adder(1450, 1475, 350, 400);
            adder(1475, 1500, 350, 400);
        } else if(currentObject == 2){
            canvas.beginPath;
            canvas.rect(1450, 350, 50, 50);
            canvas.stroke();
            adder(1450, 1450, 360, 400);
            adder(1500, 1500, 360, 400);
            stander(1450, 1500, 350, 350);

        }
        currentObject = undefined;
    }
}
function adder(x1, x2, y1, y2){
    hitRay[hitRayPos] = new Object();
    hitRay[hitRayPos].x1 = x1;
    hitRay[hitRayPos].x2 = x2;
    hitRay[hitRayPos].y1 = y1;
    hitRay[hitRayPos].y2 = y2;
    hitRayPos++;
}
function stander(x1, x2, y1, y2){
    groundRay[groundRayPos] = new Object();
    groundRay[groundRayPos].x1 = x1;
    groundRay[groundRayPos].x2 = x2;
    groundRay[groundRayPos].y1 = y1;
    groundRay[groundRayPos].y2 = y2;
    groundRayPos++;
}
function direction(event){
    if (event.keyCode == 32){
        if(used == false){
            movement = "top"
            used = true;
            cooldown = 21;
        }
    }
}
function ground(){
    if(groundStateCount == 0){
        /*let ppa = false; // just use to see if bottom is true/false
        groundRay.forEach((item, i) => {
            if(item.x2 == 400){
                ppa = true;
            }
        });
        if(groundedState == "On" && ppa == true){
            movement = "Auto-Fall"

        }*/
        groundedState = "off"
        groundLevel = 400;
        groundStateCount = undefined;
    }

    if(groundedState == "off"){
        //basically checks if there is something landable below the box, If yes, then grounded state is on for a certain period of timeout
        //In this certain period of time, the landable object will go away, and this can run again.
        groundRay.forEach((item, i) => {
            if(item.x1 <= 450 && item.x1 >= 400 ){
                groundedState = "On";
                groundStateCount = 95;
                groundLevel = item.y1;
            }
        });
    } else {

        groundStateCount -= 5;
    }

}
