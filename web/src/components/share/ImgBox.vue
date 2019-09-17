<template>
  <div class='img-box'>
    <label class="img-item" v-for='(i,key) in imgs' :key="key">
      <img :src="i" alt="">
    </label>
    <label class="img-item" for='file'>
      照片/视频
      <input type="file" multiple hidden id='file' @change='handle($event)'>
    </label>
  </div>
</template>

<script>
export default {
  data(){
    return{
      imgs:[],
      formdata:new FormData()
    }
  },
  methods:{
    handle(e){
      let files=e.target.files;
      for(let i=0;i<files.length;i++){
        let file=files[i];
        let fileData=new FileReader();
        fileData.readAsDataURL(file);
        fileData.onload=((event)=>{
          this.imgs.unshift(event.target.result);
          this.formdata.append("imgs", event.target.result);
        })
      }
    },
  }

}
</script>

<style lang="scss" scoped>
.img-box{
  display: block;
  display:flex;
  display:-webkit-flex;
  flex-flow:row wrap;
  padding:0 0.1rem;
  .img-item{
    width:30vw;
    height:30vw;
    margin-bottom:0.1rem;
    margin-left:0.05rem;
    background:rgb(231, 230, 229);
    line-height: 30vw;
    text-align: center;
    color:rgb(77, 71, 71);
    >img{
      width:100%;
      height:100%;
      object-fit: cover;
    }
  }
}
</style>
