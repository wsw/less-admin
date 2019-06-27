<template>
  <iframe class="frame" :src="url" frameborder="0"></iframe>
</template>

<script>
export default {
  name: 'Frame',
  asyncData(context) {
    return {
      url: context.query.url,
      title: context.params.title
    }
  },
  head: {
    meta: [{ title: 'extend' }]
  }
}
</script>

<style>
.frame {
  width: 100%;
  height: 100%;
}
</style>
