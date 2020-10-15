<template>
	<view class="backgroundf8">
		<uni-nav-bar left-icon="back" :title="acuDetail.cate_name" :shadow=true @clickLeft='goback' status-bar=true fixed=true></uni-nav-bar>
		<view class="main">
			<view class="contentbox">
				<view class="bar flex">
					<view class="flex">
						<view class="line"></view>
						<view class="title">定位&主治功效</view>
					</view>
				</view>

				<view v-html="acuDetail.description" class="styleinfo"></view>
			</view>

			<view class="page" v-for="(item,k) in acuDetail.video" :key="k">
				<video class="video" id="demoVideo" :controls="true" :src="item">
				</video>
			</view>

			<view class="contentbox">
				<view class="bar flex">
					<view class="flex">
						<view class="line"></view>
						<view class="title">图片展示</view>
					</view>
				</view>
				<image :src="acuDetail.head_pic" style="width: 100%;" mode="widthFix"></image>
			</view>

		</view>
		<view class="footer">
			<view class="btno flex-c" @tap="goIndex">
				<image src="../../static/home.png" mode=""></image>
				<text>首页</text>
			</view>
			<button class="fx btnb flex-c" data-name="shareBtn" open-type="share">
				<image src="../../static/share.png" mode="widthFix"></image>
				<text>转发</text>
			</button>
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
				acuDetail: [],
				showbtn: true,
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			let loging=uni.getStorageSync('isCanUse')

			if(!loging){
				uni.navigateTo({
					url: '../login/login'
				});
			}
			wx.showShareMenu({ //分享给好友
				withShareTicket: true
			});
			uni.showLoading({
			    title: '加载中'
			});
			uni.request({
				url: 'https://www.hlb918.com/mobile/IndexInfo/acu_detail',
				header: {
					"X-Requested-With": "XMLhttpsRequest"
				},
				data: {
					acu_id: option.title,
				},
				method: 'POST',
				success: (res) => {
					uni.hideLoading();
					this.acuDetail = res.data.data
					console.log(this.acuDetail)
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
				if (e.from === 'button') {
					// 来自页面内转发按钮
					console.log(e.target)
				}
				return {
					title: this.acuDetail.cate_name,
					path: `pages/acupointsDetail/acupointsDetail?title=${this.acuDetail.id}`,
					success: function(res) { // 分享成功之后的操作
						console.log("分享成功:" + JSON.stringify(res));
					},
					fail: function(res) { // 分享失败之后的操作
						console.log("分享失败:" + JSON.stringify(res));
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		margin: 30upx;
		margin-bottom: 120upx;
		-webkit-overflow-scrolling: touch;

		img {
			width: 100% !important;
			height: 100% !important;
		}

		.tips {
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
			line-height: 44upx;
		}

		.styleinfo {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;

		}
	}

	.page {
		box-sizing: border-box;
		height: 320upx;
		position: relative;
	}

	.page video {
		width: 690upx;
		height: 320upx;
		border-radius: 6upx;
		margin-bottom: 120upx;

	}
</style>
