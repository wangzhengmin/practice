<template>
  <div>
    <div class="note-sort">
      分类: {{this.$route.params.sort}}
    </div>
    <div class='note-item' v-for='i in 5'>
      <p>2019</p>
      <ul class='note-menu'>
        <li>
          <div class="row">
            <router-link class="title" :to="{path:'/note/javascript/detail'}">javascript </router-link>
            <span>(@2019-02-03)</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:'Sort',
  watch:{
    $route:function(to,from){
      console.log(to.params.sort);
    }
  },
}
</script>

<style lang='scss' scoped>
.note-sort{
  margin-top:0.5rem;
  background: #AAD2F0;
  height:0.4rem;
  width:70%;
  margin-left:15%;
  border-radius:0.1rem;
  line-height:0.4rem;
  padding-left:0.2rem;
  font-size:0.2rem;
  font-weight: bold;
  word-spacing: 0.02rem;
}
.note-item{
  margin-top:0.2rem;
  padding:0 0.1rem;
  @media screen and(min-width:576px){
    padding:0 0.5rem;
  }
  >p{
    font-size:0.2rem;
    font-weight: bold;
    text-align: center;
    border-bottom:1px solid #d3d3d3;
  }
}
.note-menu{
  font-size:0.2rem;
  margin-top:0.1rem;
  padding-left:0.4rem;
  padding-right:0.2rem;
  >li{
    list-style:square;
    .title{
      display:block;
      white-space: nowrap;
      font-size:0.2rem;
      text-decoration: underline;
      overflow: hidden;
      text-overflow:ellipsis;
    }
    span{
      display:block;
      margin-left:0.1rem;
      font-size:0.15rem;
      color:#666;
    }
  }
}

</style>
