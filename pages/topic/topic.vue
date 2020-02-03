<template>
	<view style="color: #ffffff;">
		topic: {{status.currentTopicId}}
	</view>
</template>

<script>
	import toolsService from '@/service/ToolsService.js'
	import {
		status
	} from '@/service/StatusService.js'
	export default {
		data() {
			return {
				status: status
			}
		},
		methods: {
			
		},
		onShow() {
			console.log(this.status)
		}
	}
</script>

<style>

</style>
