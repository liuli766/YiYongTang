<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.request({
				url: 'https://www.hlb918.com/mobile/Config/sys_config',
				header: {
					"X-Requested-With": "XMLhttpsRequest"
				},
				method: 'POST',
				success: (res) => {
					console.log(res)
					uni.setStorageSync('case_banner', res.data.data.case_banner); 
					uni.setStorageSync('pst_banner', res.data.data.pst_banner); 
					uni.setStorageSync('sym_banner', res.data.data.sym_banner); 
				}
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* @import "colorui//* main.css"; */
	/* @import "colorui/icon.css"; */
</style>
