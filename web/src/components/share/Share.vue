<template>
<div>
  <div class="share-top">
    <p>分享中心</p>
    <router-link to='/share/add'>
      <img src="../../assets/images/加.png" alt="" class='icon-add'>
    </router-link>
  </div>
  <div class='share-box'>
    <v-content v-for="(c,k) in contents" :key="k" :cont="c"></v-content>
  </div>
</div>
</template>

<script>
import url from '../../module/Const'
import storage from '../../module/Storage.js'
import Content from './Content.vue'
export default {
  data(){
    return{
      contents:[],
    }
  },
   components:{
    'v-content':Content
  },
  mounted(){
    this.getList();
  },
  methods:{
    getList(){
      this.$http.get(url+'/api/share/list',{params:{}}).then((res)=>{
        console.log(res.body);
        res.body.sort(function(a,b){
          return b.time-a.time;
        });
        this.contents=res.body;
      },(err)=>{
        console.log(err);
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.share-top{
  height:0.4rem;
  line-height:0.4rem;
  color:white;
  font-size:0.2rem;
  text-align: center;
  background:linear-gradient(right,rgb(41, 159, 238),rgb(98, 189, 250));
  position:fixed;
  width:100%;
  top:0;
  .icon-add{
    position:absolute;
    top:0.05rem;
    right:0.1rem;
    cursor: pointer;
  }
}
.share-box{
  margin-top:0.4rem;
}
</style>
