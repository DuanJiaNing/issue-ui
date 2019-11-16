<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
<!--    <router-view/>-->
      topic list below:<br><br>
      <input type="text"
             placeholder="添加主题"
             @keyup.enter="addTopic">
      <hr>
      <label v-for="(topic,index) in topicList"
             :key="topic+index">
          {{index+1}} : {{topic.title}}<br>
      </label>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.loadTopics()
  },
  data () {
    return {
      topicList: []
    }
  },
  methods: {
    addTopic: function (e) {
      this.axios.post('/api/topic?title=' + e.target.value.trim()).then((response) => {
        this.loadTopics()
        e.target.value = ''
      }).catch(function (error) {
        console.log(error)
      })
    },
    loadTopics: function () {
      this.axios.get('/api/topic/list').then((response) => {
        this.topicList = response.data.data.list
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
