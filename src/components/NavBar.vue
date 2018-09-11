<template>
  <b-navbar toggleable="md" type="dark" variant="primary">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand to="/" class="mb-0">Hirez me!</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="isAuthed" :to="'/applications'" right>
          Applications
        </b-nav-item>
        <b-nav-item v-if="isAuthed" :to="'/companies'" right>
          Companies
        </b-nav-item>
        <b-nav-item v-if="!isAuthed" :to="'/login'">
          Login
        </b-nav-item>
        <b-nav-item v-if="user" right>
          <b-img rounded="circle" :src="user.picture" width="25" height="25"/>
        </b-nav-item>
        <b-nav-item-dropdown v-if="user" text="" right>
          <b-dropdown-item disabled>{{ user.name }}</b-dropdown-item>
          <b-dropdown-item v-if="isAuthed" @click="logout()">
            Logut
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'isAuthed',
    ]),
    ...mapState([
      'user'
    ])
  },
  methods: {
    ...mapActions({
      loginAction: 'login',
      logoutAction: 'logout',
    }),
    login () { this.loginAction() },
    logout () { 
      this.logoutAction()
      this.$router.replace('/')
    }
  }
}
</script>
