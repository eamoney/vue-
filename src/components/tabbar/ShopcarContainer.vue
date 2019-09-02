<template>
    <div class="shopcar-container">

        <div class="goods-list">
            <!-- 商品列表项区域 -->
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch
                                v-model="$store.getters.getGoodsSelected[item.id]"
                               @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numbox :inticount="$store.getters.getgoodscount[item.id]" :goodsid="item.id"></numbox>
                                <!-- 问题：如何从购物车中获取商品的数量呢 -->
                                <!-- 1. 我们可以先创建一个 空对象，然后循环购物车中所有商品的数据， 把 当前循环这条商品的 Id， 作为 对象 的 属性名，count值作为 对象的 属性值，这样，当把所有的商品循环一遍，就会得到一个对象： { 88: 2, 89: 1, 90: 4 } -->
                                <a href="#" @click.prevent="del(item.id,i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品 {{$store.getters.getGoodsCountAndAmount.c}}<span class="red"></span> 件， 总价 <span class="red">￥{{$store.getters.getGoodsCountAndAmount.p}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>


        <p></p>

    </div>
</template>

<script>
    import numbox from '../subcomponents/shopcar_numbox.vue'
    export default {
        data() {
            return {
                goodslist: [],
            }
        },
        created() {
             this.getgoodslist()
        },
        methods: {
            getgoodslist() {
                //1获取到store中的所有商品的id 然后拼接出一个 用逗号分隔的 字符串
                var arr = [];
                this.$store.state.car.forEach(item => arr.push(item.id))
                // 如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
                if (arr.length <= 0) {
                    return;
                }
                //向服务器请求数据
                this.$http.get("api/goods/getshopcarlist/" + arr.join(",")).then(res => {
                    if (res.body.status === 0){
                        this.goodslist = res.body.message
                    }
                        })
            },
            del(id,i){
                this.goodslist.splice(i,1)
                this.$store.commit('delgoodsinfo',id)
            },
            selectedChanged(id,val){
                console.log(id + " --- " + val);
                this.$store.commit('uqdataselected',{
                    id:id,
                    selected:val
                })
            }
        },
        components:{
           numbox
    }
    }
</script>

<style lang="scss" scoped>
    .shopcar-container {
        background-color: #eee;
        overflow: hidden;
        .goods-list {
            .mui-card-content-inner {
                display: flex;
                align-items: center;
            }
            img {
                width: 60px;
            }
            h1 {
                font-size: 13px;
            }
            .info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .price {
                    color: red;
                    font-weight: bold;
                }
            }
        }
        .jiesuan {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red {
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
</style>
