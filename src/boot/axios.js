import Vue from 'vue'
import axios from 'axios'

const axiosConfig = axios.create({
  baseURL: 'http://mucuas.taina.net.br:8067'
})

Vue.prototype.$axios = axiosConfig
