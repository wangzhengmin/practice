<template>
  <div id="app">
    <div class="menu">
      <Tab></Tab>
    </div>
    <div class="view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Tab from './components/public/Tab.vue'

export default {
  name: 'App',
  components:{Tab}
}
</script>

<style lang='scss' scoped>
#app{
  height:100vh;
  width:100vw;
  display:flex;
  display:-webkit-flex;
  flex-flow:column nowrap;
  .menu{
    flex:0 0 0.55rem;
    order:2;
  }
  .view{
    flex:1 1 auto;
    order:1;
    overflow-y: scroll;
  }
  @media screen and (min-width:768px){
    flex-flow:row nowrap;
    .menu{
      flex:0 0 0.55rem;
      padding:0.2rem;
      order:1;
    }
    .view{
      flex:1 1 auto;
      border-left:1px solid red;
      border-right:1px solid red;
    }
  }
}
::-webkit-scrollbar{
  width:0;
}
</style>
