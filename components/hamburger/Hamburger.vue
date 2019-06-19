<template>
  <div
    @click="toggleClick"
    class="hamburger"
    :class="{ 'is-active': isActive }"
  >
    <i class="el-icon-s-operation"></i>
  </div>
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
    toggleClick() {
      this.$emit('toggle')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  margin-top: -5px;
  vertical-align: middle;
  cursor: pointer;
  width: 20px;
  height: 20px;
  transform: rotate(0deg);
  transition: 0.38s;
  transform-origin: 50% 50%;
}

.hamburger.is-active {
  transform: rotate(90deg);
}
.el-icon-s-operation {
  color: white;
}
</style>
