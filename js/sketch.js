var database;
var fedTime, lastFed, foodObj;
var dog,sadDog,happyDog;
var foodS,foodStock;
var feed,addFood;

function preload(){
  sadDog = loadImage ("images/Dog.png");
  happyDog = loadImage ("images/happyDog.png");
}


function setup(){
  var canvas = createCanvas (1000,500);
  database = firebase.database();

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton ('Feed The Dog');
  feed.position (600,10,30,10);
  feed.mousePressed (feedDog);

  addFood = createButton ('Add Food');
  addFood.position (720,10,20,10);
  addFood.mousePressed (addFoods);
  
}


function draw(){
    background (46,138,87);

    fill (255,255,254)
    textSize (15)

    if (lastFed>=12)
    {
        text ("Last Feed : "+ lastFed%12 + " PM",350,30);
    }

    else if (lastFed==0)
    {
        text ("Last Feed : 12 AM", 350, 30);
    }

    else {
        text ("Last Feed : "+ lastFed + "AM",350,30);
    }

    drawSprites();
}


function readStock(data){
    foodS=data.val();
    foodObj.updateFoodStock(foodS);
}


function feedDog(){
    dog.addImage (happyDog);

    foodObj.updateFoodStock (foodObj.getFoodStock()-1);
    database.ref ('/').update({
        Food:foodObj.getFoodStock(),
        FeedTime:hour()
    })
}


function addFoods(){
    foodS++;
    database.ref ('/').update({
        Food:foodS
    })
}


