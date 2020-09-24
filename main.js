import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
 //定义在根目录下的main.js里  
			                    Vue.prototype.APPID = 'wxb1a马赛克2bfc90a';  
			                    Vue.prototype.SECRET = 'b3ae36758马赛克dbe146d9acd81d';  
			                    Vue.prototype.WX_AUTH_URL = 'httpss://api.weixin.qq.com/sns/jscode2session'; 
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
