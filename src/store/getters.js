const getters = {
  currentSongUrl: state => state.user.currentSongUrl,
  recommendCurrentIndex: state => state.user.recommendCurrentIndex,
  newMusicCurrentIndex: state => state.user.newMusicCurrentIndex
}

export default getters
