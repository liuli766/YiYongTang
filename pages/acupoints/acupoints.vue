<template>
	<view>
		<uni-search-bar :radius="100" placeholder="输入穴位名称/拼音" cancelButton='none' @input="search"></uni-search-bar>
		<view class="hotserch">
			<view class="bar flex">
				<view class="flex">
					<view class="line"></view>
					<view class="title">热门搜索</view>
				</view>

			</view>
			<view class="serchcontent flex-a-c flex-warp-col-b">
				<text class="flex-c" v-for="(val,k) in 8" :key="k">丰隆穴</text>
			</view>
		</view>
		<!-- IndexedList  -->
		<uni-indexed-list></uni-indexed-list>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniIndexedList from "@/components/uni-indexed-list/uni-indexed-list.vue"
	export default {
		components: {
			uniSearchBar,
			uniIndexedList,
		},
		data() {
			return {

			}
		},
		methods: {
			search(value) {
				console.log(value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hotserch {
		background: #fff;
		border-bottom: 8upx solid #F8F8F8;

		.bar {
			margin-bottom: 40upx;
			width: 100%;
			justify-content: space-between;

			.line {
				width: 7upx;
				height: 34upx;
				background: #FD9558;
				margin-left: 30upx;
			}

			.title {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				margin-left: 17upx;
			}
		}

		.serchcontent {
			margin: 0 30upx;

			text {
				width: 161upx;
				height: 64upx;
				border: 1px solid #CCCCCC;
				opacity: 0.48;
				border-radius: 32upx;
				margin-bottom: 20upx;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}
		}
	}
</style>
