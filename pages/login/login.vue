<template>
	<view v-if="!isCanUse">
		<view class='header'>
			<image src='../../static/wx_login.png'></image>
		</view>
		<view class='content'>
			<view>申请获取以下权限</view>
			<text>获得你的公开信息(昵称，头像、地区等)</text>
			<text>获得你微信绑定的手机号</text>
		</view>

		<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" v-if="userinfo"
		 @getuserinfo="appLoginWx">
			授权
		</button>

		<button class='bottom' type='primary' open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-if="phonenumber">
			绑定手机号
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				encryptedData: '',
				iv: '',
				nickname: '',
				head_img: '',
				code: '',
				userinfo: true,
				phonenumber: false,
				isCanUse: uni.getStorageSync('isCanUse')
			}
		},
		onLoad() {
			if(this.isCanUse){
				this.getindex()
			}
		},
		methods: {
			login(e) {
				uni.login({
					success: (res) => {
						console.log("login", JSON.stringify(res));
					}
				})
			},
			getindex(){
				uni.navigateTo({
					url: '../index/index'
				});
			},
			appLoginWx() {
				// #ifdef MP-WEIXIN
				let that = this
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: (res2) => {
									// if (that.isCanUse) {
										uni.getUserInfo({
											provider: 'weixin',
											success: (info) => { //这里请求接口
												console.log(res2, 222);
												console.log(info, '信息');
												that.code = res2.code
												that.nickname = info.userInfo.nickName
												that.head_img = info.userInfo.avatarUrl
												that.userinfo = false
												that.phonenumber = true
												uni.setStorageSync('isCanUse', true); 
											},
											fail: () => {
												uni.showToast({
													title: "微信登录授权失败",
													icon: "none"
												});
											}
										})
									// }



								},
								fail: () => {
									uni.showToast({
										title: "微信登录授权失败",
										icon: "none"
									});
								}
							})

						} else {
							uni.showToast({
								title: '请先安装微信或升级版本',
								icon: "none"
							});
						}
					}
				});
				//#endif
			},
			getPhoneNumber: function(e) {
				let that = this

				if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
					console.log('用户拒绝提供手机号');
				} else {
					console.log('用户同意提供手机号');
					that.encryptedData = e.detail.encryptedData
					that.iv = e.detail.iv
					uni.request({
						url: 'https://health.jisapp.cn/mobile/UserLogin/wx_login', //仅为示例，并非真实接口地址。
						header: {
							"X-Requested-With": "XMLhttpsRequest"
						},
						method: 'POST',
						data: {
							code: that.code,
							nickname: that.nickname,
							head_img: that.head_img,
							encryptedData: that.encryptedData,
							iv: that.iv
						},
						success: (res) => {
							console.log(res, '微信')
							uni.reLaunch({
								url: '../index/index'
							})
						}
					});

				}

			},
		}
	}
</script>

<style scoped>
	.header {
		margin: 90rpx 0 50rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 50rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 35rpx 50rpx;
		font-size: 35rpx;
	}

	.bottom:first-child {
		margin-top: 50rpx;
	}

	.view_input {
		margin: 0 50rpx;
		background-color: white;
		padding: 10px;
		height: 1rem;
		line-height: 1rem;
	}
</style>
