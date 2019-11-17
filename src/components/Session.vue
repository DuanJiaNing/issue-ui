<template>
    <div id="session">
        add comment here<br>
        <input type="text"
               placeholder="评论"
               @keyup.enter="addComment">
        <hr>
        <label v-for="(comment,index) in commentList"
               :key="comment+index">
            {{index+1}} : {{comment.content}}<br>
        </label>
    </div>
</template>

<script>
export default {
  name: 'Session',
  data () {
    return {
      commentList: []
    }
  },
  props: [
    'id' // topicId
  ],
  created () {
    this.loadComments()
  },
  methods: {
    addComment: function (e) {
      let content = e.target.value.trim()
      this.axios.post(`/api/comment?content=${content}&topicId=${this.id}`).then((response) => {
        this.loadComments()
        e.target.value = ''
      }).catch(function (error) {
        console.log(error)
      })
    },
    loadComments: function () {
      let topicId = this.id
      this.axios.get(`/api/topic/${topicId}/comments`).then((response) => {
        this.commentList = response.data.data.list
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
