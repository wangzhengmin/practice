<template>
  <div class='share-item'  @click='setCase()'>
    <v-head :head="this.$props.cont.head" :time="this.$props.cont.time" :name="this.$props.cont.name" :account="this.$props.cont.account"></v-head>
    <v-center :content="this.$props.cont.content" :imgs="this.$props.cont.imgs"></v-center>
    <v-footer :zan="this.$props.cont.zan" :argu="this.$props.cont.argu" @update='update' ref='footer'></v-footer>
  </div>
</template>

<script>
import ShareHead from './ShareHead.vue'
import ShareCenter from './ShareCenter.vue'
import ShareFooter from './ShareFooter.vue'
import Text from '../public/Text.vue'

import url from '../../module/Const'
import storage from '../../module/Storage.js'

export default {
  data(){
    return{
    }
  },
  props:["cont"],
  components:{
    'v-head':ShareHead,
    'v-center':ShareCenter,
    'v-footer':ShareFooter
  },
  methods:{
    setCase(){
      this.$refs.footer.setCase();
    },
    update(value){
      let {account,time}=this.$props.cont;
      let data=this.$props.cont[value];
      let zanLen=this.$props.cont.zan.length;
      let arguLen=this.$props.cont.argu.length;
      this.$http.post(url+'/api/share/update',{condition:{account:account,time:time},data,attr:value,zanLen:zanLen,arguLen:arguLen},{emulateJSON:true}).then((res)=>{
      },
      (err)=>{
        console.log(err);
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.share-item{
  background:white;
  margin-bottom:0.1rem;
  font-size:0.15rem;
  line-height:0.15rem;
}
</style>
<style>
  .text-class{
    width:100%;
    border:1px solid black;
    padding:0.05rem 0.1rem;
    outline: none;
    background:rgb(247, 244, 244);
    box-sizing: border-box;
  }
</style>
