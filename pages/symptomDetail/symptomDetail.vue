<template>
	<view class="backgroundf8">
		<uni-nav-bar left-icon="back" :title="illDetail.ill_name" shadow=true @clickLeft='goback' status-bar=true fixed=true></uni-nav-bar>
		<view class="main">
			<view class="contentbox">
				<view class="bar flex">
					<view class="flex">
						<view class="line"></view>
						<view class="title">简介</view>
					</view>
				</view>
				<view v-html="illDetail.description" class="styleinfo">
				</view>
			</view>
			<view class="contentbox">
				<view class="bar flex">
					<view class="flex">
						<view class="line"></view>
						<view class="title">调养</view>
					</view>
				</view>
				<view v-html="illDetail.care_info" class="styleinfo">
				</view>
				
			</view>
			<view class="contentbox">
				<view class="bar flex">
					<view class="flex">
						<view class="line"></view>
						<view class="title">养生小贴士</view>
					</view>
				</view>
				<view v-html="illDetail.tips" class="styleinfo">
				</view>
			</view>
			<view class="page" v-for="(item,k) in illDetail.video" :key="k">
				<video class="video" id="demoVideo" :controls="true" :src="item">
				</video>
						
			</view>
			<view class="contentbox">
				<view class="bar flex">
					<view class="flex">
						<view class="line"></view>
						<view class="title">调理穴位 &nbsp;（点击穴位图片查看详细视频）</view>
					</view>
				</view>
				<view class="" v-for="(item,k) in illDetail.acu" @tap="goacupoints(item)">
					<image :src="item.sub.head_pic" style="width: 100%;" mode="widthFix"></image>
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
				illDetail: {}
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
		let loging=uni.getStorageSync('isCanUse')
		
		if(!loging){
			uni.navigateTo({
				url: '../login/login'
			});
		}
			console.log(option); //打印出上个页面传递的参数。
			wx.showShareMenu({//分享给好友
				withShareTicket: true
			});
			uni.showLoading({
			    title: '加载中'
			});
			uni.request({
				url: 'https://www.hlb918.com/mobile/IndexInfo/ill_detail',
				header: {
					"X-Requested-With": "XMLhttpsRequest"
				},
				data: {
					ill_id: option.id,
				},
				method: 'POST',
				success: (res) => {
					uni.hideLoading();
					this.illDetail = res.data.data
					console.log(this.illDetail)
					}
			});
		},
		methods: {
			goback() {
				uni.navigateBack({
					delta: 1
				}); //返回上一层路由
			},
			goIndex() {
				uni.navigateTo({
					url: '../index/index'
				})
			},
			onShareAppMessage: function(e) {
				return {
					title: this.illDetail.ill_name,
					path: `pages/symptomDetail/symptomDetail?id=${this.illDetail.id}`,
					success: function(res) { // 分享成功之后的操作
						console.log("分享成功:" + JSON.stringify(res));
					},
					fail: function(res) { // 分享失败之后的操作
						console.log("分享失败:" + JSON.stringify(res));
					}
				}
			},
			goacupoints(c){
				uni.navigateTo({
					url:`../acupointsDetail/acupointsDetail?title=${c.sub.id}`
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.page video {
		width: 690upx;
		height: 320upx;
		border-radius: 6upx;
		margin: 0 30rpx;

	}
	.main {
		margin-bottom: 120upx;
		
		.styleinfo {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 52upx;
			image{
				max-width: 100% !important;
			}
		}
		
		

		.page video {
			width: 690upx;
			height: 320upx;
			border-radius: 6upx;
		}

		.tips {
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
			line-height: 44upx;
		}
	}
</style>
