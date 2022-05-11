// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
//import './theme/index.css';
import './assets/css/index.css'; //公共css
import publicFunction from './assets/js/common.js'; // 公共js this.publicFun.GetQueryString("id")
import * as echarts from 'echarts'; //引入echarts图表
import Cookies from 'js-cookie';
import VueAMap from 'vue-amap';
import {
  getCommonClass
} from "@/api/main.js";
import ShowFile from '@/components/ShowFile';
import FileUpload from '@/components/FileUpload';
import AuditStatus from '@/components/AuditStatus';

Vue.prototype.$echarts = echarts
Vue.prototype.publicFun = publicFunction
Vue.config.productionTip = false
Vue.component('ShowFile', ShowFile)
Vue.component('FileUpload', FileUpload)
Vue.component('AuditStatus', AuditStatus)
console.log(process.env.NODE_ENV, "//console.log(process.env.WINDOW_ROOTURL)", window.location.origin)
window.rootUrl = process.env.NODE_ENV == "development" ? window.location.origin + "/#/" : window.location.origin + process.env.WINDOW_EXAMA;

//获取班次
getCommonClass({
  shiftName: ""
}).then(data => {
  Cookies.set("shiftArr", JSON.stringify(data.data))
})
Vue.use(ElementUI);
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '98282ee47f572009438ef6336d0ef4b8',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geocoder'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.15'
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
