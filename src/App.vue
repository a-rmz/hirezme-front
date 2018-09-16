<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import NavBar from '@/components/NavBar'

export default {
  components: {
    NavBar
  },
  methods: {
    ...mapActions([
      'initData'
    ])
  },
  mounted () {
    this.$nextTick(() => {
      this.initData()
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
