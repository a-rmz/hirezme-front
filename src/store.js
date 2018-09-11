import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { decode } from 'jsonwebtoken'

import AuthService from '@/auth/Auth0'

Vue.use(Vuex)

const authService = new AuthService()

export default new Vuex.Store({
  state: {
    authenticated: !!localStorage.getItem('access_token'),
    accesss_token: localStorage.getItem('access_token'),
    expires_at: localStorage.getItem('expires_at'),
    id_token: localStorage.getItem('id_token'),
    scope: '',
    user: JSON.parse(localStorage.getItem('user')),
    applications: []
  },
  getters: {
    isAuthed: state => state.authenticated && (new Date().getTime() < state.expires_at)
  },
  mutations: {
    setAccessToken (state, token) {
      state.accesss_token = token
      localStorage.setItem('access_token', token)
    },
    setExpiration (state, expiration) {
      const expiresAt = JSON.stringify(expiration * 1000 + new Date().getTime())
      state.expires_at = expiresAt
      localStorage.setItem('expires_at', expiresAt)
    },
    setIdToken (state, idToken) {
      state.id_token = idToken
      localStorage.setItem('id_token', idToken)
    },
    setScope (state, scope) {
      state.scope = scope
    },
    setLoggedIn (state) {
      state.authenticated = true
    },
    setLoggedOut (state) {
      state.authenticated = false
      state.accesss_token = null
      state.id_token = null
      state.applications = []
      state.user = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('id_token')
      localStorage.removeItem('expires_at')
      localStorage.removeItem('user')
    },
    setUser (state, user) {
      state.user = {
        id: user.sub,
        nickname: user.nickname,
        name: user.name,
        picture: user.picture,
        email: user.picture
      }
      localStorage.setItem('user', JSON.stringify(user))
    },
    setApplications (state, applications) {
      state.applications = applications
    }
  },
  actions: {
    login () {
      authService.login()
    },
    logout ({ commit }) {
      commit('setLoggedOut')
    },
    handleAuth ({ commit, state }) {
      authService.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          const { accessToken, idToken, expiresIn, scope } = authResult
          const user = decode(idToken)
          commit('setAccessToken', accessToken)
          commit('setExpiration', expiresIn)
          commit('setIdToken', idToken)
          commit('setUser', user)
          commit('setScope', scope)
          commit('setLoggedIn')
        } else if (err) {
          console.log(err)
        }
      })
    },
    fetchApplications ({ commit, state }) {
      return axios.get('http://localhost:3000/api/v1/applications', {
        headers: {
          'Authorization': `Bearer ${state.accesss_token}`
        }
      })
        .then(result => {
          commit('setApplications', result.data.data)
        })
        .catch(console.error)
    }
  }
})
