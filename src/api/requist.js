import Vue from 'vue'

export function postLogin (email, password, rememberMe) {
  return Vue.prototype.$axios.post('/login', {
    email: email,
    password: password,
    rememberMe: rememberMe
  })
}

export function postRegister (email, username, password) {
  return Vue.prototype.$axios.post('/register', {
    email: email,
    username: username,
    password: password,
  })
}