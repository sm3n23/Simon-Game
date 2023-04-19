var userClickedPattern = [];
var gamePattern = [];
var buttoncolors = ["red", "blue","green","yellow"];

var level = 0;
var started = false;




function nextsequence(){
    level ++; 
    $("h1").text("level " + level);
    var randomnumber = Math.floor(Math.random()*4);
    var randomchosencolor = buttoncolors[randomnumber];
    gamePattern.push(randomchosencolor);
    

    $("#"+randomchosencolor).fadeOut(100).fadeIn(100);
    playSound(randomchosencolor);
    
    
    
    
}  




$(document).keypress(function(){
    while (!started){
    $("h1").text("level " + level);
    nextsequence();
    
    started=true;
    }
});

$(".btn").click(function(){
    
    userchosencolor = this.id;
    userClickedPattern.push(userchosencolor);
    console.log(userClickedPattern);
    console.log(gamePattern);
    playSound(userchosencolor);
    animatepress(userchosencolor);
    checkAnswer(userClickedPattern.length-1);
    
})

function playSound(name){
    
    var audio = new Audio("sounds/"+name+".mp3")
    audio.play();
    
 }
    
function animatepress(currentcolor){
    
    $("#"+currentcolor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentcolor).fadeOut(100).fadeIn(100).removeClass("pressed");
    },100);
    
    
} 

function checkAnswer(currentlevel){
    if(userClickedPattern[currentlevel] === gamePattern[currentlevel]){
        console.log("success");
         
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextsequence();},1000
            );
            userClickedPattern=[];
        }
    }else{
        console.log("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").fadeOut(100).fadeIn(100).removeClass("game-over");
        },200);
        playSound("wrong");
        startOver();
        
        
    }
}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
    userClickedPattern = [];
}