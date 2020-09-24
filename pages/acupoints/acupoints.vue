<template>
	<!--  //按穴位 -->
	<view>
		<uni-search-bar :radius="100" placeholder="输入穴位名称/拼音" cancelButton='auto' @cancel="Cancel" @input="search" cancelText='取消'></uni-search-bar>
		<view class="hotserch" v-if="hotserch">
			<view class="bar flex">
				<view class="flex">
					<view class="line"></view>
					<view class="title">热门搜索</view>
				</view>
			</view>
			<view class="serchcontent flex-a-c flex-warp-col-b">
				<text class="flex-c" v-for="(val,k) in hotList" :key="k" @tap="Fserch(val)">{{val}}</text>
			</view>
			
		</view>
		
		<!-- IndexedList  -->
		<uni-indexed-list :acupointsList="acupointsList" ></uni-indexed-list>
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
				acupointsList: [],
				SechData: [],
				serchbox: false,
				hotserch: true,
				hotList:[],
			}
		},
		onLoad() {
			uni.request({
				url: 'https://health.jisapp.cn/mobile/IndexInfo/acu_cate',
				header: {
					"X-Requested-With": "XMLhttpsRequest"
				},
				method: 'POST',
				success: (res) => {
					this.acupointsList = res.data.data
					console.log(this.acupointsList)
				}
			});
			uni.request({
				url: 'https://health.jisapp.cn/mobile/Config/sys_config',
				header: {
					"X-Requested-With": "XMLhttpsRequest"
				},
				method: 'POST',
				success: (res) => {
					
					this.hotList=res.data.data.hot_search
					this.hotList=this.hotList.split(",")
					console.log(this.hotList)
				}
			});
		},
		methods: {
			Fserch(value){
				this.search(value)
			},
			search(value) { //搜索功能
				this.serchbox = true;
				this.hotserch = false;
				let keyword = value.value||value
				uni.request({
					url: 'https://health.jisapp.cn/mobile/IndexInfo/acu_cate',
					header: {
						"X-Requested-With": "XMLhttpsRequest"
					},
					data: {
						cate_name:keyword,
					},
					method: 'POST',
					success: (res) => {
						this.acupointsList = res.data.data
						console.log(this.acupointsList)
					}
				});
			},
			Cancel() {
				this.hotserch = true;
				this.serchbox = false;
			},
			goacupointsDetail(c) {
				console.log(c)
				uni.navigateTo({
					url: `../../pages/acupointsDetail/acupointsDetail?title=${c.id}`
				});
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
				padding: 0 30upx;
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
