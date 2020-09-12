<template>
	<view class="casedetail">
		<view class="status_bar">
			
		</view>
		<uni-nav-bar left-icon="back" :title="title" shadow=true @clickLeft='goback' status-bar=true></uni-nav-bar>
		<view class="main">
			<view class="box">
				<view class="title">{{title}}</view>
				<view class="tag">热门</view>
			</view>
			<view class="intro">心悸、出汗、进食和便次增多和体重减少,多数患者还常 同时有突眼、眼睑水肿、视力减退等症状。</view>
			<text class="time">发布时间：2020/09/08 15:30</text>
			<image src="../../static/index/banner.png"></image>
			<view class="contentbox">
				<view class="bar flex">
					<view class="flex">
						<view class="line"></view>
						<view class="title">调养</view>
					</view>

				</view>
			</view>
			<view class="footer">
				<view class="btno flex-c" @tap='goIndex'>
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
				});  //返回上一层路由
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

		.title {
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
		}

		.box {
			display: flex;
			align-items: center;
			margin-bottom: 33upx;
		}

		.tag {
			width: 56upx;
			height: 30upx;
			background: #FD9558;
			border-radius: 2px;
			font-size: 20upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 30upx;
			text-align: center;
			margin-left: 7upx;
		}

		.intro {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 52upx;
		}

		.time {
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
			line-height: 56upx;
		}

		image {
			width: 690upx;
			height: 320upx;
			background: #000000;
			border-radius: 6upx;
			margin-top: 29upx;
		}
	}
	.status_bar {
	     height: var(--status-bar-height);
	     width: 100%;
	 }
</style>
