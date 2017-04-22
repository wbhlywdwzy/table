$(function() {
    'use strict';

    function initHtml(datas) {
        var html_ = '<tr title="' + datas.id + '">' +
            '<td>' +
            '<input class="check" name="checkbox" type="checkbox" title="' + datas.id + '">' +
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


    function refurbish(data) {
        $("tbody").html("");
        $.each(data, function(key, val) {
            $("tbody").append(initHtml(val));
        })
    };
    refurbish(data);

    function del(id) {
        for (var i = 0; i < data.length; i++) {
            if (id == data[i].id) {
                data.splice(i, 1);
                // 删除第key个值  删除1个
            }
        }
    }


    // 按钮删除指定
    $("body").on("click", ".del", function() {
        var id = parseInt($(this).attr("title"));
        $(this).parent().parent().remove();
        $(".inp2").val("");
        del(id);
    })

    //给新录入的id赋值==现有ID最大值
//    var d = null;
//    $.each(data, function(key, val) {
//        if (d < val.length) {
//            d = val.id;
//        }
//        
//    })
    	
	function getId(data){
		var id ='';
		$.each(data, function(key, val){
			if(id < val.id){
				id = val.id;
			}
		})
		
		return id;
	}

    function updateHtml(data, class1) {
        data.unshift({
            id: getId(data)+1,
            classify: $(class1.classify).val(),
            title: $(class1.title).val(),
            room: $(class1.room).val(),
            status: $(class1.status).val(),
            time: $(class1.time).val(),
            create: $(class1.create).val(),
            area: $(class1.area).val()
        })
        $(".center input[type='text']").val("");
        refurbish(data);
    }

    //点击录入
    $(".addBtn").on("click", function() {
        if ($(".classify").val() == "" || $(".title").val() == "" || $(".room").val() == "" || $(".status").val() == "" || $(".time").val() == "" || $(".create").val() == "" || $(".area").val() == "") {
            $(".error").show();
        } else {
//          var val = getId(data) + 1;
            updateHtml(data, {
                classify: ".classify",
                title: ".title",
                room: ".room",
                status: ".status",
                time: ".time",
                create: ".create",
                area: ".area"
            })
            $(".error").hide();
            $('input[type="checkbox"]').removeAttr("checked");
        }
    })
    var emp;

    function delt(data, sta, fun) {
        if (sta) {
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
    //排序
    $(".rank").on("click", function() {
        if ($(this).hasClass("h")) {
            delt(data, true, function() {
                refurbish(data);
            })
            $(this).removeClass("h")
            $(".lt2").show();
            $(".lt1").hide();
        } else {
            delt(data, false, function() {
                refurbish(data);
            })
            $(this).addClass("h")
            $(".lt1").show();
            $(".lt2").hide();
        }
    })

    //键盘切换，删除
    $("tbody tr").eq(0).addClass("bg").siblings("tr").removeClass("bg");
    var ind = $("tr.bg").index();
    $(window).keydown(function(e) {
        var key = e.keyCode;
        switch (key) {
            case 38:
                if (ind > 0) {
                    ind--;
                }
                $("tbody tr").eq(ind).addClass("bg").siblings("tr").removeClass("bg");
                break;
            case 40:
                if (ind < $('tbody tr').length - 1) {
                    ind++;
                }
                $("tbody tr").eq(ind).addClass("bg").siblings("tr").removeClass("bg");
                break;
            case 46: //delete
                var id = parseInt($("tbody tr.bg").attr("title"));
                del(id);
                if ($("tbody tr").hasClass("bg")) {
                    $("tbody tr").eq(ind).remove();
                }
                break;
        }
    })
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

    //点击删除键，表格的当前行删除
    $("body").on("click", ".delete", function() {
        var leng = $(".check:checked").length
        var id = parseInt($(".check:checked").attr("title"));
        $(".check:checked").parent('td').parent('tr').remove();
        for (var i = 0; i < data.length; i++) {
            if (id == data[i].id) {
                data.splice(i, leng); // 删除第key个值  删除checked的个数
            }
        }
        $(".inp2").val("");
    });

    //将CheckBox选中后的本身的ID值会添加到input[type:'text']中
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
        //table中单击可以该input中的值
    $("body").on("click", "tr td", function() {
        $(".inp").removeAttr("disabled");
    })
    $("body").on("blur", "tr td", function() {
        $(".inp").attr("disabled", true);
    })

})