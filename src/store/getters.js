const getters = {
  currentSongUrl: state => state.user.currentSongUrl,
  recommendCurrentIndex: state => state.user.recommendCurrentIndex,
  newMusicCurrentIndex: state => state.user.newMusicCurrentIndex,
  newMVCurrentIndex: state => state.user.newMVCurrentIndex,
  likesList: state => state.user.likesList,
  playerHistory: state => state.user.playerHistory
}

export default getters
