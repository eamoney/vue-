<template>
    <!--这是轮播图独立封装的一个组件 谁想用 谁就拿去-->
    <div>
        <mt-swipe :auto="4000">
            <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
            <!-- 将来，谁使用此 轮播图组件，谁为我们传递 lunbotuList -->
            <!-- 此时，lunbotuList 应该是 父组件向子组件传值来设置 -->
            <!--注意 这里如果是没有用：key=index的话 因为key是唯一的 不断循环的话
                系统会发出警告-->
            <mt-swipe-item v-for="(item,index) in lunbotuList" :key="index">
                <img :src="item.img" alt="" :class="{'full':isfull}">
                <!--坑：这里我之前isfull加了引号 没注意 导致调试了很久 加了引号等于把他写死了-->
            </mt-swipe-item>
        </mt-swipe>
        <!--九宫格-->


    </div>
</template>

<script>
    export default {
      props:["lunbotuList","isfull"]
    }
</script>

<style lang="scss" scoped>
    .mint-swipe {
        height: 200px;

        .mint-swipe-item {
            text-align: center;

            img {
                // width: 100%;
                height: 100%;
            }
        }
    }

    .full {
        width: 100%;
    }

</style>