<template>
  <div class='container login'>
    <p>登录/注册</p>
    <p class='des'>点击注册直接注册登录</p>
    <form action="" methods='post' @submit.prevent="">
      <ul class='login-info'>
        <li>
          <img src="../../assets/images/账号.png" alt="" class='icon-login'>
          <input type="text" v-model='account' placeholder="输入账号">
        </li>
        <li>
          <img src="../../assets/images/密码.png" alt="" class='icon-login'>
          <input type="password" v-model='pwd' placeholder="输入密码">
        </li>
        <li>
          <button class='btn-login' @click="login('/login')">登录</button>
          <button class='btn-login' @click="login('/register')">注册</button>
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import url from '../../module/Const.js';
import storage from '../../module/Storage.js'

export default {
  data(){
    return{
      account:'',
      pwd:'',
      from:'',
    }
  },
  methods:{
    login(value){
      this.$http.get(url+value,{params:{account:this.account,pwd:this.pwd}}).then((res)=>{
        console.log(res.body)
        if(typeof res.body=='object'){
          storage.set('account',res.body);
          this.$router.push({path:this.from});
        }
      },
      (err)=>{
        console.log(err);
      })
    }
  },
  register(){

  },
   beforeRouteEnter (to, from, next) {
    next(vm=>{
      vm.from=from.path;
    });
  }
}
</script>

<style lang='scss' scoped>
.login{
  padding-top:0.1rem;
  font-size:0.2rem;
  background:rgb(255, 249, 249);
  background:white;
  background:rgb(17, 247, 208);
  >p{
    text-align: center;
    margin-bottom:0.1rem;
  }
  .des{
    padding:0.05rem;
    color:red;
    font-size:0.12rem;
    background:white;
  }
  .login-info{
    >li{
      font-size:0.2rem;
      box-sizing: border-box;
      width:70%;
      margin-left:10%;
      display: block;
      position: relative;
      margin-bottom:0.1rem;
      border-radius:0.1rem;
      >input{
        font-size:0.18rem;
        border:2px solid white;
        background:rgb(17, 247, 208);
        width:100%;
        padding:0.1rem 0 0.05rem 0.3rem;
        border-radius:0.1rem;
        &:focus{
          outline: none;
        }
      }
      ::placeholder{
           color:white;
         }
      .icon-login{
        position: absolute;
        bottom:0.1rem;
        left:0.05rem;
      }
      .btn-login{
        padding:0.1rem 0.4rem;
        background: white;
        border:1px solid white;
        border-radius:0.1rem;
        &:nth-of-type(2){
          float:right;
        }
      }
    }
  }
}
</style>
