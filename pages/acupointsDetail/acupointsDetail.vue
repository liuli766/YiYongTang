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
				<view class="bar">
					
					<view class="styleinfo">
						
						<rich-text :nodes="acuDetail.description"></rich-text>
					</view>
				</view>
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
				<image :src="acuDetail.head_pic" style="width: 100%;"></image>
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
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				acuDetail: []
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option)
			uni.request({
				url: 'https://health.jisapp.cn/mobile/IndexInfo/acu_detail',
				header: {
					"X-Requested-With": "XMLhttpsRequest"
				},
				data: {
					acu_id: option.title,
				},
				method: 'POST',
				success: (res) => {
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
				return {
					title: this.acuDetail.cate_name,
					path: 'pages/acupointsDetail/acupointsDetail'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		margin: 30upx;
		margin-bottom: 120upx;
		img{
			width: 100% !important;
			height: 100% !important;
		}
		.page video {
			width: 690upx;
			height: 320upx;
			border-radius: 6upx;
			margin-bottom: 120upx;
		}
		.tips {
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
			line-height: 44upx;
		}

		.styleinfo {
			rich-text{
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				image{
					height:100% !important;
					width: 100% !important;
				}
			}
			
		}
	}
</style>
