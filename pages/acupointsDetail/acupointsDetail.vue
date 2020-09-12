<template>
	<view class="backgroundf8">
		<uni-nav-bar left-icon="back" :title="title" :shadow=true @clickLeft='goback' status-bar=true></uni-nav-bar>
		<view class="main">
			<view class="contentbox">
				<view class="bar flex">
					<view class="flex">
						<view class="line"></view>
						<view class="title">简介</view>
					</view>
				</view>
			</view>
			<view class="page">
				<!-- <video class="video" id="demoVideo" danmu-btn :muted=true controls @play='Play' src="https://vd4.bdstatic.com/mda-kff646vmewbr5q55/mda-kff646vmewbr5q55.mp4?auth_key=1599819333-0-0-7df7eb3e3a67d2808791da9af13f44a3&bcevod_channel=searchbox_feed&pd=1&pt=3">
				</video> -->
				<video class="video"
				 	id="demoVideo"
				  	:controls="true"  
				   	src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126-lite.m4v">
				</video>

			</view>
			<view class="footer">
				<view class="btno flex-c" @tap="goIndex">
					<image src="../../static/home.png" mode=""></image>
					<text>首页</text>
				</view>
				<view class="btnb flex-c">
					<image src="../../static/share.png" mode=""></image>
					<text>转发</text>
				</view>
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		margin: 30upx;
		.page video{
			width: 690upx;
			height: 320upx;
			border-radius: 6upx;
		}
	}
</style>
