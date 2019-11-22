<template>
	<view class="content">
		<view class='tap-bar'>
			<view class='row'>
				<navigator class='col tab'>
					<image src="https://img.icons8.com/windows/100/000000/dog-house.png"></image>
				</navigator>
				<view class='col tab'>
					<navigator class="add">
					</navigator>
				</view>
				<view class='col tab'>
					<image src="https://img.icons8.com/windows/96/000000/user.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	@import url("../../static/css/tab-bar.css");
</style>
