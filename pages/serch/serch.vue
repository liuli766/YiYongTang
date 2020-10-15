<template>
	<view class="content">
			<uni-search-bar :radius="100" placeholder="输入搜索内容" cancelButton='auto' @cancel="Cancel" @input="search" ></uni-search-bar>
		<view class="cont" v-if="hotserch">
			<view class="hotserch">
				<view class="bar flex">
					<view class="flex">
						<view class="line"></view>
						<view class="title">热门搜索</view>
					</view>

				</view>
				<view class="serchcontent flex-a-c flex-warp-col-b">
					<text class="flex-c" v-for="(val,k) in hotList" :key="k" style="margin-right: 10rpx;"
					@tap="Fserch(val)">{{val}}</text>
				</view>
			</view>
			<view class="serchhistory">
				<view class="bar flex">
					<view class="flex">
						<view class="line"></view>
						<view class="title">搜索历史</view>
					</view>
					<view class="clear" @tap="ClearHistory">清除记录</view>
				</view>
				<view class="serchcontent flex-a-c flex-warp-col-b">
					<text class="flex-c" v-for="(val,k) in historyList" :key="k" style="margin-right: 10rpx;"
					@tap="godetail(val)">{{val.ill_name}}</text>
				</view>
			</view>
		</view>
		<view v-if="serchbox">
			<view class="empty background" v-if="SechData.length===0" >
				<image src="/static/emtpy.png"></image>
			</view>
			<view class="serchbox background" v-else>
				<view class="serchlist" v-for="(c,v) in SechData" :key="v" @tap="goacupointsDetail(c)">
					<view class="title">
						{{c.ill_name}}
					</view>
					<text class="subtit">{{c.cate_name}}</text>
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
				hotSerchList: ['丰隆穴'],
				serchbox: false,
				hotserch: true,
				SechData: [], //搜索展示的内容
				hotList:[],
				isCanUse: uni.getStorageSync('isCanUse'),
				historyList:[],
				value:''
			}
		},
		onLoad() {
				this.loadOldKeyword()
				uni.showLoading({
				    title: '加载中'
				});
				uni.request({
					url: 'https://www.hlb918.com/mobile/Config/sys_config',
					header: {
						"X-Requested-With": "XMLhttpsRequest"
					},
					method: 'POST',
					success: (res) => {
						 uni.hideLoading();
						this.hotList=res.data.data.hot_search
						this.hotList=this.hotList.split(",")
						console.log(this.hotList,'热门')
					}
				});
		},
		methods: {
			//加载历史搜索
			loadOldKeyword() {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						this.historyList = OldKeys;
					}
				});
			},
			ClearHistory() {
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.historyList = [];
							uni.removeStorage({
								key: 'OldKeys'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			Fserch(value){
				this.search(value)
			},
			search(value) { //搜索功能
				this.serchbox = true;
				this.hotserch = false;
				let keyword = value.value||value
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
			godetail(c){
				uni.navigateTo({ //按部位
					url: `../symptomDetail/symptomDetail?id=${c.id}`
				});
			},
			goacupointsDetail(c){
				uni.navigateTo({ //按部位
					url: `../symptomDetail/symptomDetail?id=${c.id}`
				});
				// 保存历史记录
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						console.log(2)
						console.log(res.data);
						var OldKeys = JSON.parse(res.data);
						
						var findIndex = OldKeys.indexOf({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						if (findIndex == -1) {
							OldKeys.unshift({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						} else {
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						}
						//最多10个纪录
						OldKeys.length > 10 && OldKeys.pop();
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.historyList = OldKeys; //更新历史搜索
					},
					fail: (e) => {
						console.log(1)
						var OldKeys = [{
							ill_name:c.ill_name,
							id:c.id
						}];
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.historyList = OldKeys; //更新历史搜索
					}
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
		overflow: scroll;

		.serch {
			background: #fff;
			position: relative;
			padding: 30upx;

			input {
				width: 690upx;
				height: 80upx;
				border-radius: 40upx;
				background: #F8F8F8;

			}

			.txt {
				position: absolute;
				top: 50%;
				left: 50%;
				margin-left: -53upx;
				margin-top: -24upx;

				image {
					width: 48upx;
					height: 48upx;
				}

				text {
					color: #999999;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
				}
			}

		}

		.hotserch,
		.serchhistory {
			background: #fff;

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
				justify-content: flex-start;
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

		.serchhistory {
			padding-top: 40upx;
			padding-bottom: 60upx;

			.clear {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
				margin-right: 30upx;
			}
		}
	}
	
</style>
