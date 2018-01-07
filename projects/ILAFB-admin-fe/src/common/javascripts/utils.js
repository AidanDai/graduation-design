import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

export function getUniqueKey() {
	let S4 = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1)
  }

  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4())
}

export function timeSince(time) {
	return moment(time).fromNow()
}