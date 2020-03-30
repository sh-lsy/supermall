<template>
<div>
  <router-view></router-view>
  <main-tab-bar></main-tab-bar>
</div>

</template>
<script>
import MainTabBar from 'components/content/MainTabBar/MainTabBar'

export default {
  components:{
    MainTabBar
  }
}
</script>
<style>
  @import "assets/css/base.css";
</style>
