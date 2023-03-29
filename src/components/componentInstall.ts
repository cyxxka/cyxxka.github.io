import type { DefineComponent } from 'vue'

const component = Object.create(null)
/* eslint-disable */
// import Echart from './echartCanvas/index'
// import prodItem from './prod-item/index'

component.install = function (vue: DefineComponent) {
  // ECharts 图表渲染
  // vue.component('echart', Echart)
  // vue.component('prod-item', prodItem)
}
export default component
