<template>
  <iframe :src="url" class="frame" frameborder="0" />
</template>

<script>
export default {
  name: 'Frame',
  asyncData (context) {
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
