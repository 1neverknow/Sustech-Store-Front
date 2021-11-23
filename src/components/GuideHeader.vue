<template>
  <div class="list">
    <ul>
      <li><router-link to="/sh">Homepage</router-link></li>
      <li>
        <router-link :to="{path: '/user/'+$store.getters.getUser.userId}">User Page</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GuideHeader",
  toUserpage(userId) {
    if (userId === null) {
      this.$router.push('/login')
    } else {
      this.$router.push('/user/' + userId)
    }
  },
}
</script>

<style scoped>
.list {
  margin-top: 0.7%;
  margin-right: -10%;
  height: 64px;
  float: right;
}
.list li {
  float: left;
  margin-left: 50px;
}
.list li a {
  font-size: 14px;
  color: #616161;
}
.list li a:hover {
  font-size: 14px;
  color: #ff6700;
}

.list li .route-btn {
  font-size: 14px;
  color: #616161;
  text-decoration: underline
}
.list .li .route-btn:hover {
  font-size: 14px;
  color: #ff6700;
  text-decoration: underline
}

</style>