$(function start() {
  let token = localStorage.getItem('access_token')
  // console.log(token);

  $.ajax({
    headers: {
      "authorization": 'bearer ' + token,
    },
    type: 'GET',
    url: '/setting',

    success: (data) => {
      // console.log(data)
      //이름
      var user_name = data.list[0].user_name;
      $('#usernameModal_input').val(user_name); //이름수정 모달에 기존 이름 전달
      $('#user_name').text(user_name);

      //계정
      var user_email = data.list[0].user_email;
      // console.log(user_email)
      // $('#emailModal_input').val(user_email); //이메일 전달
      $('#user_email').text(user_email);

    },
    error: (error) => {
      console.log(error)
    },
  });
});

// 이름 수정
$(function () {
  $('#name_btn').click(() => {
    let token = localStorage.getItem('access_token');
    var alertname = $('#usernameModal_input').val(); // 수정한 이름
    $.ajax({
      headers: {
        "authorization": 'bearer ' + token,
      },
      data: {
        'name': alertname
      },
      type: 'put',
      url: '/setting/name',

      success: (data) => {
        // console.log(data)
        let result = data.result;
        let msg = data.msg;

        if (result == "1") {
          alert(msg)
          $('#usernameModal').modal('hide'); // 모달창 닫기
          window.location.reload(); // 새로고침
        }
        else {
          alert("오류가 발생하였습니다. 다시 실행해주시길 바랍니다.")
        }
      },
      error: (error) => {
        // console.log('실패')
        console.log(error)
      },
    });
  });
});

// 계정 삭제
$(function () {
  $('#delete_btn').click(() => {
    let token = localStorage.getItem('access_token');
    var password = $('#delModal_input').val(); // 비밀번호
    $.ajax({
      headers: {
        "authorization": 'bearer ' + token,
      },
      data: {
        'pwd': password
      },
      type: 'put',
      url: '/signout',

      success: (data) => {
        // console.log(data)
        let result = data.result;
        let msg = data.msg;

        if (result == "1") {
          alert(msg)
          $('#accountdeleteModal').modal('hide'); // 모달창 닫기
          localStorage.clear();
          location.href = "./join.html";
        }
        else {
          alert(msg)
          // console.log(result)
          // console.log(data)
        }
      },
      error: (error) => {
        // console.log('실패')
        console.log(error)
      },
    });
  });
});

// 비밀번호 변경
$(function () {
  $('#pwdchange_btn').click(() => {
    let token = localStorage.getItem('access_token');
    var password = $('#modal_pw').val(); // 비밀번호
    var new_password = $('#modal_newpw').val(); //새로운 비밀번호
    var newpw_confirm = $('#modal_newpwconfirm').val(); //새로운 비밀번호확인  
    var password_pattern = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,20}$/; //비밀번호 유효성  

    if(new_password != newpw_confirm || !(password_pattern.test(new_password))){
      $("#modal_newpw").focusout(); // 비밀번호 유효성 검사
			$("#modal_newpwconfirm").focusout(); // 비밀번호확인 유효성 검사
			return false;
    }
    
    $.ajax({
      headers: {
        "authorization": 'bearer ' + token,
      },
      data: {
        'pwd': password,
        'changePwd' : new_password
      },
      type: 'put',
      url: '/setting/pwd',

      success: (data) => {
        // console.log(data)
        let result = data.result;
        let msg = data.msg;

        if (result == "1") {
          alert(msg)
          $('#pwchangeModal').modal('hide'); // 모달창 닫기
          window.location.reload(); // 새로고침
        }
        else {
          alert(msg)
          // console.log(result)
          // console.log(data)
        }
      },
      error: (error) => {
        // console.log('실패')
        console.log(error)
      },
    });
  });
});

// 비밀번호 유효성 검사
$("#modal_newpw").focusout(function () {
	var val = $(this).val(),
		regex = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/;
	if (val == "" | val == null) {
		$(".msg_r_password").text("비밀번호를 입력해주시길 바랍니다.");
		$(".msg_r_password").css('color', 'red');
		return false;
	}
	else if (!regex.test(val)) {
		$(".msg_r_password").text("비밀번호는 8~16자 영문 소문자, 숫자, 특수문자를 사용하세요.");
		$(".msg_r_password").css('color', 'red');
		return false;
	}
	else {
		$(".msg_r_password").text("");
	}
});

