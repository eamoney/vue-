<template>
    <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number":value="inticount" @change="countChanged" ref="numbox">
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>

    <!-- 分析： 子组件什么时候把 数据传递给父组件 -->
    <!--  -->
</template>

<script>
    import mui from "../../lib/mui/js/mui.min.js";

    export default {
        mounted() {
            // 初始化数字选择框组件
            mui(".mui-numbox").numbox();
        },
        methods:{
          //当选中复选框的时候 将value值保存到我们的store中
          //就是对应id的数量值进行更新了
            countChanged(){
                this.$store.commit('uqdatacount',{
                    id:this.goodsid,
                    count:this.$refs.numbox.value
                })
            }
        },
        props:['inticount','goodsid']
    }

</script>

<style lang="scss" scoped>

</style>
