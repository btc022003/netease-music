<template>
  <div class="music">
    <div class="field is-grouped">
      <p class="control is-expanded">
        <input class="input" v-model="keyWord" @keyup.enter="search" type="text" placeholder="输入查询关键字">
      </p>
      <p class="control">
        <button class="button is-danger medium" @click="search">查询</button>
      </p>
    </div>
    <hr>
    <div class="box music-box">
      <h5 v-show="music.name!=''?true:false">正在播放-
        <<{{music.name}}>></h5>
        <div class="field is-grouped">
          <p class="control">
            <i class="button is-small is-warning fa" :class="isPlaying?'fa-stop':'fa-play'" @click="dalAudio"></i>
          </p>
           <p class="control is-expanded">
            <progress class="progress is-success" :value="pCurrentTime" :max="pDuration"></progress>
          </p>
        </div>
      <audio ref="audio" :src="music.url" controls autoplay></audio>
    </div>
    <div class="columns is-mobile">
      <div class="column is-4 box list">
        <div class="tile is-ancestor is-vertical">
          <div :class="music==song?'is-danger':''" :ref='"ink-"+index' class="button tile" v-for="(song,index) in album" @click="changeSong(song,index)">
            <i v-if="music==song" class="fa fa-music is-left"></i>{{song.name}}</div>
        </div>
      </div>
      <div class="column is-gapless is-8 list">
        <!-- <div class="tile is-ancestor is-parent"> -->
        <div class="column is-3 box album" v-for="album in this.$store.state.music.albums" @click="selAlbum(album)">
          <img :src="album.pic" class="image is-128x128" alt="">
          <label class="title is-5">{{album.title}}</label>
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import ApiMusic from '../services/music_api'

export default {
  data: function () {
    return {
      music: { name: '暂无', url: '' },
      album: [],
      keyWord: '',
      audio: {currentTime:0,duration:0},
      pCurrentTime:0, //当前播放时间
      pDuration:0,//总长度
      isPlaying:false//是否正在播放
    }
  },
  methods: {
    search() {
      this.$store.dispatch('getSongs', this.keyWord)
    },
    //选择歌曲改变
    changeSong(song,i) {
      // console.log(this.$refs)
      // this.$refs["ink-"+i][0].classList.add('is-warning')
      this.music = song
    },
    selAlbum(album) {
      this.$store.dispatch('selectAlbum', album.a_id)
      this.album = this.$store.state.music.album.songs
    },
    playing(){
      // console.log('playing...')
      // console.log(this.audio.duration)
      // console.log(this.audio.currentTime)
      this.pCurrentTime = this.audio.currentTime
      this.pDuration = this.audio.duration
      requestAnimationFrame(this.playing)
    },
    dalAudio(){
      // console.dir(this.audio)
      if(this.isPlaying){
        this.audio.pause()
        this.isPlaying = !this.isPlaying
      }
      else{
        this.audio.play()
        this.isPlaying = !this.isPlaying
      }
    }
    // play(){//开始播放
    //   this.$refs.audio.play()
    // },
    // stop(){//停止播放
    //   this.$refs.audio.pause()
    // }
  },
  created() {
    requestAnimationFrame(this.playing)
    this.$store.dispatch('getSongs','咖喱咖喱')
  },
  mounted() {
    this.audio = this.$refs.audio
  },
  watch:{
    pDuration:function(){//监听音乐时间的改变 从而判断是否已经开始播放
      if(isNaN(this.pDuration) == false){
        // console.log(this.pDuration)
        // console.log('播放中...')
        this.isPlaying = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list {
  height: 500px;
  overflow: scroll;
}

.music {
  padding: 15px;
}

/*.music-box {
  min-height: 130px;
}*/

audio {
  width: 100%;
  height: 60px;
  display: none;
}

.album {
  display: inline-table;
  text-align: center;
  min-height: 200px;
  min-width: 220px;
}

.album img {
  margin: 0 auto;
}
.progress{
  height: 100%;
}
</style>
