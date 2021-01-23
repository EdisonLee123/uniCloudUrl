<template>
	<view class="content">
		<view class="title">uniCloud 基础示例</view>
		<view class="tips">
			<view>1.在uniCloud目录右键创建并关联服务空间</view>
			<view>2.在uniCloud/database目录内db_init.json上右键初始化云数据库</view>
			<view>3.在uniCloud/cloudfunctions目录右键选择“上传所有云函数”</view>
			<view>开始愉快的体验uniCloud吧！</view>
		</view>
		<view class="btn-list">
			<button type="primary" @click="add">新增一条数据</button>
			<button type="primary" @click="remove">删除一条数据</button>
			<button type="primary" @click="update">修改数据</button>
			<button type="primary" @click="get">查询数据</button>
			<button type="primary" @click="useCommon">使用公用模块</button>
			<button type="primary" @click="upload">上传文件</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				unmLenght: 0,
				list: []
			}
		},
		onShow() {

		},
		onLoad() {
			this.get()
		},
		methods: {
			add() {
				//console.log(this.unmLenght)
				uni.showLoading({
					title: '处理中...'
				})
				var data = {};
				var num = this.unmLenght + 1
				data.name = 'DCloud' + num;
				data.subType = 'uniCloud';
				data.createTime = Date.now();
				data.CDb = 'unicloud-test';
				this.$api.post('add', data).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: res.msg,
						duration: 2000
					})
					this.get()
					console.log(res)
				})
			},
			remove() {
				uni.showLoading({
					title: '处理中...'
				})
				var data = {};
				var index = this.unmLenght - 1
				data._id = this.list[index]._id;
				data.CDb = 'unicloud-test';
				this.$api.post('remove', data).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: res.msg,
						duration: 2000
					})
					this.get()
				})
			},
			update() {
				uni.showLoading({
					title: '处理中...'
				})
				var data = {};
				var index = this.unmLenght - 1
				data._id = this.list[index]._id;
				data.name = 'DCloud',
					data.subType = 'html 5+',
					data.CDb = 'unicloud-test';
				data.createTime = Date.now()
				this.$api.post('update', data).then(res => {
					console.log(res)
					uni.hideLoading()
					uni.showToast({
						title: res.msg,
						duration: 2000
					})
					//this.get()
				})
			},
			get() {
				uni.showLoading({
					title: '处理中...'
				})

				var data = {}
				data.limit = 50
				this.$api.get('get', data).then(res => {
					uni.hideLoading()
					console.log(res)
					this.list = res.data
					this.unmLenght = res.data.length
				})
			},
			useCommon() {
				console.log('请确保自己已经阅读并按照公用模块文档操作 https://uniapp.dcloud.io/uniCloud/cf-common')

				this.$api.post('use-common').then(res => {
					//uni.hideLoading()
					console.log(res)
					uni.showModal({
						content: '云函数use-common返回结果：' + JSON.stringify(res),
						showCancel: false
					})
				})
			},
			upload() {
				new Promise((resolve, reject) => {
					uni.chooseImage({
						count: 1,
						success: res => {
							const path = res.tempFilePaths[0]
							let ext
							// #ifdef H5
							ext = res.tempFiles[0].name.split('.').pop()
							const options = {
								filePath: path,
								cloudPath: Date.now() + '.' + ext
							}
							resolve(options)
							// #endif
							// #ifndef H5
							uni.getImageInfo({
								src: path,
								success(info) {
									const options = {
										filePath: path,
										cloudPath: Date.now() + '.' + info.type.toLowerCase()
									}
									resolve(options)
								},
								fail(err) {
									reject(new Error(err.errMsg || '未能获取图片类型'))
								}
							})
							// #endif
						},
						fail: () => {
							reject(new Error('Fail_Cancel'))
						}
					})
				}).then((options) => {
					uni.showLoading({
						title: '文件上传中...'
					})
					return uniCloud.uploadFile({
						...options,
						onUploadProgress(e) {
							console.log(e)
						}
					})
				}).then(res => {
					uni.hideLoading()
					console.log(res);
					uni.showModal({
						content: '图片上传成功，fileId为：' + res.fileID,
						showCancel: false
					})
				}).catch((err) => {
					uni.hideLoading()
					console.log(err);
					if (err.message !== 'Fail_Cancel') {
						uni.showModal({
							content: `图片上传失败，错误信息为：${err.message}`,
							showCancel: false
						})
					}
				})
			}
		}
	}
</script>

<style>
	.content {
		padding-bottom: 30px;
	}

	.title {
		font-weight: bold;
		text-align: center;
		padding: 20px 0px;
		font-size: 20px;
	}

	.tips {
		color: #999999;
		font-size: 14px;
		padding: 20px 30px;
	}

	.btn-list {
		padding: 0px 30px;
	}

	.btn-list button {
		margin-bottom: 20px;
	}

	.upload-preview {
		width: 100%;
	}
</style>
