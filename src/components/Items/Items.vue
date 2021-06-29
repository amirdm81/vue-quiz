<template>
  <div class="container">
    <div v-if="searched && searched.length < 1" class="no-result">
      <p>No results found</p>
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
    items: {
      type: Array,
    },
  },
  methods: {
    handleRemove(id) {
      this.$emit("remove-item", id);
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
