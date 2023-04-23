var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var clickNo=0;
var gameStarted=false;

$(document).on("keypress", function(){
    if(gameStarted===false){
        nextSequence();
        $("h1").text("Level " + level);
    }
    gameStarted=true;
});

$(".btn").click(function(){
    if(gameStarted){
        clickNo++;
        var userChosenColor=String(this.id);
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);

        if(clickNo===gamePattern.length){
            check(userClickedPattern, gamePattern);
            clickNo=0;
            userClickedPattern=[];
        }
    
    }
    
});

function nextSequence(){
    level++;
    $("h1").text("Level "+level);

    var randomNumber=Math.round(Math.random()*3);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    console.log(gamePattern);
}

function playSound(name){   
    var sound= new Audio("./sounds/"+name+".mp3")
    sound.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100)
}

function check(user, game){
    for(var i = 0; i < user.length; i++) {
        if(user[i] !== game[i]) {
            var loseSound = new Audio("./sounds/Mario Death - QuickSounds.com.mp3");
            $("body").addClass("game-over");
            setTimeout(function(){$("body").removeClass("game-over")}, 200);
            $("h1").text("You lost! Press any key to start over.");
            loseSound.play();
            gamePattern=[];
            level=0;
            gameStarted=false;
        }
        else{
            console.log("correct");
        }
        
    }
    // Check if user and game arrays are equal
  if (JSON.stringify(user) === JSON.stringify(game)) {
    setTimeout(nextSequence, 1000);
  }
}