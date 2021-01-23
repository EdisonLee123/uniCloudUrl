import {
	Api_url
} from './config.js'

export default {
	async post(url, param) {
		const res = await this.uni_request(url, param, 'post')
		return res;
	},
	async get(url, param) {
		const res = await this.uni_request(url, param, 'get')
		return res;
	},
	uni_request(url, param, method) {
		return new Promise((cback, reject) => {
				uni.request({
					url: Api_url + url,
					data: param,
					method: method,
				}).then(data => {
					var [error, res] = data;
					var res_code = res.statusCode.toString();
					if (res_code == 200) {
						//console.log('200', url)
						 cback(res.data);
					} else {
						console.log('201', url)
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
					

				}).catch(err => {
					uni.hideLoading()
					console.log('catch:', err);
				})
			})
		}
	}
