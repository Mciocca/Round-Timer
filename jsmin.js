$(document).ready(function(){rtotal=0;$("#rounds .plus").click(function(){var g=parseInt($("#total-rounds").text());g=g+1;$("#total-rounds").text(g);rtotal=g});$("#rounds .minus").click(function(){var g=parseInt($("#total-rounds").text());if(g>0){g=g-1}$("#total-rounds").text(g);rtotal=g});rminutes=0;rseconds=0;$("#round-time .plus").click(function(){var g=parseInt($("#round-time #r-seconds").text());g=g+1;if(g<60){if(g<10){$("#round-time #r-seconds").text("0"+g);$("#tseconds").text("0"+g);rseconds=g}else{$("#round-time #r-seconds").text(g);$("#tseconds").text(g);rseconds=g}}});$("#round-time .minus").click(function(){var g=parseInt($("#round-time #r-seconds").text());g=g-1;if(g>-1){if(g<10){$("#round-time #r-seconds").text("0"+g);$("#tseconds").text("0"+g);rseconds=g}else{$("#round-time #r-seconds").text(g);$("#tseconds").text(g);rseconds=g}}});$("#round-time .plus-minutes").click(function(){var g=parseInt($("#round-time #r-minutes").text());g=g+1;$("#round-time #r-minutes").text(g);$("#tminutes").text(g);rminutes=g});$("#round-time .minus-minutes").click(function(){var g=parseInt($("#round-time #r-minutes").text());g=g-1;if(g>(-1)){$("#round-time #r-minutes").text(g);$("#tminutes").text(g)}rminutes=g});rtseconds=0;rtminutes=0;$("#rest .plus").click(function(){var g=parseInt($("#rest #rt-seconds").text());g=g+1;if(g<60){if(g<10){$("#rest #rt-seconds").text("0"+g);rtseconds=g}else{$("#rest #rt-seconds").text(g);rtseconds=g}}});$("#rest .minus").click(function(){var g=parseInt($("#rest #rt-seconds").text());g=g-1;if(g>(-1)){if(g<10){$("#rest #rt-seconds").text("0"+g);rtseconds=g}else{$("#rest #rt-seconds").text(g);rtseconds=g}}});$("#rest .plus-minutes").click(function(){var g=parseInt($("#rest #rt-minutes").text());g=g+1;$("#rest #rt-minutes").text(g);rtminutes=g});$("#rest .minus-minutes").click(function(){var g=parseInt($("#rest #rt-minutes").text());g=g-1;if(g>(-1)){$("#rest #rt-minutes").text(g);rtminutes=g}});var c=null;var f=null;var e=null;var d=document.getElementById("bell");var b=document.getElementById("ten");var a=document.getElementById("gong");$("#stop").click(function(){location.reload()});p=10;$("#start").click(function(){$("#start").hide();$("#prepare").css("margin-left","0");$("#ptimer").text(p);var g=setInterval(function(){p-=1;$("#ptimer").text(p);if(p==0){$("#prepare").css("margin-left","-9999px");clearInterval(g);d.play();counter()}},1000)})});var counter=function(){restTime=0;var a=setInterval(function(){if((rtotal>0)&&(rseconds>0)&&(restTime==0)){if((rseconds>-1)&&(rseconds<10)){rseconds-=1;$("#tseconds").text("0"+rseconds)}else{if(rseconds==10){ten.play();rseconds-=1;$("#tseconds").text("0"+rseconds)}else{rseconds-=1;$("#tseconds").text(rseconds)}}}else{if((rseconds==0)&&(rminutes>0)){rminutes-=1;rseconds=59;$("#tminutes").text(rminutes);$("#tseconds").text(rseconds)}else{if((rminutes==0)&&(rseconds==0)&&(restTime==0)&&(rtotal!=1)){gong.play();rtotal-=1;restTime+=1;$("#tminutes").text(rtminutes);if(rtseconds<10){$("#tseconds").text("0"+rtseconds)}else{$("#tseconds").text(rtseconds)}$("#round-counter").css("background-color","red")}else{if((rtotal>=1)&&(restTime==1)){rest()}else{reset();clearInterval(a);alert("Session Over!");if(window.innerWidth=360){rtotal=$("#mobile-round-count").val()}else{rtotal=parseInt($("#total-rounds").text())}$("#start").show()}}}}},1000)};var rest=function(){if((rtseconds>0)&&(rtseconds<=10)){rtseconds-=1;$("#tseconds").text("0"+rtseconds)}else{if(rtseconds>10){rtseconds-=1;$("#tseconds").text(rtseconds)}else{if((rtseconds==0)&&(rtminutes>0)){rtminutes-=1;rtseconds=59;$("#tminutes").text(rtminutes);$("#tseconds").text(rtseconds)}else{restTime-=1;bell.play();reset()}}}};var reset=function(){$("#round-counter").css("background-color","white");if(window.innerWidth<=360){rminutes=$(".mobile-round-minutes").val();rseconds=$(".mobile-round-seconds").val();rtminutes=$(".mobile-rest-minutes").val();rtseconds=$(".mobile-rest-seconds").val()}else{rseconds=parseInt($("#round-time #r-seconds").text());rminutes=parseInt($("#round-time #r-minutes").text());rtseconds=parseInt($("#rest #rt-seconds").text());rtminutes=parseInt($("#rest #rt-minutes").text())}$("#tminutes").text(rminutes);if((rseconds>0)&&(rseconds<10)){$("#tseconds").text("0"+rseconds)}else{$("#tseconds").text(rseconds)}p=10};