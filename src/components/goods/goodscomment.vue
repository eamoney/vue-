<template>
    <div>
        <cbox :id="$route.params.id"></cbox>
    </div>
</template>

<script>
    import cbox from '../subcomponents/comment.vue'
    export default {
        components:{
            cbox
        }
    }
</script>

<style scoped>

</style>