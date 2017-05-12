/**
 * Created by yuluo on 2017/5/10.
 */
import Api from '../../services/music_api'
const state = {
  albums: [],//专辑列表
  album: {},//当前播放的专辑
  music: {}//当前播放的曲目
}

/**
 * 外部调用actions
 * 在actions中触发事件调用mutations中的方法修改state的状态
 */
const actions = {
  /**
   * 获取所有歌曲数据
   */
  getSongs({state,commit},keyWord){
    Api.getSongs(function (data) {
      commit('GET_MUSIC_END', data)
    },keyWord)
  },
  /**
   * 选择专辑
   * @param state
   * @param id
   */
  selectAlbum({state},id){
    state.album = state.albums.find(item=>item.a_id ==id)
  },
  /**
   * 选择歌曲
   * @param state
   * @param name
   */
  selSong({state},name){
    state.music = state.album.find(item=>{item.name == name})
  }
}

const getters = {}

const mutations = {
  ['GET_MUSIC_END'](state, data){
    state.albums = data
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
