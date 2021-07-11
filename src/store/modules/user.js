const state = {
  currentSongUrl: '',
  recommendCurrentIndex: 0, // 推荐歌单索引
  newMusicCurrentIndex: 0, // 最新音乐索引
  newMVCurrentIndex: 0, // 推荐音乐 --> 最新MV索引
  likesList: [], // 我喜欢的音乐
  playerHistory: [], // 最近播放
  mvUrl: '',
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
  },
  // 添加我喜欢
  addLikesList(state, params) {
    state.likesList.unshift(params)
  },
  // 删除当前我喜欢
  deleteLikesList(state, params) {
    state.likesList.forEach((item, index) => {
      if (item.id === params) {
        state.likesList.splice(index, 1)
        state.playerHistory.forEach(playerHistoryItem => {
          if (playerHistoryItem.id === item.id) playerHistoryItem.isLike = false
        })
      }
    })
  },
  // 清空我喜欢
  clearLikesList(state) {
    state.likesList = []
  },
  // 添加最近播放
  addPlayerHistory(state, params) {
    if (state.playerHistory.length < 1) return state.playerHistory.unshift(params)
    state.playerHistory.forEach((item, index) => {
      if (item.id === params.id) state.playerHistory.splice(index, 1)
    })
    state.playerHistory.unshift(params)

  },
  // 清空最近播放
  clearPlayerHistory(state) {
    state.playerHistory = []
  },
  getMvUrl(state, params) {
    state.mvUrl = params
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