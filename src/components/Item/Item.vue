<template>
  <div class="item">
    <div class="item-top">
      <div class="item-right">
        <img :src="img" class="item-image" />
        <div class="item-texts">
          <h2 class="item-title">{{ title.text }}</h2>
          <p class="item-description">
            {{ description }}
          </p>
        </div>
      </div>

      <div class="item-left">
        <modal v-model:active="deleteModal" @click-delete="handleDelete">
          <h1>Delete item</h1>
          <p>are you sure to delete this item ?</p>
        </modal>
        <button @click="deleteModal = true" class="item-delete-btn">
          <img :src="require('@/assets/trash-can.svg')" class="item-delete" />
        </button>
      </div>
    </div>
    <div class="item-bottom" :style="{ background: color }"></div>
  </div>
</template>

<script>
import Modal from "../Modal/Modal.vue";
export default {
  components: { Modal },
  props: {
    title: {
      text: {
        require: true,
        type: String,
      },
    },
    description: {
      type: String,
      require: true,
    },
    color: {
      type: String,
      require: true,
    },
    img: {
      type: String,
      require: true,
    },
    id: {
      type: Number,
      require: true,
    },
  },
  data: () => ({
    deleteModal: false,
  }),
  methods: {
    handleDelete() {
      this.$api.data
        .delete(this.id)
        .then(() => {
          this.deleteModal = false;
          this.$emit("remove-item", this.id);
          // alert("item successfully deleted");
        })
        .catch((e) => {
          console.log(e);
          // alert("error in delete item");
        });
    },
  },
};
</script>

<style lang="scss">
@use "sass:color";

.item {
  padding: 0.8rem;
  border-radius: 0.8rem;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
}

.item-top {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.item-right {
  display: flex;
  flex-direction: row-reverse;
  text-align: right;
  align-items: flex-end;
}

.item-left {
  align-self: flex-end;
}

.item-title {
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
  color: #6e6e6e;
}

.item-description {
  font-size: 0.7rem;
  margin: 0;
  padding: 0;
  color: #b9bbbd;
}

.item-image {
  width: 4rem;
  height: 4rem;
  background: #f9f9f9f9;
  object-fit: cover;
  border-radius: 0.4rem;
  margin-left: 1rem;
}

.item-bottom {
  border-radius: 0.8rem;
  height: 0.5rem;
}

.item-delete {
  height: 1.7rem;
  width: 1.7rem;
}

.item-delete-btn {
  background: none;
  border: none;
}
</style>
