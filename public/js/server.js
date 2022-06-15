//서버명
$(function start() {
    let token = localStorage.getItem('access_token')
    // console.log(token);
    let srv_id = localStorage.getItem('srv_id')
    // console.log(srv_id);

    $.ajax({
        headers: {
            "authorization": 'bearer ' + token,
        },
        type: "GET",
        url: "/server/info?srv_id=" + srv_id,

        success: (data) => {
            console.log(data.list[0].user_name)
            console.log(data.list[0].srv_name)
            console.log(data.admin_yn)

            var admin_yn = data.admin_yn
            var srv_name = data.list[0].srv_name
            var user_name = data.list[0].user_name

            var s_title = '<div>' + srv_name + '</div>'
            $(".s_title").text(srv_name)

            var drdr_user_name = '<strong>' + user_name + '</strong>'
            $("strong").text(user_name)


            const addMember_btn = document.getElementById('addMember_btn'); //수강생 추가
            const addNotice_btn = document.getElementById('addNotice_btn'); //공지 추가
            const addDate_btn = document.getElementById('addDate_btn'); //일정 추가
            const addMsg_btn = document.getElementById('addMsg_btn'); //채팅 추가
            const member_manage = document.getElementById('member_manage'); //수강생 관리
            const button_hr = document.getElementById('button_hr');

            if (admin_yn == "n") {
                addMember_btn.style.display = 'none';
                addNotice_btn.style.display = 'none';
                addDate_btn.style.display = 'none';
                addMsg_btn.style.display = 'none';
                member_manage.style.display = 'none';
                button_hr.style.display = 'none';
            } else {
                addMember_btn.style.display = 'show';
                addNotice_btn.style.display = 'show';
                addDate_btn.style.display = 'show';
                addMsg_btn.style.display = 'show';
                member_manage.style.display = 'show';
                button_hr.style.display = 'show';
            }

        }

    })


})


//일정 추가
function addCalendar() {
    var content = $(".cal_content").val();
    var start_date = $(".cal_start_date").val();
    var end_date = $(".cal_end_date").val();
    var start_time = $(".cal_start_time").val();
    var end_time = $(".cal_end_time").val();


    if (start_date == "") {
        alert("시작 일을 입력하세요")
    } else if (start_time == "") {
        alert("시작 시간을 입력하세요")
    } else if (end_date == "") {
        alert("종료 일을 입력하세요")
    } else if (end_time == "") {
        alert("종료 시간을 입력하세요")
    } else if (new Date(end_date + ' ' + end_time) <= new Date(start_date + ' ' + start_time)) { // date 타입으로 변경 후 확인
        alert("종료일을 시작일 이후로 지정해주세요.");
    } else if (content == null || content == "") {
        alert("글을 입력하세요")
    } else {

        let token = localStorage.getItem('access_token')
        console.log(token);
        let srv_id = localStorage.getItem('srv_id')
        console.log(srv_id)
        // alert('일정 추가')

        console.log(start_date)
        console.log(start_time)
        console.log(end_date)
        console.log(end_time)
        console.log(content)

        var c_start = start_date + "T" + start_time + ":00"
        console.log(c_start)
        var c_end = end_date + "T" + end_time + ":00"
        console.log(c_end)


        $.ajax({
            headers: {
                "authorization": 'bearer ' + token
            },
            type: "POST",
            url: "/server/calendar",//  url
            dataType: "json",

            data: {

                "srv_id": srv_id,
                "c_start": c_start,
                "c_end": c_end,
                "c_memo": content
            },


            success: (data) => {
                console.log(data)
                let result = data.result;
                if (result == "1") {
                    $('.addDate').modal('hide');
                    window.location.reload(); // 새로고침

                } else {
                    alert("오류가 발생하였습니다. 다시 실행해주시길 바랍니다.")
                }

            },

            error: function () {
                console.log("error")
            },
            complete: function (data) {

            }

        })
    }


}



// 공지 추가
function addNotice() {
    var notice_name = $(".nt_title").val();
    var notice_memo = $(".nt_content").val();

    if (notice_name == null || notice_name == "") {
        alert("공지 명을 입력하세요")
    } else if (notice_memo == null || notice_memo == "") {
        alert("공지 글을 입력하세요")
    } else {
        // console.log("입력 완료")
    }

    $(function () {

        $('.add_notice_btn').click(() => {
            let token = localStorage.getItem('access_token')
            console.log(token);
            let srv_id = localStorage.getItem('srv_id')
            console.log(srv_id)
            // alert('공지 추가')

            console.log(notice_name)
            console.log(notice_memo)

            $.ajax({
                headers: {
                    "authorization": 'bearer ' + token
                },
                type: "POST",
                url: "/server/notice?srv_id=" + srv_id,//  url
                dataType: "json",

                data: {

                    "srv_id": srv_id,
                    "n_name": notice_name,
                    "n_memo": notice_memo,
                },


                success: (data) => {
                    console.log(data)
                    let result = data.result;
                    if (result == "1") {
                        $('.addNotice').modal('hide');
                        window.location.reload(); // 새로고침

                    } else {
                        alert("오류가 발생하였습니다. 다시 실행해주시길 바랍니다.")
                    }

                },

                error: function () {
                    console.log("error")
                },
                complete: function (data) {

                }
            })

        })
    })
}


//회원 추가
function addMember() {
    var member_add = $(".member_add").val();

    if (member_add == null || member_add == "") {
        alert("학생 email을 입력하세요")
    }

    $(function () {

        $('.add_member_btn').click(() => {
            let token = localStorage.getItem('access_token')
            console.log(token);
            let srv_id = localStorage.getItem('srv_id')
            console.log(srv_id)
            // alert('회원 추가')

            console.log(member_add)

            $.ajax({
                headers: {
                    "authorization": 'bearer ' + token
                },
                type: "POST",
                url: "/server/member?srv_id=" + srv_id,//  url
                dataType: "json",

                data: {

                    "srv_id": srv_id,
                    "user_email": member_add,
                },


                success: (data) => {
                    console.log(data)
                    let result = data.result;
                    if (result == "1") {
                        $('.addMember').modal('hide');
                        window.location.reload(); // 새로고침

                    } else {
                        alert("오류가 발생하였습니다. 다시 실행해주시길 바랍니다.")
                    }

                },

                error: function () {
                    console.log("error")
                },
                complete: function (data) {

                }

            })

        })

    })
}

//채팅
$(function () {
    $('#server_chat').click(() => {
        $.ajax({
            success: function (result) {
                alert("추후 지원 될 예정입니다.")
                // localStorage.clear();
                // location.href = "#";
            }
        })
    });
});



//로그아웃
$(function () {
    $('#srv_logout').click(() => {
        $.ajax({
            success: function (result) {
                alert("로그아웃")
                localStorage.clear();
                location.href = "./join.html";
            }
        })
    });
});
