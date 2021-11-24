<template>
  <div id="app">
    <router-view/>
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
        pluginModelPath: 'live2d-widget-model-nico/assets/',
        tagMode: false,
        debug: false,
        model: { jsonPath: '../live2dw/live2d-widget-model-nico/assets/nico.model.json' },
        display: { position: 'right', width: 200, height: 400 },
        mobile: { show: true },
        log: false
      })
    }, 1000)
  },
}

</script>

<style>
</style>
