import router from "@/router";

let unauthorized = ["/","/login","/login/forgot","/login/reset","/register"]

// 路由判断登录 根据路由配置文件参数
router.beforeEach((to, from, next) => {
    // 判断该路由是否需要登陆权限
    if (to.matched.some(record => record.meta.requireAuth)) {
        // token是用于权限检查的字段
        const token = localStorage.getItem('token')
        console.log("==============" + token + "===================")
        if (token) { // 判断当前token是否存在（登录存入的token）
            if (unauthorized.includes(to.path)) {
            } else {
                next()
            }
        } else {
            next({
                path: '/login'
            })
        }
    } else {
        next()
    }
})

