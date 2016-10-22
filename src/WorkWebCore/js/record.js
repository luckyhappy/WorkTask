var id = 0;
$(document).ready(function () {
$("#mytable #checkall").click(function () {
        if ($("#mytable #checkall").is(':checked')) {
            $("#mytable input[type=checkbox]").each(function () {
                $(this).prop("checked", true);
            });

        } else {
            $("#mytable input[type=checkbox]").each(function () {
                $(this).prop("checked", false);
            });
        }
    });
    
$("[data-toggle=tooltip]").tooltip();

$(".btn-primary").click(function () {
    id = $(this).parent('p').parent('td').parent('tr').find('td').find('#HiddenId').val();
    $("#datestart").val($(this).parent('p').parent('td').parent('tr').find('td').eq(4).text());//��ʼʱ��
    $("#dateend").val($(this).parent('p').parent('td').parent('tr').find('td').eq(5).text());//����ʱ��
    $("#display_name").val($(this).parent('p').parent('td').parent('tr').find('td').eq(1).text());//��Ŀ����

    var txtJobProcess = $(this).parent('p').parent('td').parent('tr').find('td').eq(7).text();//��������
    var txtJobLeverl = $(this).parent('p').parent('td').parent('tr').find('td').eq(6).text();//��������



    $("#JobProcess option").attr("selected", false);
    $("#JobLeverl option").attr("selected", false);
    if (txtJobProcess == $('#JobProcess option:eq(0)').text()) {
        $("#JobProcess option:eq(0)").attr("selected", true);
    } else if (txtJobProcess == $('#JobProcess option:eq(1)').text()) {
        $("#JobProcess option:eq(1)").attr("selected", true);
    } else if (txtJobProcess == $('#JobProcess option:eq(2)').text()) {
        $("#JobProcess option:eq(2)").attr("selected", true);
    }
    $('#JobProcess').val($('#JobProcess option[selected]').val());

    if (txtJobLeverl == $('#JobLeverl option:eq(0)').text()) {
        $("#JobLeverl option:eq(0)").attr("selected", true);
    } else if (txtJobLeverl == $('#JobLeverl option:eq(1)').text()) {
        $("#JobLeverl option:eq(1)").attr("selected", true);
    } else if (txtJobLeverl == $('#JobLeverl option:eq(2)').text()) {
        $("#JobLeverl option:eq(2)").attr("selected", true);
    }
    $('#JobLeverl').val($('#JobLeverl option[selected]').val());

    $("#mark").val($(this).parent('p').parent('td').parent('tr').find('td').eq(3).text());//������ע
});


});


function turnPage(curr_page) {
    var h = window.location.href;
    if (h.indexOf('&') > 0) {
        window.location.href = h.substr(0,h.length-1) + curr_page;
    }
    else
    {
        window.location.href = h.substring(0, h.indexOf("x") + 1) + "?page=" + curr_page;
    }
    
}

function updatework() {
    var txtWorkName = $.trim($("#display_name").val());
    var txtJobProcess = $('#JobProcess option:selected').val();
    var txtJobLeverl = $('#JobLeverl option:selected').val();
    var txtWorkMark = $.trim($("#mark").val());
    var txtStartTime = $.trim($("#datestart").val());
    var txtEndTime = $.trim($("#dateend").val());

    if (txtStartTime == '��ʼʱ��' || txtStartTime == '') {
        alert("����д��ʼʱ��");
        return false;
    }
    if (txtEndTime == '����ʱ��' || txtEndTime == '') {
        alert("����д����ʱ��");
        return false;
    }
    if (txtWorkName == '��Ŀ����' || txtWorkName == '') {
        alert("����д��Ŀ����");
        return false;
    }
    if (txtJobProcess == '--��ѡ����Ŀ����--') {
        alert("��ѡ����Ŀ����");
        return false;
    }
    if (txtJobLeverl == '--��ѡ����Ŀ����--') {
        alert("��ѡ����Ŀ����");
        return false;
    }
    if (txtWorkMark == '��ע') {
        txtWorkMark = "";
    }


    $.post("../Record/SaveUpdate", { "Id": id, "WorkName": txtWorkName, "WorkProcess": txtJobProcess, "WorkLevel": txtJobLeverl, "WorkMark": txtWorkMark, "StartTime": txtStartTime, "EndTime": txtEndTime }, function (result) {
        if (result > 0) {
            alert("��ӳɹ���");
            window.location.href = window.location.href;
        } else {
            alert("���ʧ�ܣ�");
        }
    }, "json");

}

