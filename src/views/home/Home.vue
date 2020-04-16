<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
       @tabclick="tabClcik" ref="tabControl1" class="tabControl" v-show="isTabControl"></tab-control>
    <scroll class="content" ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" 
       @tabclick="tabClcik" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView';
  import FeatureView from './childComps/FeatureView'

  import TabControl from 'components/content/TabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList';
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata,getHomeGoods} from 'network/home'
  import {debounce } from 'common/utils'
  
 

  export default {
    name:'Home',
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return{
        banners:[],
        recommend:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabControl:false,
        savaY:0
      }
    },
    activated(){
      // console.log(this.savaY);
      
      this.$refs.scroll.scrollTo(0,this.savaY,0)
      this.$refs.scroll.scroll.refresh()
    },
    deactivated(){
      
      this.savaY = this.$refs.scroll.getScrollY()
      // console.log(this.savaY);
      
    },
    created(){
      this.getHomeMultidata()
      //请求商品
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
     
    },
    mounted(){
       //监听图片加载
      const refresh = debounce(this.$refs.scroll.refresh,50)
      this.$bus.$on('itemImageLoad',() =>{
        refresh()
      })
      // 获取tabcontrol 高度
      this.tabOffsetTop
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods:{
      /*
        事件监听
      */
     tabClcik(index){
       switch(index){
         case 0:
           this.currentType='pop'
           break
         case 1:
           this.currentType='new'
           break
         case 2:
           this.currentType='sell'
           break
       }
       this.$refs.tabControl1.currentIndex = index
       this.$refs.tabControl2.currentIndex = index
     },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position){
        // 判断是否显示backtop
        this.isShowBackTop = (-position.y)>1000
        // 判断tabControl 是否吸顶
        this.isTabControl = (-position.y)>this.tabOffsetTop
      },
      

      loadMore(){
       this.getHomeGoods(this.currentType)
        
      },
      swiperImageLoad(){
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;    
      },
     /*
      网络请求
     */
      getHomeMultidata(){
         getHomeMultidata().then(res =>{
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
      },
      getHomeGoods(type){
        const page=this.goods[type].page+1
        getHomeGoods(type,page).then(res =>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
      }
    }
  }
</script>

<style scoped>
  #home{
    /* padding-top:44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color:var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 999; */
  }
  .tabControl{
    position: relative;
    z-index: 999;
  }
  .content{
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* .content{
    height:calc(100% - 93px) ;
    overflow: hidden;
    margin-top: 44px;
  } */
</style>