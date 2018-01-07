import React, {　Component } from 'react'

import '../../common/stylesheets/common.less'
import './index.less'

export default class IFooter extends 　Component {

	render() {
		let date = new Date()

		return (
			<footer>
				<p>Copyright © ILAFB {date.getFullYear()}</p>
			</footer>
		)
	}
}