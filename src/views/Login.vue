<template>
  <div>
    <h1>This will eventually be a nice login screen</h1>
    <b-button size="lg" :variant="'success'" @click="login">Login</b-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'login',
  methods: {
    ...mapActions([
      'login'
    ])
  }
}
</script>
