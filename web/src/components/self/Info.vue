<template>
  <div class="self-info">
    <ul class='info'>
      <li class='in'>
        <label for="name">昵称:</label>
        <span v-if="!isChange">{{info.name}}</span>
        <input type="text" id='name' v-model="info.name" v-if="isChange">
      </li>
      <li class='in'>
        <label >性别:</label>
        <span v-if="!isChange">{{info.sex}}</span>
        <input type="radio"  v-model="info.sex" v-if="isChange" value='男'><i v-if="isChange">男</i>
        <input type="radio"  v-model="info.sex" v-if="isChange" value='女'><i v-if="isChange">女</i>
      </li>
      <li class='in'>
        <label for="date">出生日期:</label>
        <span v-if="!isChange">{{info.date}}</span>
        <input type="date" id='name' v-model="info.date" v-if="isChange">
      </li>
       <li class='in' v-if="!isChange">
        <label for="name">账号:</label>
        <span>{{info.account}}</span>
      </li>
      <li>
        <button class='btn' v-if="!isChange" @click='isChange=true'>修改</button>
        <button class='btn right' v-if="isChange" @click='save()'>保存</button>
      </li>
    </ul>
  </div>
</template>

<script>
import storage from '../../module/Storage.js'
import url from '../../module/Const.js'

export default {
  name:'Info',
  data(){
    return{
      isChange:false,
      isPwd:false,
      info:{}
    }
  },
  mounted(){
    this.info=storage.get('account');
  },
  methods:{
    save(){
      console.log(this.info);
      let {name,sex,date,account}=this.info;
      this.$http.post(url+'/api/account/update',{condition:{account:account},data:{name:name,sex:sex,date:date,}},{emulateJSON:true}).then((res)=>{
        if(res.body=='修改成功')
          storage.set('account',this.info);
      },
      (err)=>{
        console.log(err);
      })
      this.isChange=false;
    },
  }
}
</script>

<style lang='scss' scoped>
.self-info{
  background:linear-gradient(-45deg,rgb(235, 245, 248),rgb(180, 238, 248));
  font-size:0.15rem;
  height:100%;
  box-sizing: border-box;
  @include media{
    width:60%;
    margin-left:20%;
    padding-top:20%;
  }
  .info{
    padding:0.2rem;
    >li{
      list-style: none;
      height:0.3rem;
      line-height: 0.3rem;
      display: flex;
      .btn{
        font-size:0.15rem;
        margin:0 auto;
      }
    }
    .in{

      margin-bottom:0.1rem;
      border-radius:0.1rem;
      >label{
        display: inline-block;
        background:rgb(17, 245, 233);
        padding:0 0.1rem;
        border-radius:0.1rem 0 0 0.1rem;
      }
      >span{
        padding:0 0.1rem;
        border:1px solid black;
        border-left:none;
        border-radius:0 0.1rem 0.1rem 0;
        display: inline-block;
        flex:1 1;
      }
      >i{
        font-style: normal;
      }
    }
    input{
      border:1px solid red;

       padding:0 0.1rem;
      height:100%;
      display: inline-block;
      flex:1 1;
    }
  }
}
</style>
