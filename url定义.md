Base: 
- 前端：8080
- 后端：8081


1. 用户登录：
- 前端：/login
- 后端表单接收：http://localhost:8081/login
  + "?email=" + this.ruleForm.email
  + "&password=" + this.ruleForm.password

2. 注册：
- 前端：/register
- 后端: /user/register' + "?username=" + this.ruleForm.username
  + "&email=" + this.ruleForm.email
  + "&password=" + this.ruleForm.password
  + "&gender=" + this.ruleForm.gender

3. 忘记密码
- 前端：/login/forgot
- 后端：'http://localhost:8081/login/forgot'
  + "?email=" + this.ruleForm.email,

4. 密码重设
- 前端：/login/reset
- 后端：'http://localhost:8081/login/reset'
  + "?password=" + this.ruleForm.password,

5. 账号激活
- 前端：/user/activate?{activateCode}
- 后端：/user/activate/{activateCode}

6. 商品详情
- 前端：/goods/:goodsId
- 后端：'http://localhost:8081/goods/' + goodsId

7. 用户收藏夹
- 前端：/collection/:userId
- 后端："http://localhost:8081/collection/" + userId