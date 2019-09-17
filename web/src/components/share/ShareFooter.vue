<template>
  <div>
    <div class="row share-icon">
      <span :class="{'iconfont':true,yellow:bol}" @click="point()">&#xe7b6;</span>
      <span class='iconfont'  @click="()=>{ this.$refs.text.focu()}">&#xe65f;</span>
      <span class='iconfont'>&#xe534;</span>
    </div>
    <div class="zan" v-if="this.$props.zan.length>0">
      <span class='iconfont'>&#xe639;</span>
      <router-link  v-for="(z,k) in this.$props.zan" :key="k" :to="{path:'/other/'+z.account}">{{z.name}}、</router-link>
    </div>
    <div class="argu">
      <ul class='argu-out'>
        <li v-for="(a,k) in this.$props.argu" :key="k">
          <p @click.stop='resOut(k)'>
            <router-link :to="{path:'/other/'+a.account}" @click.stop="">{{a.name}}</router-link><span class='mao'>:</span>{{a.argu}}
          </p>
          <ol class='argu-in'>
            <li v-for="(r,k2) in a.res" :key='k2' @click.stop='resIn(k,k2)'>
              <router-link :to="{path:'/other/'+r.account}" class="des" @click.stop="">{{r.name}}</router-link>
              <span class='res'>回复</span>
               <router-link :to="{path:'/other/'+r.res_account}" class="des" @click.stop="">{{r.res_name}}</router-link>
              <span class='mao'>:</span>{{r.res}}
            </li>
          </ol>
        </li>
      </ul>
    </div>
     <div class="argu-box row" @click.stop="">
        <v-text :text="textClass" :minHeight="minHeight" :place='place' ref='text'></v-text>
        <button class='btn' @click.stop='argument'>发布</button>
     </div>
  </div>
</template>

<script>
import url from '../../module/Const'
import storage from '../../module/Storage.js'
import Text from '../public/Text.vue'
export default {
  data(){
    return{
      bol:false,
      yellow:'yellow',
      minHeight:30,
      textClass:'text-class',
      place:'评论',
      case:1,
      key:0,
      key2:0
    }
  },
  components:{
    'v-text':Text,
  },
  props:['zan','argu'],
  mounted(){
    if(storage.get('account')){
      let {account}=storage.get('account');
      let bol=this.$props.zan.every((value)=>{
        return value.account!=account;
      })
      if(!bol)
        this.bol=true;
    }
  },
  methods:{
    setCase(){
      this.case=1;
      this.place='评论';
    },
    point(){
      if(storage.get('account')){
        let {account,name}=storage.get('account');
         if(!this.bol){
          this.bol=true;
          this.$props.zan.push({account:account,name:name});
          this.$emit('update','zan');
         }else{
          this.$props.zan.forEach((value,key)=>{
            if(value.account==account){
              this.$props.zan.splice(key,1);
              this.bol=false;
            }
          })
          this.$emit('update','zan');
        }
      }else{
        this.$router.push({path:'/login'});
      }
    },
    argument(){
       if(storage.get('account')){
         let {account,name}=storage.get('account');
          switch(this.case){
            case 1:
              this.$props.argu.push({account:account,name:name,argu:this.$refs.text.textValue,res:[]});
              this.$emit('update','argu');

              break;
            case 2:
              let ele=this.$props.argu[this.key];
              let data={account:account,name:name,res:this.$refs.text.textValue,res_account:ele.account,res_name:ele.name};
              if(typeof this.$props.argu[this.key].res != 'object')
                this.$props.argu[this.key].res=[]
              this.$props.argu[this.key].res.push(data);
              this.$emit('update','argu');
              break;
            case 3:
              let ele2=this.$props.argu[this.key].res[this.key2];
              let data2={account:account,name:name,res:this.$refs.text.textValue,res_account:ele2.account,res_name:ele2.name};
              if(typeof this.$props.argu[this.key].res != 'object')
                this.$props.argu[this.key].res=[]
              this.$props.argu[this.key].res.push(data2);
              this.$emit('update','argu');
              break;
        }
        this.setCase();
        this.$refs.text.textValue='';
      }
    },
    resOut(k){
        this.$refs.text.focu();
        this.place="回复"+this.$props.argu[k].name;
        this.key=k;
        this.case=2;
    },
     resIn(k,k2){
        this.$refs.text.focu();
        this.place="回复"+this.$props.argu[k].res[k2].name;
        this.key=k;
        this.key3=k2;
        this.case=3;
    },
  }
}
</script>

<style lang='scss' scoped>
.yellow{
  color:yellow;
}
.share-icon{
  padding:0 0.1rem;
  justify-content: flex-end;
  >span{
    font-size:0.2rem;
    display: inline-block;
    margin-left:0.1rem;
  }
}
.zan{
  padding:0.05rem 0.1rem;
  a{
    color:blue;
  }
}
.argu{
  padding:0 0.05rem 0.1rem 0.05rem;
  a{
    color:blue;
  }
  .mao{
    margin-right:0.05rem;
  }
  .res{
    margin:0 0.05rem;
  }
  .argu-out{
    p{
      margin-bottom:0.1rem;
    }
  }
  .argu-in{
    >li{
      margin-bottom: 0.1rem;
    }
  }
}
.argu-box{
  padding:0 0.1rem 0.1rem 0.1rem;
  .btn{
    height:0.3rem;
    align-self: center;
    font-size:0.15rem;
    line-height:0.2rem;
    flex:0 0 0.5rem;
    margin-left:0.2rem;
  }
  >div{
    flex:1 1;
  }
}
</style>
<style>
  .text-class{
    width:100%;
    border:1px solid black;
    outline: none;
    padding:0.05rem 0.1rem;
    font-size:0.15rem;
    line-height:0.2rem;
    box-sizing: border-box;
    border-radius:0.1rem;
  }
</style>
