<template>
  <div>
    <ul class='pwd-box'>
      <li>
        <label for="oldPwd">旧密码:</label><br>
        <input type="text" id='oldPwd' v-model="oldPwd">
      </li >
      <li>
        <label for="newPwd">新密码:</label><br>
        <input type="text" id='newPwd' v-model="newPwd" >
      </li>
      <li>
        <button class='btn confirm'  @click='changePwd()'>确定</button>
      </li>
    </ul>
  </div>
</template>

<script>
import url from '../../module/Const.js';
import storage from '../../module/Storage.js'

export default {
  data(){
    return{
      oldPwd:'',
      newPwd:''
    }
  },
  methods:{
    changePwd(){
      this.$http.post(url+'/api/account/update',{condition:{account:storage.get('account').account,pwd:this.oldPwd},data:{pwd:this.newPwd}},{emulateJSON:true}).then((res)=>{
        console.log(res.body);
      },
      (err)=>{
        console.log(err);
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.pwd-box{
  font-size:0.2rem;
  padding:0.1rem;
  @include media{
    width:60%;
    margin-left:20%;
    margin-top:20%;
  }
  >li{
    margin-bottom:0.2rem;
    >input{
      width:100%;
      padding:0.05rem 0.1rem;
      box-sizing: border-box;
      border:1px solid;
    }
  }
}
.confirm{
  width:80%;
  margin-left:10%;

}
</style>
