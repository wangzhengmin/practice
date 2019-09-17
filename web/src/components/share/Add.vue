<template>
  <div class='share-add'>

    <div class='row top-fixed'>
      <a href="javascript:void(0)" @click='back()'>取消</a>
      <button class='btn' @click='addContent()'>发布</button>
    </div>

    <div class="content-box">
      <v-text :text="textClass" :minHeight="minHeight" :place='place' ref='text'></v-text>
      <v-box ref='file'></v-box>
    </div>

  </div>
</template>

<script>
import storage from '../../module/Storage';
import url from '../../module/Const'
import Text from '../public/Text.vue';
import ImgBox from './ImgBox.vue';
export default {
  data(){
    return{
      textClass:'text-class',
      minHeight:100,
      place:'分享你的娱乐',
    }
  },
  name:'ShareAdd',
  components:{
    'v-text':Text,
    'v-box':ImgBox
  },
  methods:{
    back(){
      this.$router.go(-1);
    },
    addContent(){
      if(this.$refs.text.textValue!=''){
        let {name,account,head}=storage.get('account');
        let files=this.$refs.file.formdata;
        files.append("account", account);
        files.append("name", name);
         files.append("head", head);
        files.append("content", this.$refs.text.textValue);

        this.$http.post(url+'/api/share/add',files,{emulateJSON:true}).then((res)=>{
          if(typeof res.body=='object'){
            this.$router.push({path:'/share'});
            this.$refs.text.textValue='';
            this.$refs.file.imgs='';
            this.$refs.file.formdata=new FormData();
          }
        },
        (err)=>{
          console.log(err);
        })
      }
    }
  },
  beforeRouteEnter(to,from,next){
    if(storage.get('account'))
      next()
    else
    next({path:'/login'});
  },
  // beforeRouteLeave(to,from,next){
  //   console.log('离开');
  // }
}
</script>

<style lang='scss' scoped>
.top-fixed{
  justify-content: space-between;
  padding:0 0.2rem;
  box-sizing: border-box;
  a{
    color:white;
  }
  .btn{
    margin:0.05rem;
  }
}
.content-box{
  margin-top:0.4rem;
}
</style>

<style>
  .text-class{
    width:100%;
    border:none;
    outline: none;
    padding:0.05rem 0.1rem;
    background:rgb(247, 244, 244);
    box-sizing: border-box;
  }
</style>
