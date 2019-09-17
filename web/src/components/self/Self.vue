<template>
  <div class='self-box col'>
    <label class="head-img" @click="login()" for='head'>
      <img :src="head" alt="" v-if='isLogin'>
      <p v-if='!isLogin'>登录\注册</p>
      <input type="file" name="head" id="head" hidden v-if='isLogin' @change="changeHead($event)">
    </label>
    <p class='head-des' v-if='isLogin'>点击头像选择更换</p>
    <ul class='self'>
      <li><router-link :to="{path:'/self/info'}">个人信息</router-link></li>
      <li>与我有关</li>
      <li v-if="account!=''"><router-link :to="{path:'/self/'+account}">我的分享</router-link></li>
      <li><router-link :to="{path:'/self/pwd'}">修改密码</router-link></li>
      <li @click='logout()'>注销</li>
    </ul>
    <!-- <div class="img-show" v-if="img!=''">
      <img :src="img" alt="">
    </div> -->
  </div>
</template>

<script>
import storage from '../../module/Storage.js'
import url from '../../module/Const.js'
import { reject } from 'q';

export default {
  data(){
    return{
      isLogin:false,
      account:'',
      head:'',
    }
  },
  mounted(){
    console.log(storage.get('account'));
    if(storage.get('account')){
      this.isLogin=true;
      this.account=storage.get('account').account;
      this.head=storage.get('account').head;
    }
  },
  methods:{
    changeHead(e){
      let file=e.target.files[0];
      let info=storage.get('account');
      let fileData=new FileReader();
      fileData.readAsDataURL(file);
      fileData.onload=((event)=>{
        this.head=event.target.result;
        info.head=event.target.result;
        storage.set('account',info);
        let formData=new FormData();
        formData.append('head',event.target.result);
        formData.append('account',info.account)
        this.$http.post(url+'/api/account/head',formData,{emulateJSON:true}).then((res)=>{
          },
          (err)=>{
            console.log(err);
          })
        })


    },
    login(){
      if(!this.isLogin){
        this.$router.push({path:'/login'});
      }
    },
    logout(){
      storage.remove('account');
        this.isLogin=false;
        this.account='';
    }
  },
  beforeRouteUpdate (to, from, next) {
     if(storage.get('account'))
      this.isLogin=true;
    next();
  }
}
</script>

<style lang='scss' scoped>
.self-box{
  background: linear-gradient(-45deg,rgb(245, 247, 247),rgb(241, 197, 238));
  box-sizing: border-box;
  @include size(100%,100%);
  padding-top:30vw;
  position: relative;
   @include media{
     padding:2rem 1rem;
   }
}
.head-des{
  text-align: center;
  font-size:0.2rem;
  margin-top:0.2rem;
}
.img-show{
  background:white;
  position: absolute;
  top:0;
  left:0;
  height:100%;
  width:100%;
  >img{
    max-width:100%;
    height:auto;
  }
}
.head-img{
  display: block;
  position: absolute;
  top:5vw;
  width:30vw;
  height:30vw;
  background: radial-gradient(rgb(162, 235, 245),rgb(35, 217, 230));
  left:50%;
  transform: translate(-50%,0);
  border-radius:50%;
  overflow: hidden;
  >img{
    max-width:100%;
    height:100%;
    border-radius:50%;
    object-fit: cover;
  }
  >p{
    width:100%;
    position: absolute;
    top:50%;
    transform: translate(0,-50%);
    text-align: center;
    font-size:0.2rem;
    color:white;
  }
   @include media{
    width:2rem;
    height:2rem;
  }
}
.self{
  margin-top:10vw;
  box-sizing: border-box;
  >li{
    background: linear-gradient(to right,rgb(196, 248, 239),rgb(75, 238, 176));
    cursor: pointer;
    font-size:0.2rem;
    padding:0.1rem 0.2rem;
    border-bottom:2px solid rgb(245, 247, 244);
    @include media{
      width:3rem;
      margin:0 auto;
    }
    a{
      color:black;
    }
  }
}
</style>
