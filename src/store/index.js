import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
const store = createStore({
  state() {
    return {
      userInfo: null,
      currentPath: ''
    }
  },
  mutations: {
    updateCurrentPath(state, payload) {
      state.currentPath = payload
    },
    updateUserInfo(state, payload) {
      state.userInfo = payload
    }
  },
  plugins: [
    createPersistedState({
      // 设置持久化的数据
      reducer: (state) => {
        return {
          userInfo: state.userInfo,
          currentPath: state.currentPath
        }
      }
    })
  ]
})

export default store
