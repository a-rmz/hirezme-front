import auth0 from 'auth0-js'
import AUTH_CONFIG from './auth0-variables'

export default class AuthService {
  constructor () {
    this.login = this.login.bind(this)
  }

  auth0 = new auth0.WebAuth(AUTH_CONFIG);

  login () {
    this.auth0.authorize()
  }
}
