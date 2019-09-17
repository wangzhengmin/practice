<template>
  <div class="top-fixed row" @click='isShow=false'>
    <span class='iconfont icon-menu' @click.stop='isShow=!isShow'>&#xe62c;</span>
    <div class='search-box'>
      <span class='iconfont icon-search'>&#xe6cf;</span>
      <input type="text" placeholder="搜索" v-model='search'>
    </div>
    <div class="note-down" v-show="isShow">
      <nav>
        <router-link :to="{path:'/note/new'}">最新</router-link>
      </nav>
      <nav v-for="(r,k) in menu" :key='k'>
        <router-link :to="{path:r.href}">{{r.sort}}</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      search:'',
      isShow:false,
      menu:[
        {href:'/note/javascript',sort:'javascript'},
        {href:'/note/vue',sort:'vue'}
      ]
    }
  },
  methods:{
    show(){

    }
  }
}
</script>

<style lang='scss' scoped>
.icon-menu{
  margin-left:0.1rem;
}
.search-box{
  height:100%;
  position: absolute;
  align-self: center;
  right:1rem;
  border-radius:0.05rem;
  line-height: 0.35rem;
  .icon-search{
    width:0.25rem;
    height:0.25rem;
    position:absolute;
    right:0;
    z-index: 555;
    color:black;
    line-height: 0.45rem;
  }
  >input{
    text-align: left;
    box-sizing: border-box;
    height:0.25rem;
    padding:0.05rem 0.25rem 0.05rem 0.1rem;
    outline: none;
    line-height: 0.3rem;
    border:0.01rem solid rgb(41, 159, 238);
    border-radius:0.05rem;
  }
}
.note-down{
  margin-left:0.1rem;
  font-size:0.2rem;
  position: absolute;
  top:100%;
  background:rgb(101, 243, 212);
  box-shadow: 0.01rem 0.01rem 0.01rem rgb(182, 177, 177);
  >nav{
    border-bottom:1px solid #666;
    padding:0.05rem 0.1rem;
    >a{
      color:black;
    }
  }
}
</style>
