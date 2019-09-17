<template>
  <div class="row share-head">
    <router-link :to="{path:'/other/'+this.$props.account}">
      <div class="head">
        <img :src="this.$props.head" alt="">
      </div>
    </router-link>
    <div class='head-des'>
      <router-link :to="{path:'/other/'+this.$props.account}" class="des">{{this.$props.name}}</router-link>
      <p class='time'>{{this.$props.time | time}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props:['head','name','time','account'],
  filters:{
    time(value){
      function zero(v){
        if(v<10)
          return '0'+v;
        else
          return v
      }
      let time=new Date().getTime();
      let today=Math.floor(time/86400000);
      let show=Math.floor(value/86400000);
      let date=new Date(value);
      let year=date.getFullYear()+'-'+zero(date.getMonth()+1)+'-'+zero(date.getDate());
      let hour=zero(date.getHours())+':'+zero(date.getMinutes());
      let num=today-show;
      switch(num){
        case 0:
          return '今天 '+hour;
        case 1:
          return '昨天 '+hour;
        case 2:
          return '前天 '+hour;
        case 3:
        case 4:
        case 5:
          return num+'天前 '+hour;
        default:
          return year+' '+hour;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.share-head{
  padding:0.1rem 0.1rem;
}
.head{
  height:0.5rem;
  width:0.5rem;
  background:red;
  margin-right:0.1rem;
  border-radius:50%;
  >img{
    max-width: 100%;
    height:100%;
    border-radius:50%;
  }
}
.head-des{
  .des{
    line-height: 0.25rem;
    color:black;
  }
  .time{
    color:#666;
    font-size:0.12rem;
  }
}
</style>
