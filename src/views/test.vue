<template>
  <div>
    <div v-for="item in list" style="margin: 10px">
      <el-card>
        <el-container>
          <el-aside width="200px">
            <div class="search_user_image">
              <img src="../assets/photo.png">
            </div>
          </el-aside>
          <el-container>
            <el-header>
              <el-descriptions class="margin-top"  :column="3" border>
<!--                <template slot="extra">-->
<!--                  <router-link to="/pi_modify">-->
<!--                    <el-button type="primary" size="medium">See details</el-button>-->
<!--                  </router-link>-->
<!--                </template>-->

                <el-descriptions-item label-style="width:15%" content-style="width:15%">
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    User Name
                  </template>
                  {{ item.userName }}
                </el-descriptions-item>

                <el-descriptions-item label-style="width:15%" content-style="width:15%">
                  <template slot="label">
                    <i class="el-icon-message"></i>
                    Email
                  </template>
                  {{ item.email }}
                </el-descriptions-item>

                <el-descriptions-item label-style="width:15%" content-style="width:15%">
                  <template slot="label">
                    <i class="el-icon-cherry"></i>
                    Credit
                  </template>
                  {{ item.credit }}
                </el-descriptions-item>

              </el-descriptions>
            </el-header>

            <el-main>
              <p>发布列表</p>

            </el-main>
          </el-container>
        </el-container>
      </el-card>

    </div>

  </div>

</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      list: [
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1}
      ]
    }
  }
}
</script>

<style scoped>
.search_user_image img {
  display: block;
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
