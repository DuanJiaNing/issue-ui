<template>
	<view class='tap-bar' :style="{'background-color': appThem.color.background.content}">
		<view class='tap-bar-content'>
			<view class='home' @click="switchTab('home')">
				<uni-icons type="home" size="35" :color="tab === 'home' ? them.color.primary : 'gray'"></uni-icons>
			</view>
			<navigator class="add" url="/pages/add/add" hover-class="add-hover" :style="{'background-color': them.color.primary}">
				<uni-icons type="plusempty" size="34" color="white"></uni-icons>
			</navigator>
			<view class='me' @click="switchTab('me')">
				<uni-icons type="person" size="35" :color="tab === 'me' ? them.color.primary : 'gray'"></uni-icons>
			</view>
		</view>
		<view :style="{height: iphoneXSafeAreaHeight}"></view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import config from '../config.js'

	export default {
		components: {
			uniIcons
		},
		computed: {
			appThem() {
				return config.appThem()
			},
			iphoneXSafeAreaHeight() {
				let sinfo
				uni.getSystemInfo({
					success: function(res) {
						sinfo = res
					}
				})

				console.log(sinfo.model)
				if (sinfo.model.startsWith('iPhone X')) {
					return '35px'
				}

				return '0px'
			}
		},
		name: "tab-bar",
		props: {
			them: {
				type: Object,
				required: true
			},
			tab: {
				type: String,
				required: true
			}
		},
		methods: {
			switchTab(tab) {
				this.$emit('switchTab', tab)
			}
		}
	}
</script>

<style scoped>
	.tap-bar {
		position: fixed;
		bottom: 0px;
		width: 100%;
		/* opacity: 0.9; */
		box-shadow: 0px 15px 30px #4B4B4B;
	}

	.tap-bar-content {
		height: 50px;
		display: flex;
		flex-direction: row;
		align-items: center;
		text-align: center;
	}

	.home {
		flex: 1;
	}

	.me {
		flex: 1;
	}

	.add {
		margin-top: -25px;
		height: 65px;
		width: 65px;
		border-radius: 50%;
		box-shadow: 0px 0px 10px #8D8D8D;
	}

	.add-hover {
		box-shadow: 0px 0px 20px #8D8D8D;
	}
</style>
