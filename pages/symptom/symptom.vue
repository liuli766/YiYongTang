<template>
	<!-- //按症状 -->
	<view>
		<uni-search-bar :radius="100" placeholder="搜索症状/部位/疾病" cancelButton='auto' @cancel="Cancel" @input="search"></uni-search-bar>
		<view class="line"></view>
		
		<view class="main" v-if="hotserch" >
			<view class="alidebar" v-for="(val,k) in symptomlist" :key='k' @tap='handSwich(k)'>
					<scroll-view scroll-y="true" class="tab scroll-Y">
							<text class="flex-warp-col-b titnav" :class="[navid==k?'active':'flex-warp-col-b']">{{val.cate_name}}</text>						
					</scroll-view>
					<scroll-view scroll-y="true"  class="scroll scroll-Y" >
						<view class="presscontent" v-if="navid==k">
							<image :src="sym_banner" mode=""></image>
							<view class="child" >
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
				symptomlist:[],
				navid: 0,
				link: 'https://www.hlb918.com/',
				serchbox: false,
				hotserch: true,
				SechData:[],
				sym_banner:uni.getStorageSync('sym_banner'),
				windowHeight:0
			}
		},
		watch:{
			windowHeight(){
				this.height()
			}
		},
		onLoad() {
			this.getlist();
			let that = this
			uni.getSystemInfo({
			    success: function (res) {
			        console.log(res.windowHeight);
					that.windowHeight=res.windowHeight
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
			getlist(){
				uni.showLoading({
				    title: '加载中'
				});
				uni.request({
					url: 'https://www.hlb918.com/mobile/IndexInfo/sym_cate',
					header: {
						"X-Requested-With": "XMLhttpsRequest"
					},
					method: 'POST',
					success: (res) => {
						uni.hideLoading();
						this.symptomlist = res.data.data
						
						console.log(this.symptomlist)
					}
				})
			},
			handSwich(k) {
				this.navid = k
			},
			search(value) { //搜索功能
				this.serchbox = true;
				this.hotserch = false;
				let keyword = value.value
				uni.showLoading({
				    title: '加载中'
				});
				uni.request({
					url: 'https://www.hlb918.com/mobile/IndexInfo/search_list',
					header: {
						"X-Requested-With": "XMLhttpsRequest"
					},
					data: {
						keyword,
					},
					method: 'POST',
					success: (res) => {
						uni.hideLoading();
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
			gosymptomDetail(c){
				uni.navigateTo({ //按症状
				    url:`../symptomDetail/symptomDetail?id=${c.ill_id}`
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
	
</style>
