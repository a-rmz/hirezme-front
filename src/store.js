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
    applications: [],
    companies: []
  },
  getters: {
    isAuthed: state => state.authenticated && (new Date().getTime() < state.expires_at),
    applicationCount: state => state.applications.length,
    companyCount: state => state.companies.length
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
      const id = user.sub.split('|').slice(-1).join('')
      state.user = {
        id,
        nickname: user.nickname,
        name: user.name,
        picture: user.picture,
        email: user.picture
      }
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    setApplications (state, applications) {
      state.applications = applications
    },
    addApplication (state, application) {
      state.applications.push(application)
    },
    removeApplication (state, applicationId) {
      state.applications = state.applications.filter(a => a.id !== applicationId)
    },
    setCompanies (state, companies) {
      state.companies = companies
    },
    addCompany (state, company) {
      state.companies.push(company)
    },
    removeCompany (state, companyId) {
      state.companies = state.companies.filter(a => a.id !== companyId)
    }
  },
  actions: {
    login () {
      authService.login()
    },
    logout ({ commit }) {
      commit('setLoggedOut')
    },
    handleAuth ({ commit }) {
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
    },
    submitApplication ({ commit, state }, application) {
      return axios.post('http://localhost:3000/api/v1/applications', application, {
        headers: {
          'Authorization': `Bearer ${state.accesss_token}`
        }
      })
        .then(newApplication => commit('addApplication', newApplication.data))
    },
    removeApplication ({ commit, state }, applicationId) {
      return axios.delete(`http://localhost:3000/api/v1/applications/${applicationId}`, {
        headers: {
          'Authorization': `Bearer ${state.accesss_token}`
        }
      })
        .then(() => commit('removeApplication', applicationId))
    },
    fetchCompanies ({ commit, state }) {
      return axios.get('http://localhost:3000/api/v1/companies', {
        headers: {
          'Authorization': `Bearer ${state.accesss_token}`
        }
      })
        .then(result => {
          commit('setCompanies', result.data.data)
        })
        .catch(console.error)
    },
    submitCompany ({ commit, state }, company) {
      return axios.post('http://localhost:3000/api/v1/companies', company, {
        headers: {
          'Authorization': `Bearer ${state.accesss_token}`
        }
      })
        .then(newCompany => commit('addCompany', newCompany.data))
    },
    initData ({ dispatch, state }) {
      if (state.isAuthed) {
        if (state.applicationCount === 0) {
          dispatch('fetchApplications')
        }
        if (state.companyCount === 0) {
          dispatch('fetchCompanies')
        }
      }
    }
  }
})
