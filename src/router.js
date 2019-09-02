//导入路由的包
import VueRouter from 'vue-router'

//导入路由模块
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotosList from './components/photos/photosList.vue'
import PhotosInfo from './components/photos/photosInfo.vue'
import GoodsList  from './components/goods/goodsList.vue'
import GoodsInfo from  './components/goods/goodsInfo.vue'
import GoodsDesc from  './components/goods/goodsDesc.vue'
import GoodsComment from './components/goods/goodscomment.vue'
//创建路由的实例对象
var router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home'},
        //注意重定向 redirect 后面跟的是路径
        { path: '/home', component: HomeContainer },
        { path: '/member', component: MemberContainer },
        { path: '/shopcar', component: ShopcarContainer },
        { path: '/search', component: SearchContainer },
        { path: '/home/newslist', component: NewsList },
        { path: '/home/newsinfo/:id', component:NewsInfo},
        { path: '/home/photoslist', component:PhotosList},
        { path: '/home/photosinfo/:id', component:PhotosInfo},
        { path: '/home/goodslist', component:GoodsList },
        { path: 'home/goodsinfo/:id', component:GoodsInfo, name:'goodsinfo' },
        { path: 'home/goodsdesc/:id', component:GoodsDesc, name:'goodsdesc' },
        { path: 'home/goodscomment/:id', component:GoodsComment, name:'goodscomment' }
    ],
    linkActiveClass: 'mui-active'

})
//把这个对象暴露出去
export default router