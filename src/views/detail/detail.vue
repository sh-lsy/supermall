<template>
  <div>
    详情{{iid}}aaa
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