<template>
	<view class='tap-bar'>
		<view class='row'>
			<navigator class='col tab'>
				<image src="https://img.icons8.com/windows/100/000000/dog-house.png"></image>
			</navigator>
			<view class='col tab'>
				<navigator class="add">
					<text>十</text>
				</navigator>
			</view>
			<navigator class='col tab'>
				<image src="https://img.icons8.com/windows/96/000000/user.png"></image>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tab-bar"
	}
</script>

<style scoped>
	.tap-bar {
		position: fixed;
		bottom: 0px;
		width: 100%;
		text-align: center;
		background-color: whitesmoke;
		box-shadow: 0px 0px 20px lightgray;
		height: 50px;
		/* border-radius: 5%; */
	}

	.row {
		display: flex;
		flex-wrap: wrap;
	}

	.col {
		flex-basis: 0;
		flex-grow: 1;
		max-width: 100%;
	}

	.add {
		position: relative;
		top: -20px;
		background-color: #1aad19;
		box-sizing: border-box;
		height: 55px;
		width: 55px;
		margin: 0px auto;
		border-radius: 50%;
		z-index: 10;
	}
	
	.add text{
		position: relative;
		color: white;
		top: 20px;
		font-size: 18px;
	}
	
	.tab image {
		width: 40px;
		height: 40px;
	}

	.tab {
		color: #999;
		line-height: 100%;
		padding-top: 7px;
	}
</style>
