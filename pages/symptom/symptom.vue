<template>
	<view>
		<uni-search-bar :radius="100" placeholder="搜索症状/部位/疾病" cancelButton='none' @input="search"></uni-search-bar>
		<view class="line"></view>
		<view class="main">
			<view class="alidebar ">
				<text class="flex-warp-col-b active" v-for="(val,k) in 8" :key='k'>头部</text>
			</view>
			<view class="presscontent">
				<image src="../../static/index/banner.png" mode=""></image>
				<view class="child ">
					<text class="flex-c" v-for="(c,v) in 12" :key='v' @tap="goDetail">眼花</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	export default {
		components: {
			uniSearchBar
		},
		data() {
			return {

			}
		},
		methods: {
			search(value) {
				console.log(value)
			},
			goDetail(){
				uni.navigateTo({
				    url:`../symptomDetail/symptomDetail?title=甲状腺功能亢进症`
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.line {
		height: 20upx;
		background: #F8F8F8;
	}

	.main {
		display: flex;
		padding-right: 30upx;

		.alidebar {
			background-color: #EEEEEE;
			height: 100%;
			position: fixed;
			overflow: scroll;

			text {
				width: 180upx;
				height: 80upx;
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				text-align: center;
				display: block;
				line-height: 80upx;
			}

			.active {
				background: #fff;
				border-left: 8upx solid #FD9558;
			}
		}

		.presscontent {
			margin-left: 196upx;

			image {
				background: #fff;
				margin-top: 16upx;
				width: 524upx;
				height: 180upx;
			}

			.child {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				display: flex;
				flex-wrap: wrap;

				text {
					width: 30%;
					height: 80upx;
					border: 1upx solid #EEEEEE;
					border-left: 0;
				}

				text:nth-of-type(3n) {
					border-right: 0;
				}

			}
		}
	}
</style>
