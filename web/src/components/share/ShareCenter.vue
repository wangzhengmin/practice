<template>
  <div>
    <p class="share-content">{{this.$props.content}}
    </p>
    <div class='img-box' v-if="this.$props.imgs">
      <label class="img-item" v-for="(i,k) in this.$props.imgs" :key="k">
        <img :src="i" alt="">
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props:['content','imgs'],
}
</script>

<style lang='scss' scoped>
.share-content{
  padding:0 0.1rem 0.1rem 0.1rem;
  white-space: pre-wrap;
  color:black;
}
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
