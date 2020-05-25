///////////////////// CONSTANTS /////////////////////////////////////
/* GUIDE !!!!
0 = nothing;
1 = 1 traingle
1.5 = 1 small triangle
2 = 1 square
2.01 = Square long platform
2.11 =  level 1 floating square small square;
2.115 = level 1 floating square small square TRAP;
2.12 =  level 2 floating square small square;
2.125 = level 2 floating square small square TRAP;
2.2 = 1 Tall square;
2.3 = small square;
2.5 = 1 square TRAP
2.7 = Long tall block;
100 = FINISH LINE;
-----------------------------------------------------------------------------------------------
How To make a level !!!!
Remember that character moves about 100 pixels per jumpcounter
lvl = ["Type of level", then buildings!!!! The amount of buildings can be unlimited!@$WR];
*/
// IDEA, perhaps do [1, "AMOUNT OF TIME", 2 "AMOUNT OF TIME"];
const plainlvl = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // each one is worth 50 pixels. 15* 50 = 750;
const lv1 = ["Reg", 1, 1, 1.5, 1, 2, 2, 2, 1, 2, 2.01, 2.2, 2.11, 2.12, 2.11, 2.2, 2, 1, 2.5, 2, 2.2, 2.11, 2.125, 2.01, 2.2, 2.11, 2.12, 2.7, 2.7,  2.7, "winner" ] //triagnle every 150 pixels // 150 * 10 = 1500 pixels
const lv2 = ["Reg", 2, 0 ,0, 2, 0,0, 2, 0, 0];
const lv3 = ["Backwards-Grav"];
const defalt = ["Reg", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const arrayMaster = [lv1]; //put the levels u want here!!!!
const timingMaster = [125, 250, 375, 385, 485, 600, 644, 710, 720, 800, 830, 870, 910, 930, 950, 970, 1050, 1100, 1200, 1235, 1275, 1315, 1400, 1430, 1470, 1510, 1605, 1685, 1745, 1830];
const starPosition = [600, 600, 350]; //
const starMaster = [325, 670, 1615];
///////////////////// APP STATE (VARIABLES) /////////////////////////
let start;
let started = false;
let startScreen;
let game;
let movement;
let gametime = 0;
let jumpcounter = 0;
let cooldown = false;
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
let groundLevel = 600;
let groundStateCount = 0;
let groundedState = "off";
let groundStateTime = 0;
let currentTime = 0;
let starRay = [];
let starRayPos = 0;
let starCooldown = 0;
var player = {
    x1 : 500,
    x2 : 500, // prob gonna change this to GROUND LEVEL!!!
    y1 : 550,
    y2 : 600 //player.y2 is to act as the last position of y1.
}
let used = false;
let stars = 0;
let starBoolean = false;
let currentStar = 0;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
let board = document.getElementById("board");
let canvas = board.getContext("2d");
let control =  document.getElementById("Control")
let dinoOpen = document.getElementById("pic1");
let dinoClose = document.getElementById("pic2");
let chicken = document.getElementById("pic3");
let x1 = document.getElementById("pic4");
let x2 = document.getElementById("pic5");
let x3 = document.getElementById("pic6");
///////////////////// EVENT LISTENERS ///////////////////////////////
// start screen//
window.onload = function(){
    startScreen = document.createElement("div");
    start = document.createElement("h2");
    start.id = "start";
    start.innerHTML = "start";
    startScreen.append(start);
    control.append(startScreen);
}
control.onclick = init;
document.addEventListener("keydown", direction);
///////////////////// FUNCTIONS /////////////////////////////////////
function init(object){
    if(object.target === start){
        started = true;
        startScreen.remove();
        canvas.clearRect(0, 100, 1500, 600);
        // Make all init variables
        game = setInterval(action, 20);/* Source https://www.bitdegree.org/learn/javascript-setinterval */

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
    starRay.forEach((item, i) => {
        item.x1 -= 5;
        item.x2 -= 5;
    });

    unpack();
    ground();
    position();


    refresh();//finds current screen and passes it on to render
    render();//renders the whole thing
    contact();
    starCounter();
    player.x2 = player.x1;
    player.y2 = player.y1;

    if(cooldown == 0){
        used = false;
    } else {
        cooldown--;
    }
}
function unpack(){
    if(loading == true){
        if(gametime >= timingMaster[currentTime]){
            currentTime++;
            currentObject = currentArray[arrayposition];
            arrayposition++;
            if(arrayposition == currentArray.length){
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
    if(gametime == starMaster[currentStar] && currentStar <= starMaster.length - 1){

        starBoolean = true;
    } else {
        starBoolean = false;
    }
}
function contact(){
    hitRay.forEach((item, i) => {
        if(item.type == "straight"){
            if((player.x1 + 50 >= item.x1 && player.x1 + 50 <= item.x2 && player.y1 + 50 >= item.y1 && player.y1 + 50 <= item.y2) || (player.x1 >= item.x1 && player.x1 <= item.x2 && player.y1 + 50 >= item.y1 && player.y1 + 50 <= item.y2)){
                 loseGame();
            }
        } else if(item.type == "slant"){ // three seperate hitboxes per slant; y- 0- 15. y- 16- 30. y 30 - 50
            if(player.x1 + 35 >= item.x1 && player.x1 + 35 <= item.x2 && player.y1 + 50 >= item.y1 && player.y1 + 50 <= item.y2 - 35){//in theorey, this should be yintercept 1
                loseGame();
            } else if(player.x1 + 45 >= item.x1 && player.x1 + 45 <= item.x2 && player.y1 + 50 >= item.y1 + 15 && player.y1 + 50 <= item.y2 - 15){
                 loseGame();
            } else if(player.x1 + 50 >= item.x1 && player.x1 + 50 <= item.x2 && player.y1 + 50 >= item.y1 + 35 &&  player.y1 + 50 <= item.y2){
                 loseGame();
            }
            if(player.x1 >= item.x1 && player.x1 <= item.x2 - 15 && player.y1 + 50 >= item.y1 && player.y1 + 50 <= item.y2 - 35){//backside
                loseGame();
            } else if(player.x1 >= item.x1 && player.x1 <= item.x2 - 5 && player.y1 + 50 >= item.y1 + 15 && player.y1 + 50 <= item.y2 - 15){//backside
                loseGame();
            } else if(player.x1 >= item.x1 && player.x1 <= item.x2 && player.y1 + 50 >= item.y1 + 35&& player.y1 + 50 <= item.y2){//backside
                loseGame();
            }

        } else {
            alert("something wrong");
        }

    });
    if(starCooldown == 0){
        starRay.forEach((item, i) => {
            if((player.x1 + 50 >= item.x1 && player.x1 + 50 <= item.x2 && player.y1 + 50 >= item.y2) || (player.x1 >= item.x1 && player.x1 <= item.x2 && player.y1 + 50 >= item.y2)){
                starCooldown = 20;
                stars++;
            }
        });
    } else {
        starCooldown = starCooldown - 1;
    }
}
function loseGame(){
     clearInterval(game);
     canvas.clearRect(0, 0, 1500, 700);
     let loseScreen = document.createElement("div");
     let pop = document.createElement("h2");
     pop.innerHTML = "You lost!!!";
     startScreen.append(pop);
     control.append(startScreen);
}
function position(){
    if(currentArray[0] == "Reg"){
        if(movement == "top"){
            //need to fix this sometimeas
            used = true;
            if(jumpcounter < 19){
                canvas.clearRect(player.x2 - 1, player.y2 - 1, 52, 52);
                player.y1 -= 13;
                player.y2 -= 13;
                jumpcounter++;
            } else {

                movement = undefined;

            }


        }
         if(movement == undefined && player.y1 + 63 <= groundLevel){ //THIS 63 NEEDS TO BE CHANGED 50 + CHANGE * 2;
            if(player.y1 + 76 <= groundLevel ){
                canvas.clearRect(player.x2 - 1, player.y2 - 1, 52, 52);
                player.y1 += 13;
                player.y2 += 13;
            } else if(player.y1 + 63 <= groundLevel){// The purpose for this code segment is to make sure that the character y value doesn't "float above the ground"
                canvas.clearRect(player.x2 - 1, player.y2 - 1, 52, 52);
                let k = groundLevel - (player.y1 + 52);
                player.y1 += k;
                player.y2 += k;
            }
                jumpcounter = 19;
                movement = undefined;
                used = false;

        } else if(movement != "top"){
            jumpcounter = 0;
        }
        canvas.clearRect(player.x1 - 1, player.y1 - 1, 52, 52);

        canvas.beginPath();
        canvas.moveTo(player.x1 + 5, player.y1 + 25);
        canvas.lineTo(player.x1, player.y1 + 25);
        canvas.strokeStyle = "white"
        canvas.stroke();
        canvas.strokeStyle = "white"
    }
}
function refresh(){
        var pixelfront = canvas.getImageData(5, 100, 1500, 700);/* https://www.w3schools.com/tags/canvas_getimagedata.asp */
        canvas.clearRect(1495, 100, 5, 700);
        canvas.putImageData(pixelfront, 0, 100);
}
function winScreen(){
    clearInterval(game);
    canvas.clearRect(0, 0, 1500, 700);
    let winScreen = document.createElement("div");
    let pop = document.createElement("h2");
    pop.innerHTML = "Congrats for beating the game. Dino is now full";
    startScreen.append(pop);
    control.append(startScreen);
}
function render(){

    canvas.beginPath();
    canvas.lineWidth = 10;
    canvas.moveTo(1000, 606);
    canvas.lineTo(995, 606);
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
    if(gametime % 10 < 5){
            canvas.drawImage(dinoOpen, player.x1, player.y1);
        } else {
            canvas.drawImage(dinoClose, player.x1 , player.y1 );
    }

    if(currentObject !== undefined){
        if(currentObject == 1){
            //triangle
            canvas.beginPath();
            canvas.moveTo(1500, 600);
            canvas.lineTo(1450, 600);
            canvas.lineTo(1475, 550);
            canvas.lineTo(1500, 600);
            canvas.stroke();
            adder(1450, 1475, 550, 600, "slant");
            adder(1475, 1500, 550, 600, "slant");
        } else if(currentObject == 1.5){
            canvas.beginPath();
            canvas.moveTo(1500, 600);
            canvas.lineTo(1450, 600);
            canvas.lineTo(1475, 575);
            canvas.lineTo(1500, 600);
            canvas.stroke();
            adder(1450, 1475, 575, 600, "straight");
            adder(1475, 1500, 575, 600, "straight");

        } else if(currentObject == 2){
            canvas.beginPath;
            canvas.rect(1450, 550, 50, 50);
            canvas.stroke();
            adder(1450, 1450, 560, 600, "straight");
            adder(1500, 1500, 560, 600, "straight");
            stander(1450, 1500, 550, 550);
        } else if(currentObject == 2.01){
            canvas.beginPath;
            canvas.rect(1200, 550, 300, 50);
            canvas.stroke();
            adder(1200, 1200, 560, 600, "straight");
            adder(1500, 1500, 560, 600, "straight");
            stander(1200, 1500, 550, 550);
        } else if(currentObject == 2.11){
            canvas.beginPath;
            canvas.rect(1450, 400, 50, 15);
            canvas.stroke();
            adder(1450, 1450, 410, 415, "straight");
            adder(1500, 1500, 410, 415, "straight");
            stander(1450, 1500, 400, 400);
        } else if(currentObject == 2.115){
            canvas.beginPath;
            canvas.rect(1450, 400, 50, 15);
            canvas.stroke();
            adder(1450, 1450, 410, 415, "straight");
            adder(1500, 1500, 410, 415, "straight");
            stander(1450, 1500, 400, 400);
            canvas.beginPath();
            canvas.moveTo(1500, 400);
            canvas.lineTo(1450, 400);
            canvas.lineTo(1475, 350);
            canvas.lineTo(1500, 400);
            canvas.stroke();
            adder(1450, 1475, 350, 400, "slant");
            adder(1475, 1500, 350, 400, "slant");
        } else if(currentObject == 2.12){
            canvas.beginPath;
            canvas.rect(1450, 350, 50, 15);
            canvas.stroke();
            adder(1450, 1450, 360, 365, "straight" );
            adder(1500, 1500, 360, 365, "straight");
            stander(1450, 1500, 350, 350);
        } else if(currentObject == 2.125){
            canvas.beginPath;
            canvas.rect(1450, 350, 50, 15);
            canvas.stroke();
            adder(1450, 1450, 360, 365, "straight");
            adder(1500, 1500, 360, 365, "straight");
            stander(1450, 1500, 350, 350);
            canvas.beginPath();
            canvas.moveTo(1500, 350);
            canvas.lineTo(1450, 350);
            canvas.lineTo(1475, 300);
            canvas.lineTo(1500, 350);
            canvas.stroke();
            adder(1450, 1475, 300, 350, "slant");
            adder(1475, 1500, 300, 350, "slant");
        } else if(currentObject == 2.2){
            canvas.beginPath;
            canvas.rect(1450, 450, 50, 150);
            canvas.stroke();
            adder(1450, 1450, 460, 600, "straight");
            adder(1500, 1500, 460, 600, "straight");
            stander(1450, 1500, 450, 450);

        } else if(currentObject == 2.5){
            canvas.beginPath;
            canvas.rect(1450, 550, 50, 50);
            canvas.stroke();
            adder(1450, 1450, 560, 600, "straight");
            adder(1500, 1500, 560, 600, "straight");
            stander(1450, 1500, 550, 550);
            canvas.beginPath();
            canvas.moveTo(1500, 550);
            canvas.lineTo(1450, 550);
            canvas.lineTo(1475, 500);
            canvas.lineTo(1500, 550);
            canvas.stroke();
            adder(1450, 1475, 500, 550, "slant");
            adder(1475, 1500, 500, 550, "slant");

        } else if(currentObject == 2.7){
            canvas.beginPath;
            canvas.rect(1100, 350, 400, 250);
            canvas.stroke();
            adder(1100, 1100, 360, 600, "straight");
            adder(1500, 1500, 360, 600, "straight");
            stander(1100, 1500, 350, 350);
        } else if(currentObject == "winner"){
            winScreen();
        }


        currentObject = undefined;
    }
    if(starBoolean == true){
         canvas.drawImage(chicken, 1450, starPosition[currentStar]-50);

        starer(1450, 1500, starPosition[currentStar] - 50, starPosition[currentStar]);
        currentStar++;
    }
}
function starCounter(){
    canvas.clearRect(850, 0, 1000, 100);
    canvas.drawImage(chicken, 850, 25);
    if(stars == 1){
        canvas.drawImage(x1, 920, 25);
    } else if(stars == 2){
        canvas.drawImage(x2, 920, 25);
    } else if(stars == 3){
        canvas.drawImage(x3, 920, 25);
    }
};
function adder(x1, x2, y1, y2, type){
    hitRay[hitRayPos] = new Object();
    hitRay[hitRayPos].x1 = x1;
    hitRay[hitRayPos].x2 = x2;
    hitRay[hitRayPos].y1 = y1;
    hitRay[hitRayPos].y2 = y2;
    hitRay[hitRayPos].type = type;
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
    if (event.keyCode == 87){
        if(used == false){
            movement = "top"
            used = true;
            cooldown = 21;
        }
    }
}
function ground(){
    if(groundStateCount == 0){

        groundedState = "off"
        groundLevel = 600;
        groundStateCount = undefined;
    }

    if(groundedState == "off"){
        //basically checks if there is something landable below the box, If yes, then grounded state is on for a certain period of timeout
        //In this certain period of time, the landable object will go away, and this can run again.
        groundRay.forEach((item, i) => {
            if(item.x1 <= 550 && item.x1 >= 500){
                groundedState = "On";
                groundStateCount = item.x2-item.x1 + 55;
                groundLevel = item.y1;
            }
        });
    } else {

        groundStateCount -= 5;
    }

}
function starer(x1, x2, y1, y2){
    starRay[starRayPos] = new Object();
    starRay[starRayPos].x1 = x1;
    starRay[starRayPos].x2 = x2;
    starRay[starRayPos].y1 = y1;
    starRay[starRayPos].y2 = y2;
    starRayPos++;
}
