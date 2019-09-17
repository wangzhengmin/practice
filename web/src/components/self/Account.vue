<template>
  <div>
    <v-content v-for="(c,k) in contents" :key="k" :cont="c"></v-content>
    <p v-if="contents.length==0" class='empty'>暂时没有分享</p>
  </div>
</template>

<script>
import Content from '../share/Content.vue'
import url from '../../module/Const'
export default {
  data(){
    return{
      contents:[]
    }
  },
  components:{
    'v-content':Content
  },
  mounted(){
    this.$http.get(url+'/api/share/list',{params:{account:this.$route.params.account}}).then((res)=>{
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
</script>

<style>
.empty{
  text-align: center;
  margin-top:50%;
  font-size:0.2rem;
}
</style>
