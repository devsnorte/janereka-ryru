import Vue from 'vue'
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://mucuas.mercadosul.org:8067/rede-mocambos-acervo_65RTX/janeraka_Kdagv',
  headers: {
    common: {
      token: null
    }
  }
})

Vue.prototype.$axios = axiosInstance
