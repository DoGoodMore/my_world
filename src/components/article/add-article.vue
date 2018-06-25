<template>
    <div class="components-container">
        <div>
            <tinymce :height="300" v-model="content"></tinymce>
        </div>
        <div class="editor-content" v-html="content"></div>
        <el-button @click="addArticleSubmit">添加</el-button>
    </div>
</template>

<script>
    import Tinymce from '@/components/Tinymce'

    export default {
        name: 'tinymce-demo',
        components: { Tinymce },
        data() {
            return {
                content: ``
            }
        },
        methods: {
            addArticleSubmit() {
                console.log( this.content )
            }
        }
    }
</script>

<style scoped>
    .editor-content{
        margin-top: 20px;
    }
</style>


