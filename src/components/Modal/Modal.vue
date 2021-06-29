<template>
  <div>
    <transition name="fade">
      <div class="backdrop" v-show="activeN">
        <div class="modal">
          <div class="modal-content">
            <slot></slot>
            <slot name="footer">
              <button class="btn btn-grey" @click="activeN = false">
                Cancel
              </button>
              <button @click="handleDelete" class="btn btn-danger">
                Delete
              </button>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    activeN: false,
  }),
  methods: {
    handleDelete() {
      this.$emit("click-delete");
    },
  },
  watch: {
    activeN(val) {
      this.$emit("update:active", val);
    },
    active(val) {
      this.activeN = val;
    },
  },
};
</script>

<style lang="scss">
$backdrop: rgb(0, 0, 0, 0.4);

.backdrop {
  background: $backdrop;
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #f3f3f3;
  border-radius: 0.8rem;
  padding: 1rem;
}

.model-content {
  padding: 2rem;
}

.fade-enter-active {
  animation: slideIn 800ms;
}
.fade-leave-active {
  animation: slideOut 800ms;
}

@keyframes slideIn {
  from {
    top: 100vh;
  }
  to {
    top: 0;
  }
}
@keyframes slideOut {
  from {
    top: 0;
  }
  to {
    top: -100vh;
  }
}

.btn {
  padding: 0.6rem 0.8rem;
  border-radius: 0.4rem;
  margin: 0 0.5rem;
  border: none;
  transition: all 500ms;

  &.btn-grey {
    background: #6b7280;
    color: #000;

    &:hover {
      background: #9ca3af;
      cursor: pointer;
    }
  }
  &.btn-danger {
    background: #ef4444;
    color: white;

    &:hover {
      background: #f87171;
      cursor: pointer;
    }
  }
}
</style>
