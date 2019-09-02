<template>
   <div class="contianer">
       <!-- 大标题 -->
       <h3 class="title">{{newsinfo.title}}</h3>
       <!-- 子标题 -->
       <p class="subtitle">
           <span>发表时间：{{newsinfo.add_time|dateFormat()}}</span>
           <span>点击：{{newsinfo.click}}次</span>
       </p>
       <hr>
       <!--中间的内容-->
       <div class="content" v-html="newsinfo.content"></div>
       <!--评论组件-->
       <comment :id="id"></comment>

   </div>
</template>
<script>

    import comment from '../subcomponents/comment.vue'
    export default {
       data(){
          return{
              newsinfo:{},//新闻对象,
              id:this.$route.params.id
          }
       },
       created(){
           this.getNewsInfo();
       },
       methods:{
            getNewsInfo(){
                this.$http.get("api/getnew/" + this.id).then(result=>{
                    if (result.body.status===0){
                       this.newsinfo=result.body.message[0]
                        //这里的message在给的接口文档中是一个数组 所以要数组中的对象取出来
                    }
                })
            }
        },
       components:{
           comment
       }
    }
</script>

<style lang="scss" scoped>
.contianer{
    padding: 5px 5px;
    .title{
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }
    .subtitle{
        color: #226aff;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0;
    }
}
</style>