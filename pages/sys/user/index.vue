<template>
  <div>{{ count }}</div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  created() {
    this.$store.dispatch('hello').then(() => {
      this.count = 1
    })
  }
}
</script>

<style scoped></style>