// 비밀번호 확인 유효성 검사
$("#modal_newpwconfirm").focusout(function () {
	var orgin = $("#modal_newpw").val()

	val = $(this).val();
	regex = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/;
	if (val == "" | val == null) {
		$(".msg_r_confirm-password").text("비밀번호를 확인해주시길 바랍니다.");
		$(".msg_r_confirm-password").css('color', 'red');
		return false;
	}
	else if (val != orgin) {
		$(".msg_r_confirm-password").text("비밀번호가 일치하지 않습니다.");
		$(".msg_r_confirm-password").css('color', 'red');
		return false;
	}
	else {
		$(".msg_r_confirm-password").text("비밀번호가 일치합니다.");
		$(".msg_r_confirm-password").css('color', 'green');
	}
});

const myFace = document.getElementById("myFace");
const cameraBtn = document.getElementById("camera"); // 카메라 켜기 버튼
const muteBtn = document.getElementById("mute"); // 음소거 켜기 버튼
const camerasSelect = document.getElementById("cameras"); //카메라정보들 가져오기
const muteSelect = document.getElementById("mutes"); //카메라정보들 가져오기

let myStream; // 스트림 = 비디오 + 오디오
let muted = false;
let cameraOff = false;

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    //사용(또는 접근)이 가능한 미디어 입력장치나 출력장치들의 리스트를 가져오기
    const cameras = devices.filter((device) => device.kind === "videoinput");  //비디오장치만 거르기
    // console.log(cameras);
   
    const currentCamera = myStream.getVideoTracks()[0];
    cameras.forEach((camera) => { //화면에 장치들 보이게 
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) { //현재선택된 카메라를 옵션에서 보이게설정
        option.selected = true;
      }
      camerasSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

// 음성리스트
async function getMutes() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    //사용(또는 접근)이 가능한 미디어 입력장치나 출력장치들의 리스트를 가져오기
    const mutes = devices.filter((device) => device.kind === "audioinput");   // 오디오 입력장치만 거르기
    // console.log(mutes);
   
    const currentMute = myStream.getVideoTracks()[0];
    mutes.forEach((mute) => { //화면에 장치들 보이게 
      const option = document.createElement("option");
      option.value = mute.deviceId;
      option.innerText = mute.label;
      if (currentMute.label === mute.label) { //현재선택된 카메라를 옵션에서 보이게설정
        option.selected = true;
      }
      muteSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

async function getMedia(deviceId) {
    const initialConstrains = {
      audio: true,
      video: { facingMode: "user" },
    }; //모바일 장치의 전면카메라 요청
    const cameraConstraints = {
      audio: true,
      video: { deviceId: { exact: deviceId } },
    }; //해당 deviceid 카메라 요청 코드 
    try {
        myStream = await navigator.mediaDevices.getUserMedia(
            deviceId ? cameraConstraints : initialConstrains,
          ); //사용자에게 미디어 입력장치 사용권한을 요청
          myFace.srcObject = myStream; //화면에 캠보이게
          if (!deviceId) {
            await getCameras(); //카메라들정보 가져옴
            await getMutes();
          }
        } catch (e) {
          console.log(e); /* 오류 처리 */
        }
    }
    getMedia();
    function handleMuteClick() { // 오디오 정보들
      myStream
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      if (!muted) {
        muteBtn.innerText = "음소거 끄기";
        muted = true;
      } else {
        muteBtn.innerText = "음소거 켜기";
        muted = false;
      }
    }
    function handleCameraClick() { //비디오정보들
      myStream
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
        if (cameraOff) {
            cameraBtn.innerText = "카메라 끄기";
            cameraOff = false;
          } else {
            cameraBtn.innerText = "카메라 켜기";
            cameraOff = true;
          }
        }
        //다른카메라 누를시 카메라전환
        async function handleCameraChange() {
          await getMedia(camerasSelect.value); //해당 카메라의 id를 보내 카메라를 바꿈 
        }

        async function handleMuteChange() {
          await getMedia(muteSelect.value); //해당 카메라의 id를 보내 카메라를 바꿈 
        }
        
        muteBtn.addEventListener("click", handleMuteClick);
        cameraBtn.addEventListener("click", handleCameraClick);
        camerasSelect.addEventListener("input", handleCameraChange);
        muteSelect.addEventListener("input", handleMuteChange);

