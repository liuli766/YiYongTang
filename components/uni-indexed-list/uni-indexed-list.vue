<template>
	<view>
		<scroll-view class="scroller" :scroll-into-view="toView" scroll-y="true" scroll-with-animation="true">
			<view class="hotserch" v-for="(val,k) in list" :id="val.letter">
				<view class="bar flex">
					<view class="flex">
						<view class="line"></view>
						<view class="title" ref='letter'>{{val.letter}}</view>
					</view>
				</view>
				<view class="serchcontent">
					<text class="flex-c" v-for="(c,v) in val.data" :key="v" @tap="goacupointsDetail">{{c}}</text>
				</view>
			</view>
		</scroll-view>
		<view class="sildebar">
			<text v-for="(val,k) in list" @click="ClickChose(val,k,$event)" :data-id="val.letter">{{val.letter}}</text>
		</view>
		<view class="module flex-c" v-if="clickShow">
			<text>{{chosedVal}}</text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: [{
						"letter": "A",
						"data": [
							"丰隆穴",
							"丰隆穴",
							"丰隆穴",
							"丰隆穴",
							"丰隆穴",
							"丰隆穴"
						]
					}, {
						"letter": "B",
						"data": [
							"丰隆穴",
							"丰隆穴",
							"丰隆穴",
							"丰隆穴",
							"丰隆穴"
						]
					},
					{
						"letter": "C",
						"data": [
							"丰隆穴",
							"丰隆穴",
							"丰隆穴",
							"丰隆穴",
							"丰隆穴"
						]
					}, {
						"letter": "D",
						"data": [
							"丰隆穴",
							"丰隆穴",
							"丰隆穴",
							"丰隆穴",
							"丰隆穴"
						]
					}, {
						"letter": "E",
						"data": [
							"丰隆穴",
							"丰隆穴",
							"丰隆穴",
							"丰隆穴",
							"丰隆穴"
						]
					}, {
						"letter": "F",
						"data": [
							"丰隆穴",
							"丰隆穴",
							"丰隆穴",
							"丰隆穴",
							"丰隆穴"
						]
					}
				],
				chosedVal: '',
				clickShow: false,
				toView: '',
			}
		},
		methods: {
			ClickChose(val, k,e) {
				this.clickShow = true
				let that = this
				setTimeout(function() { //this环境
					that.clickShow = false
				}, 1000);
				var choseIndex = e.currentTarget.dataset.id;
				this.toView = choseIndex;
				this.chosedVal = val.letter		
			},
			goacupointsDetail(){
				uni.navigateTo({ //按症状
					url: `../../pages/acupointsDetail/acupointsDetail?title=丰隆穴`
				});
			}
		},
	}
</script>
<style lang="scss" scoped>
	scroll-view{
		height: 80vh;
	}
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
			flex-wrap: wrap;
			display: flex;

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

			text+text {
				margin-left: 10upx;
			}
		}
	}

	.sildebar {
		height: 870upx;
		position: fixed;
		top: 293upx;
		right: 10upx;
		display: flex;
		flex-direction: column;

		text {
			margin-bottom: 19upx;
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FD9558;
		}

		text:hover {}
	}

	.module {
		position: absolute;
		top: 50%;
		left: 50%;
		background: rgba(0, 0, 0, .5);
		width: 100upx;
		height: 100upx;
		margin-top: -50upx;
		margin-left: -50upx;
		color: #FD9558;
		font-size: 32upx;
	}
</style>
