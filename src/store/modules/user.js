import { login } from '@/api/user'
import { setToken, getToken, delToken } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      token: getToken() || ''
    }
  },
  mutations: {
    setUserToken (state, newToken) {
      state.token = newToken
      setToken(newToken)
    },
    logout (state) {
      state.token = ''
      delToken()
    }
  },
  actions: {
    async loginAction (context, obj) {
      const res = await login(obj)
      context.commit('setUserToken', res.data.token)
    }
  }
}
