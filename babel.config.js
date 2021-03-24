
const presets = [
  // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
  '@vue/cli-plugin-babel/preset']

const plugins = []

// element-ui 按需引入 的babel 配置，但是看起来 不配置好像也没事
const elementPlugin = [
  'component',
  {
    libraryName: 'element-ui',
    styleLibraryName: 'theme-chalk'
  }
]

plugins.push(elementPlugin)

if (process.env['ENV'] === 'development') {
  plugins.push('dynamic-import-node')
}
// 'env': {
//   'development': {
//     // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
//     // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
//     // https://panjiachen.github.io/vue-element-admin-site/guide/advanced/lazy-loading.html
//     'plugins': ['dynamic-import-node']
//   }
// }

module.exports = { presets, plugins }
