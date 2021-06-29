<template>
  <div class="container">
      <Item v-for="(item,i) in items" :key="i" v-bind="item"/>
  </div>
</template>

<script>
import Item from '@/components/Item/Item.vue';

export default {
    components: {Item},
    data: () => ({
        items: [],
    }),
    created() {
        this.$api.data.list().then(({data}) => {
            this.items = Object.keys(data).map(d => data[d]);
            
        }).catch(e=> {
            console.log(e);
        })
    }
}
</script>

<style lang="sass" scoped>
    .container 
        max-width: 35rem
        margin: 0 auto
</style>