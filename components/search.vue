<template>
	<view class="search">
		<view class="uni-flex uni-row search-content">
			<view class="content">
				<text>{{searchKeyWord}}</text>
			</view>
			<view class="content sort">
				<!-- <image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAB1klEQVRoge3Ty4oTQRQG4L+qJZAHEPEBRPARQnCmSVe1l0lwFWRgFuLC18jDiAtXLpwIbdIYLw0iouhiYGQWgogjJIqXDgSrjqtAM4xaXamgyPmW3edKVQGMMcYYY4wxxth/RbgGZlm2IaXcXucwR1lrb2mtJy6xJ1yLKqUejsfjHQDXvSer52ZRFI9cg6VroBCCZrPZDSHEbb+5arkTRdG1wWBgXROcFwGAfr9vptPpDoDd2qO5u79YLK7GcfyjTpLzG6kqiqJZluUugNgn/1eI6Im1Nk3T9Hvd3FonstRqtebz+XwLwGOf/OMQ0dNms3nRZwnAcxEA6Ha7JRFtAXjuW6PilTHmUrvd/upbwOtqVQ2Hw5ONRuMBgHOeJfajKNqI4/jDKnOsvAgAjEajUwAmAM7WTD2w1p7XWr9fdQbvq1WVJMmhMUYBeFsj7Z0xRoVYAgh0IktZlp2RUk4AnP5D6Eci2lRK7YXqHeRElrTWb4goBTD9TdhnIroQcgkg8CIAoJR6ba1NAHw65vcXAFop9SJ03+CLAIDW+iWAywC+VT6X1tpekiTP1tEz6Bs5KsuyjpTyLgAphLjS6XTurbPfWuV53svzvPe352CMMcYYY4z9c34CrRmVdUBpkqIAAAAASUVORK5CYII="></image> -->
				<text>o {{sortName}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "search",
		props: {
			sortName: {
				type: String,
				requied: true
			},
			searchKeyWord: {
				type: String,
				requied: true
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style>
	.search {}

	.search-content {
		background-color: lightgray;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		border-radius: 20upx;
	}

	.content {
		margin: 15upx 10upx;
		padding: 0 20upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		color: #777;
		font-size: 33upx;
	}

	.sort {
		font-size: 20upx;
	}

	.sort image {
		width: 30upx;
		height: 30upx;
	}
</style>
