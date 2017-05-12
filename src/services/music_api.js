/**
 * Created by yuluo on 2017/5/10.
 */
import axios from 'axios'

export default {
  getSongs(cb,keyWord){
    console.log(keyWord)
    axios.get('http://lixuanqi.com/api/v1/netease_music/get_songs',{params:{key_word:keyWord}})
      .then(res => {
        // console.dir(data)
        cb(res.data)
      })
  },
}
