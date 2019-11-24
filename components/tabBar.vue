<template>
	<view class='tap-bar' :style="{'background-color': appThem.color.background.content}">
		<view class='tap-bar-content'>
			<view class='home' @click="switchTab('home')">
				<uni-icons type="home" size="30" :color="tab === 'home' ? them.color.primary : 'gray'"></uni-icons>
			</view>
			<navigator class="add" url="/pages/add/add" hover-class="add-hover" :style="{'background-image': 'linear-gradient('+them.color.primary+', '+them.color.secondary+')'}">
				<uni-icons type="plusempty" size="30" color="white"></uni-icons>
			</navigator>
			<view class='me' @click="switchTab('me')">
				<uni-icons type="person" size="30" :color="tab === 'me' ? them.color.primary : 'gray'"></uni-icons>
			</view>
		</view>
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
		height: 50px;
	}

	.tap-bar-content {
		height: 100%;
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
		margin-top: -20px;
		height: 55px;
		width: 55px;
		border-radius: 50%;
		box-shadow: 0px 0px 10px #8D8D8D;
	}

	.add-hover {
		box-shadow: 0px 0px 20px #8D8D8D;
	}
</style>
