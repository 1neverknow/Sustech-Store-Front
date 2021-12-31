<template>
  <div id="app">
<!--    <router-view/>-->
    <router-view :key="key"></router-view>

  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    setTimeout(() => {
      window.L2Dwidget.init({

        pluginRootPath: 'live2dw/',
        pluginJsPath: 'lib/',
        pluginModelPath: 'live2d-widget-model-koharu/assets/',
        tagMode: false,
        debug: false,
        model: { jsonPath: '../live2dw/live2d-widget-model-koharu/assets/koharu.model.json' },
        display: { position: 'right', width: 200, height: 400 },
        mobile: { show: true ,motion:true},
        react: {
          opacity: 1,
        },
        log: false
      })
    }, 1000)
  },
  computed:{
    key(){
      return this.$route.path + Math.random();
    }
  }
}

</script>

<style>
</style>
