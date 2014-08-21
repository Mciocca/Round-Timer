/* Notes: A function that formats seconds correctly 
          causes the timer to hang when the function is called
  */

$(document).ready(function(){
  //timer variables
  var totalRounds = 0,
      roundMinutes = 0,
      roundSeconds = 0,
      restSeconds = 0,
      restMinutes = 0,
//Main functionality variables 
//set interval functions to null to prevent running on window load
      prep = null,
      rest = null,
      countdown = null,
//round begin sound
      bell = document.getElementById("bell"),
//ten seconds left sound
      ten = document.getElementById("ten"),
//rest begin sound
      gong = document.getElementById("gong"),
//start 10 second prep timer
      p = 10;

  $("#rounds .plus").click(function(){
    var rounds = parseInt($("#total-rounds").text());
    rounds = rounds + 1;
    $("#total-rounds").text(rounds);
    totalRounds = rounds;
   });

  $("#rounds .minus").click(function(){
    var rounds = parseInt($("#total-rounds").text());
      if(rounds > 0){
        rounds = rounds - 1;
      }
    $("#total-rounds").text(rounds);
    totalRounds = rounds;
    });

// Round time controls 
  $("#round-time .plus").click(function(){
    var seconds = parseInt($("#round-time #r-seconds").text());
    seconds = seconds + 1 
    if (seconds < 60){
      if (seconds < 10){
        $("#round-time #r-seconds").text("0"+seconds);
        $("#tseconds").text("0" + seconds);
        roundSeconds = seconds; 
      }else{
        $("#round-time #r-seconds").text(seconds);
        $("#tseconds").text(seconds);
        roundSeconds = seconds;
      }    
    }
  }); 

 $("#round-time .minus").click(function(){
    var seconds = parseInt($("#round-time #r-seconds").text());
    seconds = seconds - 1;
    if (seconds > -1){
      if (seconds < 10){
        $("#round-time #r-seconds").text("0"+seconds);
        $("#tseconds").text("0" + seconds);
        roundSeconds = seconds;
      }else{
        $("#round-time #r-seconds").text(seconds);
        $("#tseconds").text(seconds);
        roundSeconds = seconds;   
      }
    }  
  });

   
 $("#round-time .plus-minutes").click(function(){
    var minutes = parseInt($("#round-time #r-minutes").text());
    minutes = minutes + 1; 
    $("#round-time #r-minutes").text(minutes);
    $("#tminutes").text(minutes);
    roundMinutes = minutes;
  }); 

  $("#round-time .minus-minutes").click(function(){
    var minutes = parseInt($("#round-time #r-minutes").text());
    minutes = minutes - 1;
    if(minutes > (-1)){
      $("#round-time #r-minutes").text(minutes)
      $("#tminutes").text(minutes)};
      roundMinutes = minutes;
     }); 

//rest controls 
 $("#rest .plus").click(function(){
    var seconds = parseInt($("#rest #rt-seconds").text());
    seconds = seconds +1
    if (seconds < 60){
      if (seconds < 10){
    	  $("#rest #rt-seconds").text("0"+seconds);
        restSeconds = seconds;
      }else{
        $("#rest #rt-seconds").text(seconds);	
        restSeconds = seconds;
      }
   }
});

  $("#rest .minus").click(function(){
    var seconds = parseInt($("#rest #rt-seconds").text());
    seconds = seconds -1  
      if(seconds >(-1) ){
        if(seconds < 10){
    	    $("#rest #rt-seconds").text("0"+seconds);
          restSeconds = seconds;
        }else{
          $("#rest #rt-seconds").text(seconds);	
          restSeconds = seconds;
        }
      }
  });

 $("#rest .plus-minutes").click(function(){
   var min = parseInt($("#rest #rt-minutes").text());
   min = min +1;    
   $("#rest #rt-minutes").text(min); 
   restMinutes = min;
 });

 $("#rest .minus-minutes").click(function(){
   var min = parseInt($("#rest #rt-minutes").text());
   min = min -1;  
    if(min >(-1) ){
      $("#rest #rt-minutes").text(min);
      restMinutes = min;
    }
  });


// mobile controls

$(".mobile-round-count").change(function(){
  totalRounds = parseInt($(this).val());
  console.log(totalRounds)
});

$(".mobile-round-minutes").change(function() {
  var min = parseInt($(this).val());
  roundMinutes = min;
  console.log(roundMinutes);
  $("#tminutes").text(roundMinutes);
});

$( ".mobile-round-seconds" ).change(function() {
  var seconds = parseInt($(this).val());
  roundSeconds = seconds;
  console.log(roundSeconds);
  $("#tseconds").text(roundSeconds);
});

$(".mobile-rest-minutes").change(function(){
  var minutes = parseInt($(this).val());
  restMinutes = minutes;
  console.log(restMinutes)
});

$(".mobile-rest-seconds").change(function(){
  var seconds = parseInt($(this).val());
  restSeconds = seconds;
  console.log(seconds);
});


//MAIN FUNCTIONALITY
$("#stop").click(function(){
  location.reload();
});

$("#start").click(function(){
  if(totalRounds == 0){
    alert("You must set the number of rounds");
  }else{
    $("#start").hide();
    $("#prepare").css("margin-left","0");
    $("#ptimer").text(p);
    var prep = setInterval(function(){
    p -= 1;
    $("#ptimer").text(p);
    //start main timer at the end of the prep timer, hide prep timer
    if(p == 0){
      $("#prepare").css("margin-left","-9999px");
      clearInterval(prep);
      bell.play();
      counter();
    }
   //prep end
   }, 1000); 
  }
});

var counter = function(){
  restTime = 0;
    var countdown = setInterval(function(){
      if((totalRounds > 0) && (roundSeconds > 0) && (restTime == 0)){
        //format seconds correctly
        if((roundSeconds > -1) && (roundSeconds < 10)){
          roundSeconds -= 1;
          $("#tseconds").text("0" + roundSeconds);
        }else if((roundSeconds == 10) && (roundMinutes == 0)){
          ten.play();
          roundSeconds -=1;
          $("#tseconds").text("0"+roundSeconds);
        }else{
          roundSeconds -= 1;
          $("#tseconds").text(roundSeconds);
        }  
      }else if((roundSeconds == 0) && (roundMinutes >0)){
        roundMinutes -= 1;
        roundSeconds = 59;
        $("#tminutes").text(roundMinutes);
        $("#tseconds").text(roundSeconds);         
      }else if((roundMinutes == 0) && (roundSeconds == 0) && (restTime == 0) && (totalRounds != 1)){
        gong.play();
        totalRounds -= 1;
        restTime += 1;
        $("#tminutes").text(restMinutes);
        //format seconds correctly
          if(restSeconds < 10){
            $("#tseconds").text("0" + restSeconds);
          }else{
            $("#tseconds").text(restSeconds);
          }
        $("#round-counter").css("background-color","red");
      }else if ((totalRounds >= 1) && (restTime == 1)){
        rest();
       //end of main if statement
      }else{
        reset();
        clearInterval(countdown);
        alert("Session Over!");
        //reset totalRounds for low res windows
          if(window.innerWidth <= 600){
            totalRounds=$("#mobile-round-count").val();
          }else{
            totalRounds = parseInt($("#total-rounds").text());
          }
        $("#start").show();
      }
    },1000);
}

//rest time
var rest = function(){ 
  if((restSeconds > 0) && (restSeconds <= 10)){
     restSeconds -= 1;
     $("#tseconds").text("0" + restSeconds);
  }else if(restSeconds > 10){
    restSeconds -= 1;
    $("#tseconds").text(restSeconds);
  }else if((restSeconds == 0) && (restMinutes >0)){
    restMinutes -= 1;
    restSeconds = 59;
    $("#tminutes").text(restMinutes);
    $("#tseconds").text(restSeconds);
  }else{
    restTime -=1;
    bell.play();
    reset(); 
 }
}
//resest all variables
var reset = function(){
  $("#round-counter").css("background-color","white");
    // reset variables from mobile inputs
    if(window.innerWidth <= 600 ){
      roundMinutes  = $(".mobile-round-minutes").val();
      roundSeconds  = $(".mobile-round-seconds").val(); 
      restMinutes = $(".mobile-rest-minutes").val();
      restSeconds  = $(".mobile-rest-seconds").val();
      totalRounds = $(".mobile-round-count").val();
    }else{
      //reset variables from desktop inputs
      roundSeconds = parseInt($("#round-time #r-seconds").text());
      roundMinutes = parseInt($("#round-time #r-minutes").text());
      restSeconds = parseInt($("#rest #rt-seconds").text());
      restMinutes = parseInt($("#rest #rt-minutes").text());
    }
  $("#tminutes").text(roundMinutes);
    if((roundSeconds > 0) && (roundSeconds < 10)){
      $("#tseconds").text("0" + roundSeconds);
    }else{
      $("#tseconds").text(roundSeconds);
    }
    p = 10;
}

//end
});