import Vue from 'vue'

const sessionState = Vue.observable({
  user: '',
  roles: [],
  token: ''
})

const getters = {
  user: () => sessionState.user,
  roles: () => sessionState.roles,
  token: () => sessionState.token,
  session: () => sessionState
}

const mutations = {
  setUser: (user) => {
    sessionState.user = user
  },
  setRole: (roles) => {
    sessionState.roles = roles
  },
  setToken: (token) => {
    sessionState.token = token
  }
}

export { getters, mutations }
