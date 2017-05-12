/**
 * Created by yuluo on 2017/5/10.
 */
import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex'
import music from './modules/music'
Vue.use(Vuex)
export default new Vuex.Store({
  modules:{
    music
  }
})
