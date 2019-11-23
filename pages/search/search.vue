<template>
	<view id="search">
		<input type="text" class="uni-input" focus placeholder="搜索" confirm-type="search" @confirm="doSearch"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			doSearch(e) {
				let content = e.target.value.trim()
				uni.reLaunch({
					// TODO 其他状态恢复
					url: `/pages/index/index?searchKeyWord=${content}`
				});
			}
		}
	}
</script>

<style>
	#search {
		
	}

</style>
