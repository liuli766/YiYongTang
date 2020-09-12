<template>
	<view class="content">
		<view class="serch" @tap="Serch">
			<input type="text" />
			<view class="txt flex-c">
				<image src="../../static/index/serch.png"></image>
				<text>搜索</text>
			</view>
		</view>
		<view class="banner">
			<image src="../../static/index/banner.png"></image>
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

			}
		},
		onLoad() {

		},
		methods: {
			Serch() {
				uni.navigateTo({
					url: '../serch/serch'
				});
			},
			Press() { //按部位
				uni.navigateTo({
					url: '../Press/Press'
				});
			},
			Case() { //案例展示
				uni.navigateTo({
					url: '../case/case'
				});
			},
			Acupoints() { //按穴位
				uni.navigateTo({
					url: '../acupoints/acupoints'
				});
			},
			symptom() {
				uni.navigateTo({ //按症状
					url: '../symptom/symptom'
				});
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
