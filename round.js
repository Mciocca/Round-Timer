$(document).ready(function(){

  // # of rounds control
  rtotal = 0
  $("#rounds .plus").click(function(){
  	var rounds = parseInt($("#total-rounds").text());
  	rounds = rounds + 1
  	$("#total-rounds").text(rounds);
     rtotal = rounds;
    });

    $("#rounds .minus").click(function(){
  	var rounds = parseInt($("#total-rounds").text());
  	  if(rounds > 0){
  		rounds = rounds - 1
  	    };
       $("#total-rounds").text(rounds);
       rtotal = rounds;
    });

    // Round time controls seconds

 rminutes = 0;
 rseconds = 0;

  $("#round-time .plus").click(function(){
    var seconds = parseInt($("#round-time #r-seconds").text());
    seconds = seconds + 1 
    if (seconds < 60){
    if (seconds < 10){
      $("#round-time #r-seconds").text("0"+seconds)
      $("#tseconds").text("0" + seconds)
      rseconds = seconds
    }else{
      $("#round-time #r-seconds").text(seconds)
       $("#tseconds").text(seconds)
       rseconds = seconds
     };
    };
  }); 

 $("#round-time .minus").click(function(){
    var seconds = parseInt($("#round-time #r-seconds").text());
    seconds = seconds - 1 
    if (seconds > -1){
    if (seconds < 10){
      $("#round-time #r-seconds").text("0"+seconds)
       $("#tseconds").text("0" + seconds)
       rseconds = seconds
    }else{
      $("#round-time #r-seconds").text(seconds)
       $("#tseconds").text(seconds)
       rseconds = seconds
     };
    };
  });

  // Round time controls minutes 

 $("#round-time .plus-minutes").click(function(){
    var minutes = parseInt($("#round-time #r-minutes").text());
    minutes = minutes + 1 
    $("#round-time #r-minutes").text(minutes)
    $("#tminutes").text(minutes)
    rminutes = minutes
  }); 

  $("#round-time .minus-minutes").click(function(){
    var minutes = parseInt($("#round-time #r-minutes").text());
    minutes = minutes - 1
    if(minutes > (-1)){
    $("#round-time #r-minutes").text(minutes)
    $("#tminutes").text(minutes)};
    rminutes = minutes
     }); 

//rest controls
rtseconds = 0
rtminutes = 0

 $("#rest .plus").click(function(){
  var seconds = parseInt($("#rest #rt-seconds").text());
  seconds = seconds +1
  if (seconds < 60){
    if (seconds < 10){
    	$("#rest #rt-seconds").text("0"+seconds);
      rtseconds = seconds;
    }else{
    $("#rest #rt-seconds").text(seconds);	
    rtseconds = seconds;
    };
   };
});

  $("#rest .minus").click(function(){
  var seconds = parseInt($("#rest #rt-seconds").text());
  seconds = seconds -1  
    if(seconds >(-1) ){
      if(seconds < 10){
    	$("#rest #rt-seconds").text("0"+seconds);
      rtseconds = seconds;
    }else{
    $("#rest #rt-seconds").text(seconds);	
    rtseconds = seconds
     };
    };
});

 $("#rest .plus-minutes").click(function(){
  var min = parseInt($("#rest #rt-minutes").text());
  min = min +1    
    $("#rest #rt-minutes").text(min); 
    rtminutes = min
});

  $("#rest .minus-minutes").click(function(){
  var min = parseInt($("#rest #rt-minutes").text());
  min = min -1  
    if(min >(-1) ){
      $("#rest #rt-minutes").text(min);
      rtminutes = min
    };
});

// Main functionality starts here

var prep = null
var rest = null
var countdown = null
var bell = document.getElementById("bell");
var ten = document.getElementById("ten");
var gong = document.getElementById("gong")

$("#stop").click(function(){
  location.reload();
});

p = 10
$("#start").click(function(){
  $("#start").hide();
  //Need to stop start button from being pressed again.
  $("#prepare").css("margin-left","0")
  $("#ptimer").text(p);
   
   var prep = setInterval(function(){
    p -= 1
    $("#ptimer").text(p);
    if(p == 0){
      $("#prepare").css("margin-left","-9999px");
        clearInterval(prep);
           bell.play();
        counter();
    };
   //prep
   }, 1000);
   
});

;

//end
});


var counter = function(){
  restTime = 0
    var countdown = setInterval(function(){
      if((rtotal > 0) && (rseconds > 0) && (restTime == 0)){
        
          if((rseconds > -1) && (rseconds < 10)){
          rseconds -= 1;
          $("#tseconds").text("0" + rseconds);
        }else if(rseconds == 10){
          ten.play();
          rseconds -=1
          $("#tseconds").text("0"+rseconds);
        }else{
          rseconds -= 1
          $("#tseconds").text(rseconds);
          };
       
      }else if((rseconds == 0) && (rminutes >0)){
         rminutes -= 1;
         rseconds = 59;
         $("#tminutes").text(rminutes)
         $("#tseconds").text(rseconds)          
      }else if((rminutes == 0) && (rseconds == 0) && (restTime == 0) && (rtotal != 1)){
         gong.play();
         rtotal -= 1;
         restTime += 1;
        $("#tminutes").text(rtminutes);
         if(rtseconds < 10){
            $("#tseconds").text("0" + rtseconds);
         }else{
           $("#tseconds").text(rtseconds);
         }
        $("#round-counter").css("background-color","red")

      }else if ((rtotal >= 1) && (restTime == 1)){
        rest();
       //main if 
      }else{
        reset();
        clearInterval(countdown);
        alert("Session Over!")
          if(window.innerWidth <= 600){
            rtotal=$("#mobile-round-count").val();
            console.log(rtotal)
          }else{
            rtotal = parseInt($("#total-rounds").text());
          }
        $("#start").show();
      }
    },1000);
};

var rest = function(){ 
  if((rtseconds > 0) && (rtseconds <= 10)){
     rtseconds -= 1;
     $("#tseconds").text("0" + rtseconds);
  }else if(rtseconds > 10){
    rtseconds -= 1;
    $("#tseconds").text(rtseconds)
  
  }else if((rtseconds == 0) && (rtminutes >0)){
    rtminutes -= 1
    rtseconds = 59
    $("#tminutes").text(rtminutes);
    $("#tseconds").text(rtseconds);
  }else{
    restTime -=1
    bell.play();
    reset();
    
 };
}

var reset = function(){
  $("#round-counter").css("background-color","white")
  if(window.innerWidth <= 600 ){
  // reset variables from mobile inputs
    rminutes  = $(".mobile-round-minutes").val();
    rseconds  = $(".mobile-round-seconds").val(); 
    rtminutes = $(".mobile-rest-minutes").val();
    rtseconds  = $(".mobile-rest-seconds").val();
  }else{
   //reset variables from desktop inputs
    rseconds = parseInt($("#round-time #r-seconds").text());
    rminutes = parseInt($("#round-time #r-minutes").text());
    rtseconds = parseInt($("#rest #rt-seconds").text());
    rtminutes = parseInt($("#rest #rt-minutes").text());
  }
    $("#tminutes").text(rminutes);
      if((rseconds > 0) && (rseconds < 10)){
          $("#tseconds").text("0" + rseconds);
      }else{
          $("#tseconds").text(rseconds);
          };
    p = 10

}

