<template>
	<view id="search">
		<input type="text" :value="keyWord" class="uni-input" focus placeholder="搜索" confirm-type="search" @confirm="doSearch"/>
	</view>
</template>

<script>
	import {status} from '@/service/StatusService.js'
	
	export default {
		data() {
			return {
				keyWord: status.search.keyWord
			}
		},
		methods: {
			doSearch(e) {
				var oldkw = status.search.keyWord
				let content = e.target.value.trim()
				status.search.keyWord = content
				status.search.refresh = oldkw != content
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
	#search {
		
	}

</style>
