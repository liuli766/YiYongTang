<template>
	<view class="content">
		<view @tap='Click'>
			<uni-search-bar :radius="100" placeholder="输入搜索内容" cancelButton='none' @input="search"></uni-search-bar>
		</view>
		<view class="cont" v-if="hotserch">
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
			<view class="serchhistory">
				<view class="bar flex">
					<view class="flex">
						<view class="line"></view>
						<view class="title">搜索历史</view>
					</view>
					<view class="clear" @tap="ClearHistory">清除记录</view>
				</view>
				<view class="serchcontent flex-a-c flex-warp-col-b">
					<text class="flex-c" v-for="(val,k) in 8" :key="k">丰隆穴</text>
				</view>
			</view>
		</view>
		<view v-if="serchbox">
			<view class="empty background" v-if="SechData.length===0">
				<image src="../../static/emtpy.png"></image>
			</view>
			<view class="serchbox background" v-else>
				<view class="serchlist" v-for="(c,v) in SechData" :key="v">
					<view class="title">
						{{c.tit}}
					</view>
					<text>{{c.itro}}</text>
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
				sechcontent: '',
				serchbox: false,
				hotserch:true,
				SechList: [{
						tit: '感冒',
						itro: '上呼吸道感染、伤风'
					},
					{
						tit: '风寒',
						itro: '上呼吸道感染、伤风'
					},
				],
				SechData: [], //搜索展示的内容
			}
		},
		methods: {
			ClearHistory() {

			},
			search(value) { //搜索功能
				let val=value.value
				let sechArr=[...this.SechList]
				this.SechData=sechArr.filter((item) => item.tit.indexOf(val) !== -1)
				if(val==''){
					this.SechData.length=0
				}
				console.log(this.SechData)
			},
			Click(){
				this.serchbox=true;
				this.hotserch=false;
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

		.empty {
			display: flex;
			justify-content: center;

			image {
				width: 340upx;
				height: 340upx;
			}
		}

		.cont {
			padding-bottom: 60upx;
		}

		.serchbox {
			padding: 20upx 30upx;
			box-sizing: border-box;

			.serchlist {
				border-bottom: 1px solid #EEEEEE;
				padding-bottom: 20upx;

				.title {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
				}

				text {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
				}
			}
		}

	}
</style>
