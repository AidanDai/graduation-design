import React, {　Component } from 'react'
import { Table, Pagination, Select } from 'antd'
import IHeader from '../../components/header'
import IMenu from '../../components/menu'
import IPagination from '../../components/pagination'
import IBreadcrumb from '../../components/breadcrumb'
import IFooter from '../../components/footer'
import config from '../../../config'
import { getUniqueKey } from '../../common/javascripts/utils'

import '../../common/stylesheets/common.less'
import './stylesheets/list.less'

export default class Us extends 　Component {

	render() {
		const breadcrumb = [
			{label: '关于'},
			{label: '关于我们'}
		]

		return (
			<div className="page">
				<IMenu></IMenu>
				<section className="page-main">
					<IHeader></IHeader>
					<div className="page-content">
						<IBreadcrumb 
							breadcrumb={breadcrumb}
						></IBreadcrumb>
						<div className="goods-con">
              <h1>智能失物招领系统 - 失物管理平台</h1>
						</div>
						<IFooter></IFooter>
					</div>
				</section>
			</div>
		)
	}
}