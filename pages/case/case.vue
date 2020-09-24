<template>
	<!-- 案例展示 -->
	<view class="content">
		<view class="banner">
			<image :src="case_banner"></image>
		</view>
		<view class="item" @tap="goDetail(item)" v-for="(item,k) in caseList" :key="k">
			<image :src="item.head_pic"></image>
			<view class="item-box">
				<text class="title">{{item.case_title}}</text>
				<text class="intro two-ell" v-html="item.description"></text>
				<view class="item-bot flex-b-c">
					<text>{{item.create_time}}</text>
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
				caseList:[],
				case_banner:uni.getStorageSync('case_banner')
			}
		},
		onLoad: function() { //option为object类型，会序列化上个页面传递的参数
			uni.request({
				url: 'https://health.jisapp.cn/mobile/IndexInfo/case_list',
				header: {
					"X-Requested-With": "XMLhttpsRequest"
				},
				data: {
					page: 1,
				},
				method: 'POST',
				success: (res) => {
					this.caseList = res.data.data.list
					console.log(this.caseList)
				}
			});
		},
		methods: {
			goDetail(item) {
				uni.navigateTo({
					url: `../caseDetail/caseDetail?title=${item.id}`
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.banner {
			width: 100%;
			height: 300upx;
			image {
				width: 100%;
				height: 100%;
			}

			margin-bottom: 30upx;
		}

		.item {
			display: flex;
			justify-content: flex-start;
			padding: 30upx;
			border-bottom: 1upx solid #e5e5e5;
			
			image {
				width: 240upx;
				height: 170upx;
				margin-right: 30upx;
				// margin-left: 30upx;
				
			}

			.item-box {
				flex: 1;
				display: flex;
				flex-wrap: wrap;
				// margin-right: 31upx;
				// height: 170upx;

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
