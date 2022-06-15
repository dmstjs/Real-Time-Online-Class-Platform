// 페이지 들어오자마자
var server_id = -1;
let token = localStorage.getItem('access_token')

let k = '';
$("#keyword").keyup(function () {
    k = $("#keyword").val();
    // console.log("키1", k);
})

// 검색버튼
$(function () {
    searchMsg();
    
    $('#homes').click(() => { // 상단바 홈누르면 f5
        k ='';
        $("#keyword").val('');
        searchMsg();
    });

    $('#search').click(() => { // 검색버튼 클릭 시
        searchMsg();
    });
});

function searchMsg() {
    $.ajax({
        headers: {
            "authorization": 'bearer ' + token,
        },
        type: 'GET',
        url: '/home?keyword=' + k,
        dataType: "json",
        success: (data) => {
            // console.log(data)
            // console.log("성공")
            // alert("sucesss");
            let result = data.result;

            if (result == "1") {
                var c_modal = "<div class='row'>  ";

                if (data.list.length == 0) {
                    $("#serverlist").html("서버가 존재하지 않습니다.")
                }

                for (var i = 0; i <= data.list.length; i++) { //시작시간 설정 안되어있는 경우 null -> 예약없음
                    if (data.list[i].calendar_start == null) {
                        data.list[i].calendar_start = "예약없음"
                    }
                    server_id = data.list[i].srv_id;

                    c_modal = c_modal +
                        '<div class="col-lg-3 col-md-6 col-sm-12" id="contains" style="margin-bottom: 1rem;">'
                        + '<div class="card" width="100%" height="225">'
                        + '<div class="card-body">'
                        + '<h5 class="card-title" id="' + data.list[i].srv_id + '" style="font-weight: bold;">' + data.list[i].srv_name + '</h5>'
                        + '다음 미팅<div>'
                        + '<svg class="bi me-1 mr-2" width="1em" height="1em">'
                        + '<use xlink:href="#calendar-event" />'
                        + '</svg>'
                        + '<label id="calendar_start">' + data.list[i].calendar_start + '</label></div>'
                        + '<button type ="button" id="server-enter" class="btn btn-enter" onclick="func(' + server_id + ')">접속하기</button>'
                        + '</div></div></div>'
                    $("#serverlist").html(c_modal)
                }
                c_modal += "</div>"

                $("#serverlist").html(c_modal)
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
}

// 접속하기 버튼
function func(server_id) {
    let token = localStorage.getItem('access_token')
    // console.log(token);

    $.ajax({
        headers: {
            "authorization": 'bearer ' + token,
        },
        type: "GET",
        url: "/server?srv_id=" + server_id,//  url
        dataType: "json",
        success: (data) => {
            // console.log(data)
            let result = data.result;

            if (result == "1") {
                // console.log("sffs", server_id)
                localStorage.setItem("srv_id", server_id) // 서버스토리지에 서버아이디 저장
                location.href = './date.html';
            }
        }
    })
}

// 로그아웃
$(function () {
    $('#logout').click(() => {
        $.ajax({
            success: function (result) {
                // alert("로그아웃")
                localStorage.clear();
                location.href = "./join.html";
            }
        })
    });
});

// 서버추가 버튼
$(function () {
    $('#sever_add').click(() => {
        let token = localStorage.getItem('access_token')
        // console.log(token);
        var server_name = $('#server_name').val(); // 서버명
        // console.log(server_name)

        $.ajax({
            headers: {
                "authorization": 'bearer ' + token,
            },
            data: {
                'srv_name': server_name
            },
            url: '/server?srv_name=' + server_name,
            type: "POST",
            dataType: "json",
            success: (data) => {
                // console.log(data)
                let result = data.result;

                if (result == "1") {
                    alert("'" + server_name + "' 서버가 추가되었습니다.")
                    // console.log("추가된 서버명", server_name)
                    $('#exampleModal').modal('hide'); // 모달창 닫기
                    window.location.reload(); // 새로고침
                }
                else {
                    alert("오류가 발생하였습니다. 다시 실행해주시길 바랍니다.")
                }
            },
            error: function (error) {
                console.log(error)
            },
            complete: function (data) {

            }
        });
    });
});
