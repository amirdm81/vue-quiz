<template>
  <div class="app">
    <h1>Hello Dear Friend! \ (•◡•) /</h1>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    console.log(this.$api);
  }
}
</script>

<style scoped>
  .app {
    text-align: center;
  }
</style>
