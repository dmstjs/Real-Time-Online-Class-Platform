// 로그인
$(function () {
	$('#login-submit').click(() => {

		var email = $('#email').val();
		var password = $('#password').val();

		// console.log(email)
		// console.log(password)

		$.ajax({
			url: '/login',
			type: 'post',
			data: {
				'email': email,
				'pwd': password,
			},
			success: function (res) {
				// console.log(res)
				let result = res.result;
				let msg = res.msg;
				// let token = res.accessToken;
				if (result == "1") {
					// $.cookie('token', token);
					// $.cookie('token', token, { path: './home.html' }); // 쿠키 설정

					localStorage.setItem("access_token", res['accessToken']) // 서버스토리지
					// alert(msg)
					location.href = './home.html';
				} else {
					alert(msg)
				}
				$(".msg_login").text(msg);
				$(".msg_login").css('color', 'red');
			},
			error: function (error) {
				console.log(error)
			},
			complete: function (data) {

			}
		});
	});
});

// 회원가입
$(function () {
	$('#register-submit').click(() => {
		var email_check_result = $('#email_check_result').val() // 이메일 중복 확인
		var pwd_check_result = $('#r_password').val(); //Password 같은지 여부
		var pwd_confirm_check_result = $('#r_confirm-password').val();
		var name_check_result = $('#r_name').val();   //이름
		var phone_check_result = $('#r_phone').val();   //전화번호
		var password_pattern = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,20}$/; //비밀번호 유효성
		var phone_pattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/; // 전화번호 유효성

		//이메일 중복체크 검사했는지
		if (email_check_result != "1") { // 이메일 중복 확인 X
			alert("이메일 중복체크를 해주시기 바랍니다.");
			return false;
		}
		// 이름 유효성 검사
		if (!name_check_result) {
			$("#r_name").focusout(); // 이름 유효성 검사
			return false;
		}
		// 비밀번호 일치 확인
		if (pwd_check_result != pwd_confirm_check_result || !(password_pattern.test(pwd_check_result))) {
			$("#r_password").focusout(); // 비밀번호 유효성 검사
			$("#r_confirm-password").focusout(); // 비밀번호확인 유효성 검사
			return false;
		}
		// 전화번호 유효성 검사
		if (!phone_check_result || !(phone_pattern.test(phone_check_result))) {
			$("#r_phone").focusout(); // 이름 유효성 검사
			return false;
		}

		var form_data = {
			"name": $('#r_name').val(),
			"email": $('#r_email').val(),
			"pwd": $('#r_password').val(),
			"tel": $('#r_phone').val()
		};
		$.ajax({
			type: "post",
			url: "/signup",
			data: form_data,
			dataType: 'json',
			success: function (res) {
				let result = res.result;
				let msg = res.msg;
				// alert("success");

				if (result == 1) {
					alert(msg)
					location.href = './join.html';

				} else {
					alert(msg)
					location.href = './join.html';
				}

				location.href = './join.html';
			},
			error: function (request, status, error) {
				console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
			}
		});
		return;
	});
});

// 이메일 중복 확인
$(function () {
	$('#email_check').click(() => {
		var email = $('#r_email').val();
		// console.log("ddd", email)
		$.ajax({
			type: "GET",
			url: "/emailCheck",
			data: { 'email': email },

			success: function (res) {
				let result = res.result;
				let msg = res.msg;
				var val = $(r_email).val(),
					regex = /^\S+@\S+$/i;
				// console.log(msg)
				// console.log(res)
				// console.log(result)
				// console.log(val)

				if (val == "" | val == null) {
					$(".msg_r_email").text("이메일을 입력해주시길 바랍니다.");
					$(".msg_r_email").css('color', 'red');
				}
				else if (!regex.test(val)) {
					$(".msg_r_email").text("양식에 맞춰서 입력해주시길 바랍니다. ex) test@test.com");
					$(".msg_r_email").css('color', 'red');
				}
				else if (result == 1) {
					$(".msg_r_email").text(msg);
					$(".msg_r_email").css('color', 'green');
					$('.r_email').attr("email_check_result", "success");
					// console.log(msg)
					document.getElementById("email_check_result").value = "1"; //중복확인을 했다는 flag
				}
				else if (result == -1) {
					$(".msg_r_email").text(msg);
					$(".msg_r_email").css('color', 'red');
					$('.r_email').attr("email_check_result", "fail");
					document.getElementById("email_check_result").value = "0"; //중복확인을 하지 않았다는 flag
				}
			},

			error: function (error) {
				console.log(error)
			}
		});
		// console.log(msg);
	});
});

