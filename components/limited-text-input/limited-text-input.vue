<template>
	<view class="content limited-text-input-content">
		<input v-model="inputContent" :maxlength="config.maxlength" :placeholder="config.placeholder" />
		<view class="tip-container">
			<view>{{config.errorMsg}}</view>
			<view>{{currentLength}}/{{config.maxlength}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "limited-text-input",
		data() {
			return {
				inputContent: "",
				currentLength: 0,
			};
		},
		watch: {
			inputContent: function(val) {
				this.currentLength = val.length
				this.$emit('valueChanged',val)
			}
		},
		props: {
			config: {
				type: Object,
				required: false
			}
		},
	}
</script>

<style>
	
	input {
		width: 100%;
		padding-top: 20upx;
		padding-bottom: 20upx;
	}
	
	.tip-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		
		color: #999999;
		font-size: 18upx;
	}
	
	.limited-text-input-content {
		padding-top: 10upx;
		padding-bottom: 10upx;
		background-color: #ffffff;
	}
	
</style>
