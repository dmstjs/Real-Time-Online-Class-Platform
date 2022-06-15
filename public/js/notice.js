
$(function start() {
    let token = localStorage.getItem('access_token')
    console.log(token);
    let srv_id = localStorage.getItem('srv_id')
    console.log(srv_id);

    $.ajax({
        headers: {
            "authorization": 'bearer ' + token,
        },
        type: "GET",
        url: "/server/notice?srv_id=" + srv_id,

        success: (data) => {
            console.log(data)
            list = data.list
            // console.log(data.list.n_id)

            // var n_id = data.list.n_id
            for (i = 0; i < data.list.length; i++) {
                // var n_name = data.list[i].n_name
                // var n_write = data.list[i].n_write
                // var n_id = data.list[i].n_id
                // console.log(n_id)
                // console.log(n_name)
                // console.log(n_write)
                // console.log(n_id)


                var n_notice = n_notice +

                    '<tr id=' + data.list[i].n_id + ' onClick="noticeClick(' + data.list[i].n_id + ')">'
                    + '<td style="padding-left: 10px; text-decoration:none;">' + [i + 1] + '</td>'
                    + '<td>' + data.list[i].n_name + '</td>'
                    + '<td>' + data.list[i].n_write + '</td>'
                    + '</tr>'

            }
            $("#aaaaa").html(n_notice)
        }
    })

})

function noticeClick(n_id) {
    console.log(n_id);
    window.location.href = "notice_selec.html?n_id=" + n_id;

}