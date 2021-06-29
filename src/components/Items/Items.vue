<template>
  <div class="container">
    <div v-if="searched && searched.length < 1" class="no-result">
      <p>No results found</p>
      <button @click="createNewData">+ create new data</button>
    </div>
    <div v-else>
      <Item
        v-for="(item, i) in items"
        :key="i"
        v-bind="item"
        @remove-item="handleRemove"
      />
    </div>
  </div>
</template>

<script>
import Item from "@/components/Item/Item.vue";

export default {
  components: { Item },
  props: {
    searched: {
      type: Array,
    },
    search: {
      type: String,
    },
  },
  data: () => ({
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
    createNewData() {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);

      this.$api.data
        .create({
          id: this.lastItem.id + 1,
          description: this.lastItem.description,
          img: this.lastItem.img,
          color: `#${randomColor}`,
          title: { text: this.search },
        })
        .then(({ data }) => {
          this.$emit("clear-searched");
          // alert("new data created successfully");
          this.items.push(data);
        })
        .catch((e) => {
          console.log(e);
          // alert("error in create new data");
        });
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

<style lang="scss" scoped>
.container {
  max-width: 35rem;
  margin: 0 auto;
}
.no-result {
  text-align: center;

  button {
    background: #9e79f1;
    color: white;
    font-size: 1rem;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 3rem;

    &:hover {
      background: #8366c3;
      cursor: pointer;
    }
  }
}
</style>
