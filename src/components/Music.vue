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
      <audio ref="audio" :src="music.url" controls autoplay></audio>
    </div>
    <div class="columns is-mobile">
      <div class="column is-4 box list">
        <div class="tile is-ancestor is-vertical">
          <div :class="music==song?'is-danger':''" class="button tile" v-for="song in album" @click="changeSong(song)">
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
      music: { name: '', url: ''},
      album: [],
      keyWord: '',
      // audio:{}
    }
  },
  methods: {
    search() {
      this.$store.dispatch('getSongs', this.keyWord)
    },
    //选择歌曲改变
    changeSong(song) {
      this.music = song
    },
    selAlbum(album) {
      this.$store.dispatch('selectAlbum', album.a_id)
      this.album = this.$store.state.music.album.songs
    },
    // play(){//开始播放
    //   this.$refs.audio.play()
    // },
    // stop(){//停止播放
    //   this.$refs.audio.pause()
    // }
  },
  created() {
    this.$store.dispatch('getSongs')
  },
  mounted(){
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
.music-box{
  min-height: 130px;
}
audio {
  width: 100%;
  height: 60px;
  /*display: none;*/
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
</style>