//emailCheck flag를 초기화 해주는 함수
function init_emailCheck() {
	document.getElementById("email_check_result").value = "0";
}

$(function () {
	$('#login-form-link').click(function (e) {
		$("#login-form").delay(100).fadeIn(100);
		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function (e) {
		$("#register-form").delay(100).fadeIn(100);
		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});

// 로그인 - 이메일 유효성 검사
/*$("#email").focusout(function () {
	var val = $(this).val(),
		regex = /^\S+@\S+$/i;
 
	if (val == "" | val == null) {
		$(".msg_email").text("이메일을 입력해주시길 바랍니다.");
		$(".msg_email").css('color', 'red');
	}
	else if (!regex.test(val)) {
		$(".msg_email").text("양식에 맞춰서 입력해주시길 바랍니다. ex) test@test.com");
		$(".msg_email").css('color', 'red');
	}
	else {
		$(".msg_email").text("");
	}
});
 
// 로그인 - 비밀번호 유효성 검사
$("#password").focusout(function () {
	var val = $(this).val(),
		regex = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/;
	if (val == "" | val == null) {
		$(".msg_password").text("비밀번호를 입력해주시길 바랍니다.");
		$(".msg_password").css('color', 'red');
	}
	else if (!regex.test(val)) {
		$(".msg_password").text("비밀번호는 8~16자 영문 소문자, 숫자, 특수문자를 사용하세요.");
		$(".msg_password").css('color', 'red');
	}
	else {
		$(".msg_password").text("");
	}
});
*/
// 회원가입 - 이름 유효성 검사
$("#r_name").focusout(function () {
	var val = $(this).val()

	if (val == "" | val == null) {
		$(".msg_r_name").text("이름을 입력해주시길 바랍니다.");
		$(".msg_r_name").css('color', 'red');
		return false;
	}
	else {
		$(".msg_r_name").text("");
	}
});

// 회원가입 - 이메일 유효성 검사
$("#r_email").focusout(function () {
	var val = $(this).val(),
		regex = /^\S+@\S+$/i;

	if (val == "" | val == null) {
		$(".msg_r_email").text("이메일을 입력해주시길 바랍니다.");
		$(".msg_r_email").css('color', 'red');
		return false;
	}
	else if (!regex.test(val)) {
		$(".msg_r_email").text("양식에 맞춰서 입력해주시길 바랍니다. ex) test@test.com");
		$(".msg_r_email").css('color', 'red');
		return false;
	}
	else {
		$(".msg_r_email").text("");
	}
});

// 회원가입 - 비밀번호 유효성 검사
$("#r_password").focusout(function () {
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

// 회원가입 - 비밀번호 확인 유효성 검사
$("#r_confirm-password").focusout(function () {
	var orgin = $("#r_password").val()

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

// 회원가입 - 전화번호 유효성 검사
$("#r_phone").focusout(function () {
	var val = $(this).val(),
		regex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
	if (val == "" | val == null) {
		$(".msg_r_phone").text("전화번호를 입력해주시길 바랍니다.");
		$(".msg_r_phone").css('color', 'red');
		return false;
	}
	else if (!regex.test(val)) {
		$(".msg_r_phone").text("양식에 맞춰서 입력해주시길 바랍니다.ex) 010-1234-5678");
		$(".msg_r_phone").css('color', 'red');
		return false;
	}
	else {
		$(".msg_r_phone").text("");
	}
});