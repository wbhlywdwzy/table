
$(function() {
    'use strict';
    function initHtml(datas) {
        var html_ = '<tr title="' + datas.id + '">' +
            '<td>' +
            '<input class="check" name="checkbox" type="checkbox">' +
            '<span class="span1">' + datas.id + '</span>' +
            '</td>' +
            '<td>' +
            '<input class="inp" type="text" value="' + datas.classify + '" disabled>' +
            '</td>' +
            '<td>' +
            '<input class="inp" type="text" value="' + datas.title + '" disabled>' +
            '</td>' +
            '<td>' +
            '<input class="inp" type="text" value="' + datas.room + '" disabled>' +
            '</td>' +
            '<td>' +
            '<input class="inp" type="text" value="' + datas.status + '" disabled>' +
            '</td>' +
            '<td>' +
            '<input class="inp" type="text" value="' + datas.time + '" disabled>' +
            '</td>' +
            '<td>' +
            '<input class="inp" type="text" value="' + datas.create + '" disabled>' +
            '</td>' +
            '<td>' +
            '<input class="inp" type="text" value="' + datas.area + '" disabled>' +
            '</td>' +
            '<td>' +
            '<input class="del" type="button" title="' + datas.id + '" value="删除">' +
            '</td>' +
            '</tr>';
        return html_;
    }


    function initPage(data) {
        $("tbody").html("");
        $.each(data, function(key, val) {
                $("tbody").append(initHtml(val));
            })
            //        for(var i=0;i<data.length;i++){
            //            $("tbody").append(initHtml(data[i]))
            //        }
    };
    initPage(data);
    //调用页面渲染接口
    //    $("body").on("click", ".del", function() {
    //        var id = parseInt($(this).attr("title"));
    //        var ind = $(this).parent('td').parent('tr').index();
    //
    //        for (var i = 0; i < data.length; i++) {
    //            if (id == data[i].id) {
    //                data.splice(i, 1);
    //                $("tbody tr").eq(ind).remove();
    //            }
    //        }
    //    });


    function deletefun(id) {

        var ind = $(this).parent("td").parent("tr").index();
        for (var i = 0; i < data.length; i++) {
            if (id == data[i].id) {
                data.splice(i, 1); // 删除第key个值  删除1个
                $("tbody tr").eq(ind).remove();
            }
        }
    }


    // 按钮删除指定
    $("body").on("click", ".del", function() {
        var id = parseInt($(this).attr("title"));
        deletefun(id);
    })


    var id_ = null;
    $.each(data, function(key, val) {
        if (id_ < val.id) {
            id_ = val.id;
        }
    })

    function refreshHtml(data, class_) {
        data.unshift({
            id: id_,
            classify: $(class_.classify).val(),
            title: $(class_.title).val(),
            room: $(class_.room).val(),
            status: $(class_.status).val(),
            time: $(class_.time).val(),
            create: $(class_.create).val(),
            area: $(class_.area).val()
        })
        $(".center input[type='text']").val("");
        initPage(data);
    }
    $(".addBtn").on("click", function() { 
            id_ = id_ + 1;
            refreshHtml(data, {
                classify: ".classify",
                title: ".title",
                room: ".room",
                status: ".status",
                time: ".time",
                create: ".create",
                area: ".area"
            })

    })
    var emp;

    function dlist(data, status, fun) {
        if (status) {
            // 从小到大排序
            for (var i = 0; i < data.length; i++) {
                for (var j = i + 1; j < data.length; j++) {
                    if (data[i].id > data[j].id) {
                        emp = data[i];
                        data[i] = data[j];
                        data[j] = emp;
                    }
                }
            }
        } else {
            // 从大到小排序
            for (var i = 0; i < data.length; i++) {
                for (var j = i + 1; j < data.length; j++) {
                    if (data[i].id < data[j].id) {
                        emp = data[i];
                        data[i] = data[j];
                        data[j] = emp;
                    }
                }
            }
        }
        fun();
    }

    $(".lt").on("click", function() {
        if ($(this).hasClass("h")) {
            dlist(data, true, function() {
                initPage(data);             
            })
            $(this).removeClass("h")
            $(".lt2").show();
            $(".lt1").hide();
        } else {
            dlist(data, false, function() {
                initPage(data);
            })
            $(this).addClass("h")
             $(".lt1").show();
            $(".lt2").hide();
        }
    })
    $("tbody tr").eq(0).addClass("bg").siblings("tr").removeClass("bg");
    var index = $("tr.bg").index();
    $(window).keydown(function(e) {
            var key = e.keyCode;
            switch (key) {
                case 38:
                    if (index > 0) {
                        index--;
                    }
                    $("tbody tr").eq(index).addClass("bg").siblings("tr").removeClass("bg");
                    break;
                case 40:
                    if (index < $('tbody tr').length - 1) {
                        index++;
                    }
                    $("tbody tr").eq(index).addClass("bg").siblings("tr").removeClass("bg");
                    break;
                case 46:
                    var id = parseInt($("tbody tr.bg").attr("title"));
                    deletefun(id)
                    break;
            }

        })
        //点击删除键，表格的当前行删除
    $("body").on("click", ".del", function() {
            $(this).parent().parent().remove();
        }) //on 事件捕获，新增加的内容也可删除;
    $(".delete").on("click", function() {
        $(".check:checked").parent().parent().remove();
    });
    var status = 0 //check 全选状态
    $("body").on("click", ".check1", function() {
        if ($(".check1").is(':checked')) {
            $(".check").attr('checked', 'checked');
            $(".inp2").val($(".check1").val());
            status = 0;
        } else {
            $(".check").removeAttr('checked');
            status = 1;
        }
    })




    $("body").on("change", ".check", function() {
        var arr = [];
        $('input[name="checkbox"]:checked').each(function() {
            arr.push($(this).siblings(".span1").html());
        });
        $(".inp2").val(arr);
        if (status = 1) {
            $(".check1").removeAttr('checked');
        }
    })


})