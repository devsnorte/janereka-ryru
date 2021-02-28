import Vue from 'vue'
import axios from 'axios'

const axiosConfig = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://baobaxia.mocambos.net/api/mocambos/rede/bbx/search'
})

Vue.prototype.$axios = axiosConfig
