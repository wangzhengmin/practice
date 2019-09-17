<template>
<div class='text-box' ref='box'>
  <textarea
    v-model='textValue'
    ref='text'
    @input="setHeight()"
    :class="this.$props.text"
    :placeholder="this.$props.place"
    :style="{height:this.$props.minHeight+'px'}"

  >
  </textarea>
</div>
</template>

<script>
export default {
  data(){
    return{
      textValue:'',
    }
  },
  props:['minHeight','text','place'],
  methods:{
    setHeight(){
      let dom=this.$refs.text;
      dom.style.height=this.$props.minHeight+'px';
      if(dom.scrollHeight>this.$props.minHeight)
        dom.style.height=dom.scrollHeight+'px';
      else
        dom.style.height=this.$props.minHeight+'px';
    },
    focu(){
      this.$refs.text.focus();
    }
  }
}
</script>

<style lang='scss' scoped>
.text-box{
  // height:auto;
  // width:auto;
}
</style>
