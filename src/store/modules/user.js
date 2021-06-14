const state = {
  currentSongUrl: ''
}

const mutations = {
  newCurrentSongUrl(state, params) {
    state.currentSongUrl = params
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