<template>
  <div class="backdrop">
      
      <div class="modal">

          <div class="modal-content"></div>

      </div>

  </div>
</template>

<script>
export default {
name: 'Modal'
}
</script>

<style lang="sass">
    $backdrop : rgb(0,0,0,0.4)

    .backdrop
        background: $backdrop
        position: fixed
        inset: 0
        display: flex
        justify-content: center
        align-items: center

    .modal
        background: #f3f3f3
        border-radius: 0.8rem
        padding: 1rem
        
        .modal-content

    
</style>