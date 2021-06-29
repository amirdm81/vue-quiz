<template>
  <div class="header">
    <button
      v-if="searched?.length < 1 && search"
      class="add-btn"
      @click="createNewData"
    >
      +
    </button>
    <div class="search">
      <button class="search-btn" @click="handleSearch">
        <svg
          class="search-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width="50px"
          height="50px"
        >
          <path
            d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"
          />
        </svg>
      </button>
      <div class="input-bar">
        <input
          class="search-input"
          placeholder="Search something..."
          :value="search"
          @input="handleWait"
        />
        <div class="progress-bar" :style="{ width: `${progress}%` }" />
      </div>
    </div>
  </div>
</template>

<script>
let timer;
let progressTimer;

export default {
  props: {
    lastItem: {
      type: Array,
    },
    searched: {
      type: Array,
    },
  },
  data: () => ({
    progress: 0,
    search: "",
  }),
  methods: {
    handleWait(val) {
      this.search = val.target.value;

      if (!this.search) {
        this.clear();
        this.$emit("searched", null);
        this.$emit("search-data", null);
        return;
      }
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (!progressTimer) {
        progressTimer = setInterval(() => {
          if (this.progress == 100) {
            this.progress = 0;
            return;
          }
          this.progress += 0.5;
        }, 20);
      }

      timer = setTimeout(() => {
        clearInterval(progressTimer);
        progressTimer = null;
        this.progress = 0;
        this.handleSearch();
      }, 1000);
    },
    handleSearch() {
      this.clear();
      this.$api.data
        .list({ "title.text_like": this.search })
        .then(({ data }) => {
          this.$emit("searched", data);
          this.$emit("search-data", this.search);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    clear() {
      this.progress = 0;
      clearInterval(progressTimer);
      clearTimeout(timer);
      progressTimer = null;
      timer = null;
    },
    createNewData() {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);

      this.$api.data
        .create({
          // id: this.lastItem.id + 1,
          description: this.lastItem.description,
          img: this.lastItem.img,
          color: `#${randomColor}`,
          title: { text: this.search },
        })
        .then(({ data }) => {
          console.log(data);
          this.$emit("add-item", data);
          this.search = null;
        })
        .catch((e) => {
          console.log(e);
          // alert("error in create new data");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  max-width: 33rem;
  margin: 0 auto;
  background: #dce2e8;
  padding: 1rem;
  border-radius: 0.8rem;
  display: flex;
}

.search {
  width: 100%;
  margin-left: 1rem;
  background: white;
  border-radius: 5rem;
  height: 1rem;
  padding: 0.8rem 0.4rem 0.8rem 0rem;
  display: flex;
  align-items: center;
}

.search-input {
  appearance: none;
  border: none;
  width: 100%;
  height: 2rem;
  font-size: 1rem;

  &:focus {
    border: none;
    // border-bottom: 1px solid #9e79f1;
  }
}

.search-icon {
  height: 1.8rem;
  fill: #9e79f1;
  &:hover {
    cursor: pointer;
  }
}

.search-btn {
  background: none;
  padding: 0;
  border: none;
  border-radius: 1rem;

  &:hover {
    background: #f3f3f3;
  }
}

.input-bar {
  display: flex;
  flex-direction: column;
  width: 86%;
  max-width: 30rem;
}

.add-btn {
  background: white;
  height: 2rem;
  width: 2rem;
  border-radius: 10rem;
  padding: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border: none;
  color: #9e79f1;
  transition: all 500ms;

  &:hover {
    background: #9e79f1;
    color: white;
    cursor: pointer;
  }
}

.progress-bar {
  height: 0.4rem;
  border-radius: 1rem;
  background: #9e79f1;
  bottom: 0;
}
</style>
