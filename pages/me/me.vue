<template>
	<view>
		<text style="color: #ffffff;">host: {{host}}</text>
		
		<br>
		<text style="color: #ffffff;">{{statusStr}}</text>
	</view>
</template>

<script>
	import ApiService from '@/service/ApiService.js'
	import {
		status
	} from '@/service/StatusService.js'
	
	export default {
		data() {
			return {
				host: ApiService.host
			}
		},
		computed: {
			statusStr() {
				return JSON.stringify(status)
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
