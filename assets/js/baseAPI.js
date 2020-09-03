// 每次调用$.get()huozhe $.post()或者$.ajax()的时候,
// 会先调用$.ajaxPrefilter()这个函数
// 在这个函数中 options可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的ajax请求之前 统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url



    // 统一为有权限的借口设置 headers 设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    // 设置访问权限
    options.complete = function (res) {
        // 在complete回调函数中可以拿到

        // res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //清空token
            localStorage.removeItem('token')
            //强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})