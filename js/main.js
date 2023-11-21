window.onload = function () {
    const timerDisplay = document.getElementById("timerDisplay");
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");
    const resetButton = document.getElementById("resetButton");
    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");
    const displayedEmail = document.getElementById("displayedEmail");
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
    	const currentDate = new Date();
    	const year = currentDate.getFullYear();
    	const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 만듦
    	const day = String(currentDate.getDate()).padStart(2, '0'); // 일도 2자리로 만듦

    	// yyyy-mm-dd 형식으로 날짜 문자열 생성
    	const formattedDate = `${year}-${month}-${day}`;
    	
    	const measuredTime = document.getElementById('timerDisplay').textContent;
    	// 초 단위로 변환 (예시: HH:mm:ss 형태의 시간을 초로 변환)
    	const timeInSeconds = convertTimeToSeconds(measuredTime);
    	// 유저의 이메일 가져오기 (예시: displayedEmail이 유저의 이메일이라고 가정)
        const userEmail = displayedEmail.textContent;
        
     // Exercise 컬렉션에 해당 이메일 문서가 있는지 확인
        const exercisesRef = firestore.collection('Exercises').doc(userEmail);
        const timeRef = exercisesRef.collection('time').doc(formattedDate);
    	
     // time 컬렉션이 있는 경우, 해당 문서를 업데이트
        timeRef.get().then((docSnapshot) => {
            if (docSnapshot.exists) {
                // 문서가 이미 존재하는 경우
                const currentSeconds = docSnapshot.data().totalseconds;

                // 기존 시간에 워치에서 기록한 시간 더하기
                const totalSeconds = currentSeconds + timeInSeconds;

                // 기존 문서 업데이트
                timeRef.update({
                    totalseconds: totalSeconds,
                }).then(() => {
                    console.log("시간이 성공적으로 저장되었습니다.");
                }).catch((error) => {
                    console.error("업데이트 중 오류 발생:", error);
                });
            } else {
                // 문서가 없는 경우, 새로운 문서 생성
                timeRef.set({
                    totalseconds: timeInSeconds,
                }).then(() => {
                    console.log("시간이 성공적으로 저장되었습니다.");
                }).catch((error) => {
                    console.error("저장 중 오류 발생:", error);
                });
            }
        }).catch((error) => {
            console.error("데이터 가져오기 중 오류 발생:", error);
        });
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
        const enteredEmail = emailInput.value;
        const enteredPassword = passwordInput.value;
        // 등록된 이메일 표시
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
				
				// 숨기기
			    emailInput.style.visibility = 'hidden';
			    passwordInput.style.visibility = 'hidden';
			    loginButton.style.visibility = 'hidden';
			    logoutButton.style.visibility = 'visible';
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
    
    logoutButton.addEventListener("click", function() {
    	displayedEmail.textContent = "";
    	emailInput.style.visibility = 'visible';
        passwordInput.style.visibility = 'visible';
        loginButton.style.visibility = 'visible';
        logoutButton.style.visibility = 'hidden';
    });
    
    function convertTimeToSeconds(time) {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    }
    
    
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
