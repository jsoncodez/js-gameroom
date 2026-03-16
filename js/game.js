document.addEventListener('DOMContentLoaded', () => {
  const muteButton = document.getElementById('mute-button');
  const bgMusic = document.getElementById('bg-music'); // Access the background music element
    bgMusic.volume = 0.2;
  // Set up the event listener for the mute button
  muteButton.addEventListener('click', () => {
    // Toggle the muted state of the background music
    bgMusic.muted = !bgMusic.muted;

    // Change the button text based on the mute state
    if (bgMusic.muted) {
      muteButton.textContent = 'Unmute Music'; // Change to "Unmute Music" if muted
    } else {
      muteButton.textContent = 'Mute Music'; // Change to "Mute Music" if unmuted
    }
  });
});


const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

canvas.width = 800
canvas.height = 600

const room = new Image()
room.src = "assets/room.png"

const player = new Player(400,320)

const keys = {}

document.addEventListener("keydown", e=>{
    keys[e.key] = true

    if(e.key.toLowerCase() === "f"){
        checkInteraction()
    }
})

document.addEventListener("keyup", e=>{
    keys[e.key] = false
})


/* WALL COLLISIONS */

const collisions = [

/* outer walls */

{x:0,y:0,width:800,height:80}, //NORTH WALL
{x:0,y:0,width:3,height:600}, //WEST WALL
{x:798,y:0,width:3,height:600}, //EAST WALL
{x:0,y:598,width:800,height:3},//SOUTH WALL
{x:20,y:170,width:180,height:100}, //WEST WALL BOOKCASE
{x:300,y:170,width:204,height:100}, //KITCHEN WEST WALL
{x:450,y:80,width:54,height:90}, //KITCHEN WEST WALL BLACK AREA

/* BED */

{x:50,y:50,width:120,height:90},


/*CLOSET*/

{x:360,y:40,width:75,height:80},

/* DESK + COMPUTER */

{x:250,y:35,width:100,height:80},


/* KITCHEN COUNTER */

{x:600,y:35,width:200,height:80},


/* FRIDGE */

// {x:700,y:90,width:70,height:50},


/* RIGHT COUCH */

{x:350,y:430,width:50,height:100},

/* LEFT COUCH */

{x:0,y:430,width:50,height:100},

/* SOUTH COUCH */

{x:100,y:560,width:200,height:40},

/* COFFEE TABLE */

{x:660,y:180,width:90,height:70},


/* TV STAND */

{x:160,y:350,width:75,height:70},

/* PLANT AND BOOKCASE */

{x:2,y:270,width:90,height:70},


/* STAIRS & WALL ATTACHED*/

{x:700,y:300,width:100,height:200},
{x:600,y:300,width:300,height:100}

]



/* INTERACTION OBJECTS */

const interactions = [

{
name:"Computer",
x:240,
y:50,
width:105,
height:100,
action:()=>{
showMessage("You check your computer.")
}
},

{
name:"Coffee",
x:620,
y:160,
width:170,
height:120,
action:()=>{
showMessage("You take a sip of coffee.")
}
},

{
name:"TV",
x:145,
y:335,
width:105,
height:100,
action:()=>{
showMessage("You watch TV for a bit.")
}
}

]

let message = ""
let messageTimer = 0

function showMessage(text){

message = text
messageTimer = 180

}



function checkInteraction(){

    for(let obj of interactions){

        if(isColliding(player,obj)){
        obj.action()
        return
        }

    }

}



/* OBJECT MESSAGE */

function drawMessage(){

    if(messageTimer > 0){

    ctx.fillStyle = "black"
    ctx.fillRect(200,500,400,60)

    ctx.fillStyle = "white"
    ctx.font = "20px Arial"
    ctx.fillText(message,220,535)

    messageTimer--

    }

}



/* DEBUG COLLISION DRAW */

function drawCollisions(){

    ctx.strokeStyle="lime"

    collisions.forEach(c=>{
    ctx.strokeRect(c.x,c.y,c.width,c.height)
    })

}
function drawInteractions(){

    ctx.strokeStyle = "yellow"
    ctx.lineWidth = 2

    interactions.forEach(obj => {

        ctx.strokeRect(
            obj.x,
            obj.y,
            obj.width,
            obj.height
        )

    })

}


/* GAME LOOP */

function gameLoop(){

player.move(keys, collisions)

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.drawImage(room,0,0,800,600)

player.draw(ctx)

/* enable if you want to see hitboxes */
 drawCollisions()

player.draw(ctx)

drawInteractions()


drawMessage()

requestAnimationFrame(gameLoop)

}


room.onload = ()=>{
gameLoop()
}
