import Vue from 'vue'
import axios from 'axios'

const axiosConfig = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/http://mucuas.taina.net.br:8067'
})

Vue.prototype.$axios = axiosConfig
