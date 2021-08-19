import { axiosInstance as axios } from 'src/boot/axios'
import { sessionState as state } from 'src/store/session'

// function Session (state) {
//   this.state = state
// }

export const Session = (function () {
  function SessionManager () {
    this.getCurrentSession = () => {
      return {
        user: state.user
      }
    }

    this.setSessionState = (user, token) => {
      state.user = user || (state.user = null)
      state.token = token || (state.token = null)
    }

    this.login = async (username, password) => {
      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)
      try {
        const { data } = await axios({
          method: 'post',
          url: '/auth',
          data: formData
        })

        axios.defaults.headers.common = { token: data }
        this.setSessionState(username, { token: data })

        return { success: true }
      } catch (error) {
        return { error, success: false }
      }
    }

    this.logout = async () => {
      axios.defaults.headers.common = { token: null }
      this.setSessionState(null, null)
    }
  }

  let sManager

  function createSessionManager () {
    sManager = new SessionManager()
    return sManager
  }

  return {
    getSessionManager: () => {
      return sManager || createSessionManager()
    }
  }
})()
