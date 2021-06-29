<template>
  <div class="app">
    <Header
      @searched="searched = $event"
      @search-data="search = $event"
      @add-item="handleAddItem"
      :lastItem="lastItem"
      :searched="searched"
    />
    <items
      :searched="searched"
      @clear-searched="
        searched = null;
        search = null;
      "
      :search="search"
      :items="items"
      @update-items="getItems"
      @remove-item="handleRemove"
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
    items: [],
    lastItem: {},
  }),
  created() {
    this.getItems();
  },
  methods: {
    getItems() {
      this.$api.data
        .list()
        .then(({ data }) => {
          this.items = data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handleAddItem() {
      this.getItems();
      this.searched = null;
      this.search = null;
    },
    handleRemove(id) {
      this.items = this.items.filter((i) => i.id !== id);
    },
  },
  watch: {
    searched() {
      if (this.searched) {
        this.lastItem = this.items[this.items.length - 1];
        this.items = this.searched;
      } else {
        this.getItems();
      }
    },
  },
};
</script>

<style>
body {
  font-family: "Roboto", sans-serif !important;
}
</style>
