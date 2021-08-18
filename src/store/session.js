import Vue from 'vue'

export const sessionState = Vue.observable({
  user: null,
  token: null
})
