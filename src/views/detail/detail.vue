<template>
  <div>
    详情{{iid}} git marge
  </div>
</template>

<script>
  export default {
    data(){
      return{
        iid:null
      }
    },
    created(){
      this.iid = this.$route.params.iid
    }
  }
</script>

<style>

</style>