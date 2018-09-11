<template>
  <div>
    <h1>Loading...</h1>
  </div>
</template>

<script>
import AuthService from '@/auth/Auth0'
import { mapActions } from 'vuex';

export default {
  name: 'callback',
  props: ['auth'],
  mounted() {
    this.handleAuth()
    this.$router.replace('/')
  },
  methods: {
    ...mapActions(['handleAuth']),
  }
}
</script>
