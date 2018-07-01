<template>
    <div class="width" style="margin-top: 20px;">
        <el-tabs v-model="activeName"
                 type="border-card"
                 @tab-click="handleClick">
            <el-tab-pane label="标签管理"
                         :lazy="true"
                         name="tag-manager">
                <tag-manager></tag-manager>
            </el-tab-pane>
            <el-tab-pane label="配置管理"
                         :lazy="true"
                         name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理"
                         :lazy="true"
                         name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿"
                         :lazy="true"
                         name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import tagManager from './components/tag-manager' ;
    export default {
        name: "settings",
        components: { tagManager },
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

</style>
