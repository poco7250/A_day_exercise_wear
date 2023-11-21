window.onload = function () {
    const timerDisplay = document.getElementById("timerDisplay");
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");
    const resetButton = document.getElementById("resetButton");
    const loginButton = document.getElementById("loginButton");
    let timerInterval;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
//    let isAccelerometerActive = false;
//    let accelerometer;
    
    
// // 가속도 센서 초기화
//    if ('LinearAccelerationSensor' in window) {
//        accelerometer = new LinearAccelerationSensor({ frequency: 60 });
//    } else {
//        console.log('가속도 센서가 지원되지 않는 환경입니다.');
//    }

 
    
 // 시작 버튼을 클릭할 때 실행될 함수
    startButton.addEventListener("click", function() {
    	
//    	if (!isAccelerometerActive) {
//            isAccelerometerActive = true;
//            accelerometer.addEventListener('reading', accelerometerHandler);
//            accelerometer.start();
//            console.log("가속도 센서 활성화");
//        }
    	// 시작 버튼 비활성화
        startButton.disabled = true;
    	
      // 타이머를 시작하고 1초마다 시간을 업데이트
    	console.log("버튼이 클릭되었습니다."); // 텍스트 메시지 출력

    	console.log("minutes:", minutes, "seconds:", seconds); // 변수의 값 출력
      timerInterval = setInterval(function() {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
          }
          if (minutes === 60) {
            minutes = 0;
            hours++;
          }
          // 시간을 시:분:초 형식으로 표시
          timerDisplay.innerText = 
            (hours < 10 ? "0" : "") + hours + ':' +
            (minutes < 10 ? "0" : "") + minutes + ':' +
            (seconds < 10 ? "0" : "") + seconds;
        }, 1000);
    });

    // 중지 버튼을 클릭할 때 실행될 함수
    stopButton.addEventListener("click", function() {
      // 타이머를 중지
      clearInterval(timerInterval);
//      if (isAccelerometerActive) {
//          isAccelerometerActive = false;
//          accelerometer.removeEventListener('reading', accelerometerHandler);
//          accelerometer.stop();
//          console.log("가속도 센서 비활성화");
//      }
      // 시작 버튼 활성화 (다시 클릭 가능)
      startButton.disabled = false;
    });

    // 리셋 버튼을 클릭할 때 실행될 함수
    resetButton.addEventListener("click", function() {
      // 타이머를 중지하고 시간을 초기화
      clearInterval(timerInterval);
      seconds = 0;
      minutes = 0;
      timerDisplay.innerText = "00:00:00";
//      if (isAccelerometerActive) {
//          isAccelerometerActive = false;
//          accelerometer.removeEventListener('reading', accelerometerHandler);
//          accelerometer.stop();
//          console.log("가속도 센서 비활성화");
//      }
    });
    
 // 이메일 등록 버튼 클릭 이벤트 처리
    loginButton.addEventListener("click", function() {
    	console.log("로그인 버튼 클릭됨");
        // 이메일 입력값 가져오기
        const emailInput = document.getElementById("emailInput");
        const enteredEmail = emailInput.value;
        const passwordInput = document.getElementById("passwordInput");
        const enteredPassword = passwordInput.value;

        // 등록된 이메일 표시
        const displayedEmail = document.getElementById("displayedEmail");
        if (enteredEmail) { // 입력값이 비어있지 않은 경우
        	firebase.auth().signInWithEmailAndPassword(enteredEmail, enteredPassword)
        	.then((userCredential) => {
        		// 로그인 성공
        		var user = userCredential.user;
        		console.log("로그인 성공:", user);
        		displayedEmail.textContent = enteredEmail;
				// 입력 칸 비우기 (선택사항)
				emailInput.value = "";
				passwordInput.value = "";
        	})
        	.catch((error) => {
        		const errorCode = error.code;
                const errorMessage = error.message;
                console.error("로그인 실패:", errorCode, errorMessage);
                alert("이메일과 비밀번호가\n올바르지 않습니다.");
        	});
        } else { // 입력값이 비어있는 경우
            alert("이메일과 비밀번호를\n올바르게 입력하세요."); // 경고 메시지를 표시
        }
    });
    
// // 가속도 센서 데이터 처리 핸들러
//    function accelerometerHandler() {
//        // 가속도 센서 데이터를 처리하는 코드
//        const x = accelerometer.x;
//        const y = accelerometer.y;
//        const z = accelerometer.z;
//        
//        console.log('X:', x, 'Y:', y, 'Z:', z);
//        // 여기에서 움직임을 예측하고 처리하는 로직을 작성
//    }
};
