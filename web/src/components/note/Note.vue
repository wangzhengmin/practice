<template>
  <div>
    <v-top></v-top>
    <router-view></router-view>
  </div>
</template>

<script>
import NoteTop from './NoteTop.vue'
export default {
  components:{
    'v-top':NoteTop
  }
}
</script>

<style>

</style>
