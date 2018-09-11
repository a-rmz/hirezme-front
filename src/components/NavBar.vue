<template>
  <b-navbar toggleable="md" type="dark" variant="primary">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand :to="'/'">Hirez me!</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
          <b-nav-item :to="'/'" right>
            Home
          </b-nav-item>
          <b-nav-item v-if="!isAuthed" @click="login()">
            Login
          </b-nav-item>
          <b-nav-item v-else @click="logout()">
            Logut
          </b-nav-item>
          <b-nav-item v-if="user" right>
            <b-img rounded="circle" :src="user.picture" width="25" height="25"/>
          </b-nav-item>
          <b-nav-item-dropdown v-if="user" text="" right>
            <b-dropdown-item href="#">{{ user.name }}</b-dropdown-item>
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
    logout () { this.logoutAction() }
  }
}
</script>
