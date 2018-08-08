<template lang="pug">
  div#app
    div#cover
    m-header
    m-todo
    m-footer
</template>

<script>
  import MHeader from './components/todo/header.vue'
  import MTodo from './components/todo/index.vue'
  import MFooter from './components/todo/footer.jsx'
  export default {
    components: {
      MHeader,
      MTodo,
      MFooter
    },
    data() {
      return {
        text: 'Hello ssr!'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #app
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    #cover
      position absolute
      left 0
      right 0
      top 0
      bottom 0
      opacity .3
      background-color #fff
      z-index -1
</style>
