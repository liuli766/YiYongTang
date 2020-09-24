<template>
	<view class="content">
		<view class="serch" @tap="Serch">
			<input type="text" disabled="disabled" />
			<view class="txt flex-c">
				<image src="../../static/index/serch.png"></image>
				<text>搜索</text>
			</view>
		</view>
		<view class="banner">
			<swiper class="swiper" indicator-dots="false" autoplay="true" interval=2000 duration=500>
				<swiper-item v-for="(item,k) in swiperlist" :key="k">
					<view class="swiper-item uni-bg-red">
						<image :src="item.src"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="grid flex-warp">
			<view class="grid_child flex-c" @tap="Press">
				<image src="../../static/index/grid4.png"></image>
				<text>按部位</text>
			</view>
			<view class="grid_child flex-c">
				<image src="../../static/index/grid2.png" @tap="symptom"></image>
				<text>按症状</text>
			</view>
			<view class="grid_child flex-c" @tap="Acupoints">
				<image src="../../static/index/grid1.png"></image>
				<text>按穴位</text>
			</view>
			<view class="grid_child flex-c" @tap="Case">
				<image src="../../static/index/grid3.png"></image>
				<text>案例展示</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperlist: [],
				link: 'https://health.jisapp.cn',
				isCanUse: uni.getStorageSync('isCanUse')
			}
		},
		onLoad() {

			uni.request({
				url: 'https://health.jisapp.cn/mobile/Config/banner', //仅为示例，并非真实接口地址。
				header: {
					"X-Requested-With": "XMLhttpsRequest"
				},
				method: 'POST',
				success: (res) => {
					this.swiperlist = res.data.data
					console.log(this.swiperlist)
				}
			});
		},
		methods: {
			getlogin() {
				
				if (!this.isCanUse) {
					console.log(!this.isCanUse)
					uni.showModal({
						title: '请先登录',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.navigateTo({
									url: '../login/login'
								});
							} else if (res.cancel) {
								console.log('用户点击取消');
								return false;
							}

						}
					})
					return false;
				}else{
					return true;
				}
			},
			Serch() {
				let a=this.getlogin()
				if(a){
					uni.navigateTo({
						url: '../serch/serch'
					});
				}
				
			},
			Press() { //按部位
			let a=this.getlogin()
			if(a){
				uni.navigateTo({
					url: '../Press/Press'
				});
			}
				
			},
			Case() { //案例展示
				let a=this.getlogin()
				if(a){
					uni.navigateTo({
						url: '../case/case'
					});
				}
				
			},
			Acupoints() { //按穴位
				let a=this.getlogin()
				if(a){
					uni.navigateTo({
						url: '../acupoints/acupoints'
					});
				}
				
			},
			symptom() {
				let a=this.getlogin()
				if(a){
					uni.navigateTo({ //按症状
						url: '../symptom/symptom'
					});
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #F8F8F8;
		height: 100%;
		position: fixed;
		width: 100%;
		overflow: auto;

		.banner {
			image {
				width: 750upx;
				height: 300upx;
			}

		}

		.grid {
			margin-bottom: 80upx;
			padding-bottom: 80upx;

			.grid_child {
				flex-direction: column;
				width: 285upx;
				height: 300upx;
				background: #FFFFFF;
				border-radius: 6upx;
				margin-top: 30upx;
				color: #333333;
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: 500;

				image {
					width: 110upx;
					height: 110upx;
				}
			}
		}
	}
</style>
