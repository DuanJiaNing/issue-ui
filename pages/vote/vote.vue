<template>
	<view>
		<limited-text-textarea style="margin-top: 30upx;" @valueChanged="topicDesChanged" :config="topicDesConfig"></limited-text-textarea>
		<view class="btn-container content">
			<view>
				<button @click="addTopic" class="save-btn colorful-stripe" size="mini" hover-class="save-btn-hover">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	import limitedTextTextarea from '@/components/limited-text-input/limited-text-textarea.vue'

	import {
		api,
		request
	} from '@/service/ApiService.js'
	export default {
		components: {
			limitedTextTextarea
		},
		data() {
			return {
				voteComment: '',
				topicDesConfig: {
					maxlength: 100,
					placeholder: "请输入投票说明"
				}
			}
		},
		methods: {
			addTopic() {
				
			},
			topicDesChanged: function(val) {
				this.voteComment = val
				console.log(val)
			}
		}
	}
</script>

<style>
	.btn-container {
		margin-top: 30upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}

	.save-btn {
		color: #ffffff;
	}

	.save-btn-hover {
		opacity: 0.5;
	}
</style>
