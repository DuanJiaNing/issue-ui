<template>
	<view class="limited-text-input-content">
		<view class="input-container" :style="{'border-bottom-color': them.sperLine}">
			<input :placeholder-style="{color: them.secondaryText}" :style="{color: them.primaryText}" v-model="inputContent"
			 :maxlength="config.maxlength" :placeholder="config.placeholder" />
		</view>
		<view :style="{color: them.secondaryText}" class="tip-container">
			<view>{{config.errorMsg}}</view>
			<view>{{currentLength}}/{{config.maxlength}}</view>
		</view>
	</view>
</template>

<script>
	import {
		them
	} from '@/service/ThemService.js'
	export default {
		name: "limited-text-input",
		data() {
			return {
				them: them(),
				inputContent: "",
				currentLength: 0,
			};
		},
		watch: {
			inputContent: function(val) {
				this.currentLength = val.length
				this.$emit('valueChanged', val)
			}
		},
		props: {
			config: {
				type: Object,
				required: false
			}
		},
		methods: {
			clearValue() {
				this.inputContent = ''
			}
		}
	}
</script>

<style>
	input {
		width: 100%;
		padding-top: 5upx;
		padding-bottom: 5upx;
	}

	.tip-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		font-size: 18upx;
	}
	
	.input-container {
		border-bottom: solid 1px;
	}

	.limited-text-input-content {
		/* background-color: #007AFF; */
	}
</style>
