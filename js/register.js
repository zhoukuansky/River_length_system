$().ready(function () {
    // 在键盘按下并释放及提交后验证提交表单
    $("#form").validate({
        rules: {
            name: {
                required: true,
                minlength: 2,
            },
            phone: {
                required: true,
                maxlength: 11,
                minlength: 11,
                digits: true
            },
            username: {
                required: true,
                minlength: 2,
                maxlength: 10
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 16
            }
        },
        messages: {
            name: {
                required: "*名字不能为空",
                minlength: "*名字最少由两个字组成"
            },
            phone: {
                required: "*手机不能为空",
                digits: "*手机号必须由整数组成",
                maxlength: "*手机号必须为11位",
                minlength: "*手机号必须为11位"
            },
            username: {
                required: "*用户名不能为空",
                minlength: "*用户名最少由2个字母或或数字组成",
                maxlength: "*用户名最少由10个字母或或数字组成"
            },
            password: {
                required: "*密码不能为空",
                minlength: "*用户名最少由6个字母或或数字组成",
                maxlength: "*用户名最少由16个字母或或数字组成",
            },
        },
        errorPlacement:function(error,element){
            if(element.parent().hasClass("input-group")){
                element.parent().after(error);
        }else
                element.after(error);
     },

    })
});