const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pwa: {
    name: 'BYOD',
    themeColor: '#2c3e50',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    faviconSVG: 'img/icons/favicon.svg',
    favicon32: 'img/icons/favico.png',
    favicon16: 'img/icons/favico.png',
    appleTouchIcon: 'img/icons/favico.png',
    androidChrome192: 'img/icons/favico.png',
    maskIcon: 'img/icons/favico.png',
    msTileImage: 'img/icons/favico.png',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'dev/sw.js',
      // ...other Workbox options...
    }
  }
})
