<template>
	<view>
		<text>host: {{host}}</text>
		
		<br>
		<text>{{statusStr}}</text>
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
