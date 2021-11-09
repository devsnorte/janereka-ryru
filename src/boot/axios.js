import Vue from 'vue'
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://ryru.janeraka.org/bbx/acervo-janeraka-ryru_SKARB/janeraka-nyc1_WNLjm',
  headers: {
    common: {
      token: null
    }
  }
})

Vue.prototype.$axios = axiosInstance
