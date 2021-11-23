<template>
    <div v-html="initialValue" ref="previewInner"></div>
</template>
<script type="text/javascript">
export default {
    props: {
        initialValue: {
            // 初始化内容
            type: String,
            default: ''
        },
    },
    data() {
        return {}
    }
}
</script>