<template>
  <div class='tab'>
    <router-link v-for='(t,k) in tab'
      :key='k' :to="{ path : t.url}"
      tag='div'
      class="tab-item"
      active-class="tab-action"
      >
        <p class='iconfont'>&#xe731;</p>
        <p>{{t.des}}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name:'tab',
  data(){
    return{
      tab:[
        {font:'&#xe731;',des:'推荐',url:'/recommend'},
        {font:'&#xe642;',des:'分享',url:'/share'},
        {font:'&#xe618;',des:'笔记',url:'/note/new'},
        {font:'&#xe706;',des:'个人',url:'/self'},
      ]
    }
  },
  methods:{
    tabChange(k){
      this.tab.forEach((value)=>{
        value.action=false;
      })
      this.$router.push({path:this.tab[k].url})
      this.tab[k].action=true;
    }
  }
}
</script>

<style lang='scss' scoped>
.tab-action{
  color:rgba(0, 195, 255, 0.897);
}
.tab{
  width:100%;
  display:flex;
  display:-webkit-flex;
  flex-flow:nowrap;
  font-size:0.12rem;
  text-align: center;
  z-index:88;
  .tab-item{
    padding:0.05rem 0;
    flex:1;
    background:white;
  }
   @media screen and (min-width:768px){
    flex-flow:column nowrap;
    .tab-item{
      padding:0 0.1rem;
      margin-bottom:0.2rem;
    }
  }
}

</style>
