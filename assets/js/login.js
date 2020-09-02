$(function () {
    // 点击"去注册账号"的a链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击"去登录账号"的a链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })



    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify()这个函数自定义效验规则
    form.verify({
        // 自定义一个pwd效验规则
        pwd: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'],
        // 效验两次密码是否一致
        repwd: function (value) {
            // 通过形参拿到的是确认密码框的内容
            // 还需要拿到本身密码框的内容
            var pwd = $('.reg-box [name=password]').val()
            // 进行判断
            if (pwd != value) {
                // 如果不相等 return一个提示消息
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 先阻止默认提交行为
        e.preventDefault()
        // 把需要提交的数据提前保存到对象中, 让代码简洁
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        // 发起ajax的post请求
        $.post('/api/reguser', data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功');
                // 调用点击函数
                $('#link_login').click()
            }
        )
    })

    //监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        // 组织默认提交行为
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功!')
                //将登录成功后得到的token字符串保存到localStorage中
                localStorage.setItem('token', res.token)
                // 如果登录成功 需要跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})