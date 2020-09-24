<template>
	<!-- //按部位 -->
	<view class="content">
		<uni-search-bar :radius="100" placeholder="输入搜索内容" cancelButton='auto' @cancel="Cancel" @input="search"></uni-search-bar>
		<view class="line"></view>
		<view class="main" v-if="hotserch" >
			<view class="alidebar" v-for="(val,k) in pressList" :key='k' @tap='handSwich(k)' >
					<scroll-view scroll-y="true" class="tab scroll-Y">
						<view class="flex-warp-col-b titnav" :class="[navid==k?'active':'flex-warp-col-b']">{{val.cate_name}}</view>
					</scroll-view>
					<scroll-view scroll-y="true"  class="scroll scroll-Y" >
						<view class="presscontent" v-if="navid==k">
							<image :src="pst_banner" mode=""></image>
								<view class="child">
									<text class="flex-c" v-for="(c,v) in val.ill" :key="v"  @tap="gosymptomDetail(c)"
									style="text-align: center;">{{c.ill_name}}</text>
								</view>
						</view>
					</scroll-view>
					
				</view>
		</view>
		<view class="acu">
			<view v-if="serchbox">
				<view class="empty background" v-if="SechData.length===0">
					<image src="../../static/emtpy.png"></image>
				</view>
				<view v-else>
					<view class="serchlist" v-for="(c,v) in SechData" :key="v" @tap="goacupointsDetail(c)">
						<view class="title">
							{{c.ill_name}}
						</view>
						<text class="subtit">{{c.cate_name}}</text>
					</view>
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
				pressList: [],
				navid: 0,
				link: 'https://health.jisapp.cn/',
				SechData: [],
				serchbox: false,
				hotserch: true,
				pst_banner:uni.getStorageSync('pst_banner'),
				windowHeight:0
			}
		},
		watch:{
			windowHeight(){
				this.height()
			}
		},
		onLoad() {
			let that = this
			uni.getSystemInfo({
			    success: function (res) {
			        console.log(res.windowHeight);
					that.windowHeight=res.windowHeight
			    }
			});
			uni.request({
				url: 'https://health.jisapp.cn/mobile/IndexInfo/pst_cate',
				header: {
					"X-Requested-With": "XMLhttpsRequest"
				},
				method: 'POST',
				success: (res) => {
					this.pressList = res.data.data
					
					console.log(this.pressList)
				}
			});
		},
		methods: {
			height(){
				let that = this
				uni.getSystemInfo({
				    success: function (res) {
				        console.log(res.windowHeight);
						that.windowHeight=res.windowHeight
				    }
				});
			},
			handSwich(k) {
				this.navid = k
			},
			search(value) { //搜索功能
				this.serchbox = true;
				this.hotserch = false;
				let keyword = value.value
				uni.request({
					url: 'https://health.jisapp.cn/mobile/IndexInfo/search_list',
					header: {
						"X-Requested-With": "XMLhttpsRequest"
					},
					data: {
						keyword,
					},
					method: 'POST',
					success: (res) => {
						console.log(res.data)
						this.SechData = res.data.data
					}
				});
				if (keyword == '') {
					this.hotserch = true;
					this.serchbox = false;
				}
			},
			Cancel(){
				this.hotserch = true;
				this.serchbox = false;
			},
			gosymptomDetail(c) {
				console.log(c.ill_id)
				uni.navigateTo({ //按部位
					url: `../symptomDetail/symptomDetail?id=${c.ill_id}`
				});
			},
			goacupointsDetail(c){
				uni.navigateTo({ //按部位
					url: `../symptomDetail/symptomDetail?id=${c.id}`
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.line {
			height: 20upx;
			background: #F8F8F8;
		}
		
		.main {
			position: absolute;
			top: 152upx;
			left: 0;
			display: flex;
			flex-direction: column;
			background-color: #EEEEEE;
			// min-height: 100%;
			 // height: 100%;
			 // position: fixed;
			.alidebar {
				display: flex;
				justify-content: flex-start;
				
				.tab{
					width: 180upx;
					background-color: #EEEEEE;
					.titnav {
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
			}
			.scroll{
				position: absolute;
				margin-left: 190upx;
				top: 0;
				width: 570upx;
				overflow: scroll;
				height: auto;
			}
			.presscontent {
				margin-left: 16upx;
				flex: 1;
				background: #fff;
				image {
					// background: #fff;
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
						width: 180upx;
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
	}
</style>
