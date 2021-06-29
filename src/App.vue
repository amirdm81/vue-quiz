<template>
  <div class="app">
    <Header @searched="searched = $event" @search-data="search = $event" />
    <items
      :searched="searched"
      @clear-searched="
        searched = null;
        search = null;
      "
      :search="search"
    />
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import Items from "@/components/Items/Items.vue";

export default {
  components: { Header, Items },
  name: "App",
  data: () => ({
    searched: null,
    search: null,
  }),
};
</script>

<style>
body {
  font-family: "Roboto", sans-serif !important;
}
</style>
