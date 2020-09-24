<template>
	<view class="casedetail">
		<uni-nav-bar left-icon="back" :title="caseDetail.case_title" shadow=true @clickLeft='goback' status-bar=true fixed=true></uni-nav-bar>
		<view class="main">
			<view class="box">
				<view class="title">{{caseDetail.case_title}}</view>
				<view class="tag">热门</view>
			</view>
			<view class="intro" v-html="caseDetail.description"></view>
			<text class="time">发布时间：{{caseDetail.create_time}}</text>
			
			<view class="page" v-for="(item,k) in caseDetail.video" :key="k">
				<video class="video" id="demoVideo" :controls="true" :src="item">
				</video>
			</view>
			<view class="contentbox" style="padding:0;">
				<view class="bar flex">
					<view class="flex">
						<view class="line"></view>
						<view class="title">调养</view>
					</view>
				</view>
				<view v-html="caseDetail.care_info">
				</view>
			</view>
			<view class="contentbox" style="padding: 0;">
				<view class="bar flex">
					<view class="flex">
						<view class="line"></view>
						<view class="title">养生小贴士</view>
					</view>
				</view>
				<view class="tips" v-html="caseDetail.tips"> </view>
			</view>
			<view class="contentbox" style="padding: 0;">
				<view class="bar flex">
					<view class="flex">
						<view class="line"></view>
						<view class="title">调理穴位</view>
					</view>
				</view>
				<view v-for="(item,k) in caseDetail.acu" @tap="goacupoints(item)">
					<image :src="item.sub.head_pic" style="width: 100%;" ></image>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="btno flex-c" @tap='goIndex'>
				<image src="../../static/home.png" mode=""></image>
				<text>首页</text>
			</view>
			<button class="fx btnb flex-c" data-name="shareBtn" open-type="share">
				<image src="../../static/share.png" mode=""></image>
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
				caseDetail:{},
				case_banner:uni.getStorageSync('case_banner')
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option)
			uni.request({
				url: 'https://health.jisapp.cn/mobile/IndexInfo/case_detail',
				header: {
					"X-Requested-With": "XMLhttpsRequest"
				},
				data: {
					case_id: option.title,
				},
				method: 'POST',
				success: (res) => {
					this.caseDetail = res.data.data
					console.log(this.caseDetail)
				}
			});
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
			},
			onShareAppMessage: function(e) {
				return {
					title: this.caseDetail.case_title,
					path: 'pages/caseDetail/caseDetail'
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
	.main {
		margin: 30upx;
		margin-bottom: 120upx;
		padding-bottom: 120rpx;
		.tips {
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
			line-height: 44upx;
		}
		.page{
			margin-top: 20rpx;
		}
		.page video {
			width: 690upx;
			height: 320upx;
			border-radius: 6upx;
		}
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
