<template>
    <div class="newsinfo-container">
        <!-- 大标题 -->
        <h3 class="title">{{info.title}}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{info.add_time|dateFormat()}}</span>
            <span>点击：{{info.click}}次</span>
        </p>
        <hr>
        <div class="thumbs">
            <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100"  :key="item.src">
        </div>

        <!-- 内容区域 -->
        <div class="content" v-html="info.content"></div>

        <!-- 评论子组件区域 -->
        <comment :id="id"></comment>
    </div>
</template>

<script>
    import comment from '../subcomponents/comment.vue'
    export default {
        data() {
            return {
                id: this.$route.params.id,
                info: {}, //获取图片的信息
                list: [] //获取缩略图
            }
        },
        created() {
            this.getPhotoInfo()
            this.getList()
        },
        methods: {
            getPhotoInfo() {
                // 获取图片的详情
                this.$http.get("api/getimageInfo/" + this.id).then(res => {
                    if (res.body.status === 0) {
                        this.info = res.body.message[0];
                    }
                });
            },
            getList() {
                this.$http.get("api/getthumimages/" + this.id).then(res => {
                    if (res.body.status === 0){
                        this.list = res.body.message
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
    .newsinfo-container {
        padding: 0 4px;
        .title{
            color:#26a2ff;
            font-size: 15px;
            text-align: center;
            margin: 15px 0 ;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;
        }
        .content {
            font-size: 13px;
            line-height: 30px;
        }
        .thumbs{
            img{
                margin: 10px;
                box-shadow: 0 0 8px #999;
            }
        }
    }
</style>