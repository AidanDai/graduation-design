import React, {　Component } from 'react'
import { Pagination } from 'antd'

import '../../common/stylesheets/common.less'
import './index.less'

export default class IPagination extends 　Component {

	pageChange(pageNumber) {
		this.props.pageChange && this.props.pageChange(pageNumber)
	}

	render() {
		const { total, currentPage } = this.props

		return (
			<Pagination className="IPagination" showQuickJumper defaultCurrent={currentPage} total={total} onChange={this.pageChange.bind(this)} />
		)
	}
}