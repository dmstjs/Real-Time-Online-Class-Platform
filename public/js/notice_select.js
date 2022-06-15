
$(function start() {
    let token = localStorage.getItem('access_token')
    // console.log(token);
    let srv_id = localStorage.getItem('srv_id')
    // console.log(srv_id);

    var n_id = location.href.split('=')[1];

    console.log(n_id)

    $.ajax({
        headers: {
            "authorization": 'bearer ' + token,
        },
        type: "GET",
        url: "/server/notice?srv_id=" + srv_id + "&n_id=" + n_id,

        success: (data) => {

            console.log(data)
            list = data.list
            // console.log(data.list.user_name)

            // var n_id = data.list.n_id
            var user_name = data.list[0].user_name
            var notice_name = data.list[0].notice_name
            var notice_memo = data.list[0].notice_memo
            var notice_write = data.list[0].notice_write

            // console.log(n_id)
            // console.log(user_name)
            // console.log(notice_name)
            // console.log(notice_memo)
            // console.log(notice_write)


            var n_notice_select =

                '<div class="row">'
                + '<div class="col-3" style="border: solid 1px ; background-color:#C3E1D2; height: 40px;">공지명</div>'
                + '<div class="col-9" style="border: solid 1px ; ">' + notice_name + '</div>'
                + '</div>'

                + '<div class="row">'
                + '<div class="col" style="border: solid 1px ; background-color:#C3E1D2; height: 30px;">작성자</div>'
                + '<div class="col" style="border: solid 1px ;">' + user_name + '</div>'
                + '<div class="col" style="border: solid 1px ; background-color:#C3E1D2;">작성일</div>'
                + '<div class="col" style="border: solid 1px ;">' + notice_write + '</div>'
                + '</div>'

                + '<div class="row">'
                + '<div class="col" style="border: solid 1px; height: 500px;">' + notice_memo + '</div>'
                + '</div>'

            $("#n_select").html(n_notice_select)
        }

    })

})