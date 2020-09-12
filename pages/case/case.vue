<template>
	<view class="content">
		<view class="banner">
			<image src="../../static/index/banner.png"></image>
		</view>
		<view class="item" @tap="goDetail">
			<image src="../../static/item.png"></image>
			<view class="item-box">
				<text class="title"> 甲状腺功能亢进症</text>
				<text class="intro two-ell"> 心悸、出汗、进食和便次增多和体重减 少,多数患者还常同时有突眼,多数患者还常同时有突眼</text>
				<view class="item-bot flex-b-c">
					<text>2020/09/08</text>
					<text>甲亢</text>
				</view>
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
		methods: {
			goDetail() {
				uni.navigateTo({
					url: `../caseDetail/caseDetail?title=甲状腺功能亢进症`
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.banner {
			image {
				width: 100%;
				height: 300upx;
			}

			margin-bottom: 30upx;
		}

		.item {
			display: flex;

			image {
				height: 170upx;
				margin-right: 30upx;
				margin-left: 30upx;
			}

			.item-box {
				display: flex;
				flex-wrap: wrap;
				margin-right: 31upx;

				.title {
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
					line-height: 1;
				}

				.intro {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 44upx;
					margin-top: 17upx;
					margin-bottom: 10upx;
				}

				.item-bot {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					width: 100%;
				}
			}

		}
	}
</style>
