提交表单内容：

1. /login:
   - email
   - password
   - (remember-me)
2. /login/forgot
   - 点击send - email（向指定email发送邮件）
   - 点击submit：email，vericode（验证码）
3. /login/reset
   - password
4. /register
   - username
   - email
   - password
   - gender
5. /goods/:goodsId (商品详情)
   - price: ,
   - title: ,
   - picturePath: [], // 商品展示图（轮播图）=> 数组
   - labels: [],
   - introduce,
   - announcer,
   - comments: [],
   - want: 1,  // “我想要”的人数,
   - announceTime,
6. /collection/:userId 收藏夹（param名字待定）
      - productName,
      - productID,
      - productPicture
      - productIntro
      - productPrice



后端权限验证字段：’authorization‘ （放在header）

```vue
// 接受代码

// 接受后端返回的数据
// header中authorization字段即为用户登录后的权限验证
const jwt = res.headers['authorization']
```

