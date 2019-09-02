//入口文件
import Vue from 'vue'
//导入自己的app组件
import app from './App.vue'
//导入路由的包
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)
//导入路由的文件
import router from './router'
// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005/';
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;
//按需导入mint-ui的插件
import {Header, Swipe, SwipeItem} from 'mint-ui'

Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
import MintUI from 'mint-ui'

Vue.use(MintUI)
import 'mint-ui/lib/style.css'


//引入 MUI
import './lib/mui/css/mui.min.css'
//定义时间的全局过滤器
Vue.filter('dateFormat', function (dateStr, pattern = "") {
    // 根据给定的时间字符串，得到特定的时间
    var dt = new Date(dateStr)
    //   yyyy-mm-dd
    var y = dt.getFullYear()
    var m = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1
    var d = dt.getDate()
    // return y + '-' + m + '-' + d
    if (pattern.toLowerCase() === 'yyyy-mm-dd') {
        return `${y}-${m}-${d}`
    } else {
        var hh = dt.getHours()
        var mm = dt.getMinutes()
        var ss = dt.getSeconds()
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }
})
// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'

// 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
//注册vuex
import Vuex from 'vuex'

Vue.use(Vuex)
// 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中，把 购物车的数据读出来，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')
//创建 store实例
var store = new Vuex.Store({
    state: {
        car: car,//将goodsinfo中添加到购物车的数据储存起来
        // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
    },
    mutations: {
        addToCar(state, goodsinfo) {
            //需求1 如果car中已经存在 则更新count
            //2 如果没有这个数据 则添加进去car

            //用some方法 判断当前传过来的对象是否在car中存在
            var flag = false
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    //更新数量
                    item.count += parseInt(goodsinfo.count)
                    flag = true;
                    return true
                }
            })
            //如果flag还是 false 则 将goodsinfo push进去 car
            if (!flag) {
                state.car.push(goodsinfo)
            }
            // 当 更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        delgoodsinfo(state, id) {
            state.car.some((item, i) => {
                if (item.id === id) {
                    state.car.splice(i, 1)
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        uqdatacount(state, goodsinfo) {
            state.car.forEach(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        uqdataselected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: {
        //初始化购物车 numbox的值
        //思路 返回一个对象 { item.id: item.count} 然后通过属性绑定 访问
        getgoodscount(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getAllCount(state) {
            var c = 0
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCountAndAmount(state) {
            var obj = {
                c: 0,//勾选的总数
                p: 0,//总价格
            }
            state.car.forEach(item => {
                if (item.selected) {
                    obj.c += item.count;
                    obj.p += item.count * item.price
                }
            })
            return obj
        }
    }

})

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
})