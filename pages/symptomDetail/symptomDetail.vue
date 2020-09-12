<template>
	<view class="backgroundf8">
		<uni-nav-bar left-icon="back" :title="title" shadow=true @clickLeft='goback' status-bar=true></uni-nav-bar>
		<view class="main">
			<view class="contentbox">
				<view class="bar flex">
					<view class="flex">
						<view class="line"></view>
						<view class="title">简介</view>
					</view>
				</view>
			</view>
			<view class="footer">
				<view class="btno flex-c" @tap="goIndex">
					<image src="../../static/home.png" mode=""></image>
					<text>首页</text>
				</view>
				<button class="fx btnb flex-c" data-name="shareBtn" open-type="share">
					<image src="../../static/share.png" mode=""></image>
					<text>转发</text>
				</button>

			</view>
		</view>
		
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				title: ''
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			this.title = option.title
		},
		methods: {
			goback() {
				uni.navigateBack({
					delta: 1
				}); //返回上一层路由
			},
			goIndex(){
				uni.navigateTo({
					url:'../index/index'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.main {
		margin: 30upx;
	}
</style>
