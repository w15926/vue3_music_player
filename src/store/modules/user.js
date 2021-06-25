const state = {
  currentSongUrl: '',
  recommendCurrentIndex: 0, // 推荐歌单索引
  newMusicCurrentIndex: 0, // 最新音乐索引
  newMVCurrentIndex: 0, // 推荐音乐 --> 最新MV索引
}

const mutations = {
  newCurrentSongUrl(state, params) {
    state.currentSongUrl = params
  },
  changeRecommendCurrentIndex(state, params) {
    state.recommendCurrentIndex = params
  },
  changeNewMusicCurrentIndex(state, params) {
    state.newMusicCurrentIndex = params
  },
  changeNewMVCurrentIndex(state, params) {
    state.newMVCurrentIndex = params
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