const state = {
  currentSongUrl: '',
  currentIndex: 0
}

const mutations = {
  newCurrentSongUrl(state, params) {
    state.currentSongUrl = params
  },
  changeCurrentIndex(state, params) {
    state.currentIndex = params
  }
}

const actions = {

}

export default {
  namespaced: true, // 解决命名冲突
  state,
  mutations,
  actions
}