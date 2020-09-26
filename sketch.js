//Create variables here

var database;
var dog, happyDog;
var foods, foodStock;
var firebase;

var dogImage, dogImage2, dogSprite;

var gameStage = "start";

function preload()
{
  dogImage = loadImage("images/DogReg.jpg");
  dogImage2 = loadImage("images/DogHappy.png");
  
}

function setup() {
  createCanvas(500, 500);
  
  dogSprite = createSprite(250,350, 30,30);
  dogSprite.addImage(dogImage);

  //initialize the firebase connection
  firebase.initializeApp(firebaseConfig);
  console.log(firebase);

  //create the database
  database = firebase.database();
  
  // Use the food variable
  foodStock = database.ref('Food');

  //On is a function handler which reads changes to the food variable
  foodStock.on('value', readStock);

  //scale(0.1);
  
}


function draw() {  
  background(46, 139, 87);

  if(gameStage === "start"){
    fill("white");
    //text("Press Space to Start!", 250, 200);
    gameStage = "resetImg"
  }


  if(keyWentDown(UP_ARROW) && gameStage === "feed"){

    foods = foods - 1; 
    
    console.log(foods);

    dogSprite.addImage(dogImage2);

    gameStage = "resetImg";

    if(foods === 0){
      fill("white");
      text("Congratulations!", 250, 150);
      gameStage = "End";
    }
  }

  if(keyWentDown("SPACE") && gameStage === "resetImg"){
    dogSprite.addImage(dogImage);
    gameStage = "feed"
  }

  drawSprites();
  
  textSize(15);
  fill("white");
  text("Press Up_Arrow to feed Ginger!", 120, 25);

  text("Key: Press Space Means Feed Me Again!", 120, 55)

  text("Food Left: "+foods, 180, 85);

}

// Readstock is a asynchronous 
function readStock (data)
{
  foods = data.val();
  //console.log(foods);
}





