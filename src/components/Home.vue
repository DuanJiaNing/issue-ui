<template>
    <div id="home">
        topic list below:<br><br>
        <input type="text"
               placeholder="添加主题"
               @keyup.enter="addTopic">
        <hr>
        <label v-for="(topic,index) in topicList"
               :key="topic+index"
               @click="entrySession(topic.id)">
            {{index+1}} : {{topic.title}}<br>
        </label>
    </div>
</template>

<script>
export default {
  name: 'Home',
  created () {
    this.loadTopics()
  },
  data () {
    return {
      topicList: []
    }
  },
  methods: {
    entrySession: function (sessionId) {
      this.$router.push({
        path: `/session/${sessionId}`
      })
    },
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

<style scoped>

</style>
