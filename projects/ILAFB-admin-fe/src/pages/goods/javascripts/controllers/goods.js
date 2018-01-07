import axios from 'axios'

export async function getGoodsList(url, data = null) {
	let options = {  params: data }
	let result

	try {
		result = await axios.get(url, options)
		return {code: '000', message: '获取失物列表成功', data: result.data.data}
	} catch (e) {
		return {code: '001', message: '获取失物列表失败', error: e}
	}
}