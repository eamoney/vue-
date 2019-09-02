<template>
    <div class="goodsinfo-container">
        <!--实现购物车小球的动画 生命钩子函数 before-enter enter after-enter-->
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        <!--购买商品区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：
                        <del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                    </p>
                    <p>购买数量：
                        <cmtbox  @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></cmtbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToCrad">加入购物车</mt-button>
                        <!-- 分析： 如何实现加入购物车时候，拿到 选择的数量 -->
                        <!-- 1. 经过分析发现： 按钮属于 goodsinfo 页面， 数字 属于 numberbox 组件 -->
                        <!-- 2. 由于涉及到了父子组件的嵌套了，所以，无法直接在 goodsinfo 页面zhong 中获取到 选中的商品数量值-->
                        <!-- 3. 怎么解决这个问题：涉及到了 子组件向父组件传值了（事件调用机制） -->
                        <!-- 4. 事件调用的本质： 父向子传递方法，子调用这个方法， 同时把 数据当作参数 传递给这个方法 -->
                    </p>
                </div>
            </div>
        </div>
        <!--商品参数-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsinfo.goods_no}}</p>
                    <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
                    <p>上架时间：{{goodsinfo.add_time|dateFormat()}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(goodsinfo.id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(goodsinfo.id)">商品评论</mt-button>
            </div>
        </div>


    </div>
</template>

<script>
    // 导入轮播图组件

    import swiper from "../subcomponents/swiper.vue";
    // 导入 数字选择框 组件
    import cmtbox from '../subcomponents/goodsinfo_numbox.vue'

    export default {
        data() {
            return {
                id: this.$route.params.id, // 将路由参数对象中的 id 挂载到 data , 方便后期调用
                lunbotu: [], // 轮播图的数据
                goodsinfo: {},//商品的数据 不用遍历 所以用对象接收
                ballFlag: false,//小球显示和隐藏的标志
                selectCount:1 //默认选择数量是1

            };
        },
        created() {
            this.getLunbotu();
            this.getGoodsInfo()

        },
        methods: {
            getLunbotu() {
                this.$http.get("api/getthumimages/" + this.id).then(result => {
                    if (result.body.status === 0) {
                        // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为 轮播图 组件中，只认识 item.img， 不认识 item.src
                        result.body.message.forEach(item => {
                            item.img = item.src;
                        });
                        this.lunbotu = result.body.message;
                    }
                });
            },
            getGoodsInfo() {
                this.$http.get('api/goods/getinfo/' + this.id).then(res => {
                    if (res.body.status === 0) {
                        this.goodsinfo = res.body.message[0]
                    }
                })
            },
            goDesc(id) {
                this.$router.push({name: 'goodsdesc', params: {id}})
            },
            goComment(id) {
                this.$router.push({name: 'goodscomment', params: {id}})
            },
            addToCrad() {
                // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
                // 拼接出一个，要保存到 store 中 car 数组里的 商品信息对象
                this.ballFlag = true
                var goodsinfo={
                    id:this.id,
                    count:parseInt(this.selectCount),
                    price:this.goodsinfo.sell_price,
                    selected:false
                }
                //调用store中的方法加入
                this.$store.commit('addToCar',goodsinfo)

            },
            beforeEnter(el) {
                el.style.transform = "translate(0,0)"
            },
            enter(el, done) {
                // domObject.getBoundingClientRect() 获取到元素的位置信息
                //1.获取小球在页面中的位置
                //用 this.$refs获取 注意 是refs 这是一个集合
                const ballposition = this.$refs.ball.getBoundingClientRect()
                //2.获取底角在页面中的位置
                const badgeposition = document
                    .getElementById('badge')
                    .getBoundingClientRect()
                    //3.将底角的位置减去小球的位置 就能动态计算出动画要移动的距离
                const x = badgeposition.left - ballposition.left
                const y = badgeposition.top - ballposition.top
                    //4.根据计算后的 X Y transform得出小球要动态移动多少距离
                el.style.transform =`translate(${x}px, ${y}px)`
                el.style.transition = 'all 0.5s cubic-bezier(.4,-0.3,1,.68)'
                done();
            },
            afterEnter(el) {
                this.ballFlag = !this.ballFlag
            },
            getSelectedCount(count){
                this.selectCount =count;
                console.log(this.selectCount)
            }


        },
        components: {
            swiper,
            cmtbox
        }
    };
</script>

<style lang="scss" scoped>
    .goodsinfo-container {
        background-color: #eee;
        overflow: hidden;

        .now_price {
            color: red;
            font-size: 16px;
            font-weight: bold;
        }
        .mui-card-footer {
            display: flex;
            flex-wrap: wrap;
            button {
                margin-bottom: 15px;
            }
        }
        .ball {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            z-index: 99;
            top: 385px;
            left: 150px;
        }
    }
</style>