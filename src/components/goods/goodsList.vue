<template>
    <div class="goods-list">
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="getId(item.id)">
            <img :src="item.img_url" alt="">
            <h1>{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩下{{ item.stock_quantity }} 件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large"  @click="getMore">加载更多</mt-button>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                goodslist: [],
                pageindex: 1
            }
        },
        created() {
            this.getGoodsList()
        },
        methods: {
            getGoodsList() {
                // 获取商品列表
                this.$http
                    .get("api/getgoods?pageindex=" + this.pageindex)
                    .then(result => {
                        if (result.body.status === 0) {
                            // this.goodslist = result.body.message;
                            this.goodslist = this.goodslist.concat(result.body.message);
                        }
                    });
            },
            getId(id) {
                this.$router.push({name: 'goodsinfo', params: {id}})
            },
            getMore(){
                this.pageindex++;
                this.getGoodsList();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goods-list {
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
    }

    .goods-item {
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        min-height: 293px;
        margin: 4px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border: 1px solid #ccc;

        img {
            width: 100%;
        }
        h1 {
            font-size: 14px;
        }
        .info {
            background-color: #eee;

        }
        .price {
            p {
                margin: 0;
                padding: 5px;

            }
            .now {
                color: red;
                font-size: 16px;
                font-weight: bold;
            }
            .old {
                text-decoration: line-through;
                font-size: 10px;
                margin-left: 10px;
            }
        }
        .sell {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
    }
</style>