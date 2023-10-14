const AK = "FEZADvUjC7IDpr5coqemwvss"
const SK = "Z7NuLLdPGY9ZHbV4XyyF2AUeaFQpK0Qm"
let currentAudio = null // 记录当前的 wxAudio 实例

async function textToSpeech(text) {
	const wxAudio = uni.createInnerAudioContext({}) // 音频API
	const fs = uni.getFileSystemManager() // 文件管理器API
	const target = `${wx.env.USER_DATA_PATH}/${new Date().getTime()}.mp3`

	// 如果有正在播放的音频，先停止它
	if (currentAudio && !currentAudio.paused) {
		currentAudio.stop()
	}

	uni.showLoading({
		title: "加载中"
	})

	uni.request({
		url: 'https://tsn.baidu.com/text2audio',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept': '*/*'
		},
		responseType: 'arraybuffer',
		method: "POST",
		data: {
			'tex': text,
			'tok': await getAccessToken(),
			'cuid': '2131232',
			'ctp': '1',
			'lan': 'zh'
		},
		success: (res) => {

			console.log(res);
			uni.hideLoading()

			fs.writeFile({
				filePath: target,
				data: res.data,
				encoding: 'binary',
				success: (res) => {
					wxAudio.src = target
					wxAudio.onCanplay(() => {
						wxAudio.play()
					})
					// console.log(wxAudio.paused);
					currentAudio = wxAudio // 记录当前的 wxAudio 实例
				}
			})
		}
	});
}

/**
 * 使用 AK，SK 生成鉴权签名（Access Token）
 * @return string 鉴权签名信息（Access Token）
 */
function getAccessToken() {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' +
				AK +
				'&client_secret=' + SK,
			method: "POST",
			success: (res) => {
				resolve(res.data.access_token)
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}


/**
 * @param {Object} params 要过滤的参数对象
 */
function filterParams(params) {
	return Object.keys(params).reduce((acc, key) => {
		if (params[key] !== '' && params[key] !== null && params[key] !== undefined) {
			acc[key] = params[key];
		}
		return acc;
	}, {});
}

function destroyAudio() {
	if (currentAudio && !currentAudio.paused) {
		currentAudio.destroy()
	}
	console.log("销毁");
}

export {
	textToSpeech,
	filterParams,
	destroyAudio
}