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

const dataSource = [{
  key: '1',
  name: '胡彦斌',
  address: '西湖区湖底公园1号',
  identify: '普通用户'
}, {
   key: '1',
  name: '胡彦斌',
  address: '西湖区湖底公园1号',
  identify: '普通用户'
}]

const columns = [
  {
    title: '用户昵称',
    dataIndex: 'name',
    key: 'name',
    width: 300
  }, 
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
    width: 500
  },
  {
    title: '身份',
    dataIndex: 'identify',
    key: 'identify',
    width: 200
  },
  {
    title: '操作',
    key: 'action',
    width: 200,
    render: (text, record) => (
      <a href="#">设置为管理员</a>
    )
  }
]

export default class Home extends 　Component {

  pageChange(pageNumber) {
    console.log(pageNumber)
  }

  selectChange(value) {
    console.log(value)
  }

  renderSelect() {
    const Option = Select.Option
    return (
      <Select
        style={{ width: 200 }}
        defaultValue="admin"
        onChange={this.selectChange.bind(this)}
      >
        <Option value="admin" >管理员</Option>
        <Option value="user">普通用户</Option>
      </Select>
    )
  }
	render() {
		const breadcrumb = [
			{label: '用户'},
			{label: '用户管理'}
		]

		return (
			<div className="page">
				<IMenu></IMenu>
				<section className="page-main">
					<IHeader></IHeader>
					<div className="page-content">
						<IBreadcrumb 
              children={this.renderSelect()}
							breadcrumb={breadcrumb}
						></IBreadcrumb>
						<div className="goods-con">
              <Table dataSource={dataSource} columns={columns} pagination={false}/>
						</div>
            <IPagination 
              pageChange={this.pageChange.bind(this)}
              total={500} 
              currentPage={1} >
            </IPagination>
						<IFooter></IFooter>
					</div>
				</section>
			</div>
		)
	}
}