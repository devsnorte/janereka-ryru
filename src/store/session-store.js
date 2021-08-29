import Vue from 'vue'

const sessionState = Vue.observable({
  user: '',
  token: ''
})

const getters = {
  user: () => sessionState.user,
  token: () => sessionState.token
}

const mutations = {
  setUser: (user) => {
    sessionState.user = user
  },
  setToken: (token) => {
    sessionState.token = token
  }
}

export { getters, mutations }
