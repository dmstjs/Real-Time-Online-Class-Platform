let token = localStorage.getItem('access_token')
console.log(token);
let srv_id = localStorage.getItem('srv_id')
console.log(srv_id);


$(function () {
    // $('#member_manage').click(() => {

        $.ajax({
            headers: {
                "authorization": 'bearer ' + token,
            },
            type: "GET",
            url: "/server/member?srv_id=" + srv_id,
            // dataType: "text",

            success: (data) => {
                console.log(data)
                list = data.list

                for (i = 0; i < data.list.length; i++) {
                    var user_id = data.list[i].user_id
                    var user_name = data.list[i].user_name
                    var user_email = data.list[i].user_email
                    var user_tel = data.list[i].user_tel
                    var srvuser_lastaccess = data.list[i].srvuser_lastaccess


                    var m_notice = m_notice +

                        '<tr>'
                        + '<td style="padding-left: 10px; text-decoration:none;">'
                        + '<input class="form-check-input" type="checkbox" value="' + user_id + '" id="flexCheckDefault" onclick="getCheckboxValue(event)">'

                        + '</td>'
                        + '<td>' + user_name + '</td>'
                        + '<td>' + user_email + '</td>'
                        + '<td>' + user_tel + '</td>'
                        + '<td>' + srvuser_lastaccess + '</td>'
                    +'</tr>'

                    $("#bbbbb").html(m_notice)
                }
            },
            error: function () {
                console.log("error")
            },


        })
    // })
})

let checkUserId = '';

function getCheckboxValue(event) {

    if (event.target.checked) {
        checkUserId = event.target.value;
        console.log(checkUserId)
    } else {
        checkUserId = '';
    }

}

$(function () {
    $('#deleteMember_btn').click(() => {
        // console.log(checkUserId)

        $.ajax({

            headers: {
                "authorization": 'bearer ' + token,
            },
            type: "PUT",
            url: "/server/member",

            data: {
                "srv_id": srv_id,
                "user_id": checkUserId,
            },

            success: (data) => {
                console.log(data)
                let result = data.result;
                if (result == "-1") {

                    window.location.reload(); // 새로고침

                } else {
                    alert("오류가 발생하였습니다. 다시 실행해주시길 바랍니다.")
                }

            },


        })



    })
})


// })
