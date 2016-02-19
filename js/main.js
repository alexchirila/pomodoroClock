$(document).ready(function(){

		var breakLength = parseInt($("#break-length").text(), 10);
		var minutes = parseInt($("#minutes").text(), 10);
		var pause;

			$("#break-minus, #break-plus, #session-minus, #session-plus, .timer").mouseover(function(){
				$('#break-minus, #break-plus, #session-minus, #session-plus, .timer').css( 'cursor', 'pointer' );
			});

			function plusMinusSession() {						
			
				$("#session-minus").click(function() {
					var sessionLength = parseInt($("#session-length").text(), 10);					

					if (sessionLength > 1) {
			            // Decrement one
			            sessionLength--;
			            $("#session-length").text(sessionLength);
			            $("#minutes").text(sessionLength);
			            $("#seconds").text('00');
			            console.log("Work" + sessionLength);
			        } else {
			            // Otherwise put a 1 there
			            $("#session-length").text('1');
			            $("#minutes").text('1');
			            console.log("Work" + sessionLength);
			            $("#seconds").text('00');
			        }
				});
			
			
				$("#session-plus").click(function() {
					var sessionLength = parseInt($("#session-length").text(), 10);
					sessionLength++;
					$("#session-length").text(sessionLength);
					$("#minutes").text(sessionLength);
					$("#seconds").text('00');
					console.log("Work" + sessionLength);
					
				});	

			} // end of plusMinusSession();

			function plusMinusBreak() {						
			
				$("#break-minus").click(function() {
					var breakLength = parseInt($("#break-length").text(), 10);					

					if (breakLength > 1) {
			            // Decrement one
			            breakLength--;
			            $("#break-length").text(breakLength);
			            $("#break-minutes").text(breakLength);
			            $("#break-seconds").text('00');
			            console.log("Break" + breakLength);
			        } else {
			            // Otherwise put a 1 there
			            $("#break-length").text('1');
			            $("#break-minutes").text('1');
			            console.log("Break" + breakLength);
			            $("#break-seconds").text('00');
			        }
				});
			
			
				$("#break-plus").click(function() {
					var breakLength = parseInt($("#break-length").text(), 10);
					breakLength++;
					$("#break-length").text(breakLength);
					$("#break-minutes").text(breakLength);
					$("#break-seconds").text('00');
					console.log("Break" + breakLength);
					
				});	

			} // end of plusMinusSession();


		plusMinusSession();
		plusMinusBreak();
		$(".break-timer-ul").hide();
		
			$('.timer').on('click', function(){
			$(this).toggleClass('timer-active'); 
			$('.session-li li').toggleClass("inactive");
			$('.break-li li').toggleClass("inactive");

			if($('.timer').hasClass('timer-active')){

				if ($('.timer').hasClass('break-time')) {
					breakCountdownSettings();
				} 

				if (!$('.timer').hasClass('break-time')) {
					sessionCountdownSettings();
				} 

			} else {
				
				console.log("Work timer INactive");
				clearInterval(sessionIntervalID);
				clearInterval(breakIntervalID);
			}

		});

	function sessionCountdownSettings(){

				$("#myHeader").text("Session!");
				
				var sessionTime;
				var sessionMinutes = parseInt($("#session-length").text(), 10);
				var sessionMinutez = parseInt($("#minutes").text(), 10);
				var sessionSeconds = parseInt($("#seconds").text(), 10);

				if (isNaN(sessionSeconds)) {
					sessionSeconds = 00;
				}
				if (isNaN(sessionMinutes)) {
					sessionMinutez = 00;
				}
				if (sessionMinutes == 60) {
					sessionMinutez = 59;
				}
				if (sessionSeconds == 60) {
					sessionSecondz = 59;
				}

				sessionTime = (60 * sessionMinutez) + (sessionSeconds);
				sessionCountdown(sessionTime);
	}		
		
	function sessionCountdown(sessionDuration) {
    	
    	var timer = sessionDuration;
    	var minutesHTML = document.getElementById("minutes");
        var secondsHTML = document.getElementById("seconds");

    	sessionIntervalID = setInterval(function () {
        		

        		var minutes = parseInt(timer / 60, 10);
        		var seconds = parseInt(timer % 60, 10);

        		seconds = seconds < 10 ? "0" + seconds : seconds;

        		minutesHTML.innerHTML = minutes;
        		secondsHTML.innerHTML = seconds;

        		if (--timer < 0) {
            		timer = 0;   

	    	    if (timer == 0) {
					clearInterval(sessionIntervalID);
					playSound();
					$('.timer').addClass('break-time');
					$(".timer-ul").hide();
					$(".break-timer-ul").show();
					$("#minutes").text(parseInt($("#session-length").text(), 10));
					breakCountdownSettings();
				}
        		}
    }, 1000);
    
	}

	function breakCountdownSettings(){

			 $("#myHeader").text("Break!");

				var breakTime;
				var breakMinutes = parseInt($("#break-length").text(), 10);
				var breakMinutez = parseInt($("#break-minutes").text(), 10);
				var breakSeconds = parseInt($("#break-seconds").text(), 10);

				if (isNaN(breakSeconds)) {
					breakSeconds = 00;
				}
				if (isNaN(breakMinutes)) {
					breakMinutez = 00;
				}
				if (breakMinutes == 60) {
					breakMinutez = 59;
				}
				if (breakSeconds == 60) {
					breakSeconds = 59;
				}

				breakTime = (60 * breakMinutez) + (breakSeconds);
				breakCountdown(breakTime);
	}	

	function breakCountdown(breakDuration) {
    	
    	var timer = breakDuration;
    	var minutesHTML = document.getElementById("break-minutes");
        var secondsHTML = document.getElementById("break-seconds");

    	breakIntervalID = setInterval(function () {
        		

        		var minutes = parseInt(timer / 60, 10);
        		var seconds = parseInt(timer % 60, 10);

        		seconds = seconds < 10 ? "0" + seconds : seconds;

        		minutesHTML.innerHTML = minutes;
        		secondsHTML.innerHTML = seconds;

        		if (--timer < 0) {
            		timer = 0;   

	    	    if (timer == 0) {
					clearInterval(breakIntervalID);
					playSound();
					$('.timer').removeClass('break-time');
					$(".break-timer-ul").hide();
					$(".timer-ul").show();
					$("#break-minutes").text(parseInt($("#break-length").text(), 10));
					sessionCountdownSettings();
					
				}
        		}
    }, 1000);
    
	}	
 
	function playSound(){
		var wav = 'http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3';
      	var audio = new Audio(wav);
		audio.play();
	}


	});