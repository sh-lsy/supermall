<template>
  <div id="tabbar">
     <slot></slot>
  </div>
</template>

<script>
export default {
  name:'TabBar'
}
</script>

<style>
  #tabbar{
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    box-shadow: 0 -1px 1px rgba(0,0,0,.2);
  }

</style>