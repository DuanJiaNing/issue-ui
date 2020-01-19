<template>
	<view>
		<text>host: {{host}}</text>
		
		<br>
		<text>{{status}}</text>
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
				status: status,
				host: ApiService.host
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
