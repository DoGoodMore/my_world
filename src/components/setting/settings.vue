<template>
    <div class="width" style="margin-top: 20px;">
        <el-tabs v-model="activeName"
                 type="border-card"
                 @tab-click="handleClick">
            <el-tab-pane label="标签管理"
                         :lazy="true"
                         name="tag-manager">
                <div class="setting-min-height">
                    <tag-manager></tag-manager>
                </div>
            </el-tab-pane>
            <el-tab-pane label="文章分类"
                         :lazy="true"
                         name="article-type-manager">
                <div class="setting-min-height">
                    <article-type-manager></article-type-manager>
                </div>
            </el-tab-pane>
            <el-tab-pane label="文章管理"
                         :lazy="true"
                         name="third">
                <div class="setting-min-height">
                    <article-manager></article-manager>
                </div>
            </el-tab-pane>
            <el-tab-pane label="公告与置顶"
                         :lazy="true"
                         name="fourth">
                <div class="setting-min-height">
                    <post-and-topping></post-and-topping>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import tagManager from './components/tag-manager' ;
    import articleManager from './components/article-manager' ;
    import postAndTopping from './components/post-and-topping' ;
    import articleTypeManager from './components/article-type-manager' ;
    export default {
        name: "settings",
        components: { tagManager, articleManager, postAndTopping, articleTypeManager },
        data() {
            return {
                activeName: 'tag-manager'
            }
        },
        methods: {
            handleClick() {
            }
        }
    }
</script>

<style scoped>
.setting-min-height {
    position: relative;
    min-height: 650px;
}
</style>
