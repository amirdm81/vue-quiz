<template>
  <div class="app">
    <Header />
    <items />
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import Items from "@/components/Items/Items.vue";

export default {
  components: { Header, Items },
  name: "App",
};
</script>

<style>
body {
  font-family: "Roboto", sans-serif !important;
}
</style>
