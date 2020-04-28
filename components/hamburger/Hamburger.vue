<template>
  <i
    @click="toggleClick"
    :class="{ 'is-active': isActive }"
    class="el-icon-s-operation"
  />
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick () {
      this.$emit('toggle')
    }
  }
}
</script>

<style scoped lang="scss">
.el-icon-s-operation {
  color: black;
  transition: 0.38s;

  &.is-active {
    transform: rotate(90deg);
  }
}
</style>
