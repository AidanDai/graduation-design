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
    key: getUniqueKey(),
    _id: getUniqueKey(),
    address: '西湖区湖底公园1号',
    status: '正常'
  }, {
    key: getUniqueKey(),
    _id: getUniqueKey(),
    address: '西湖区湖底公园1号',
    status: '正常'
  }]

const columns = [
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
    width: 300
  }, 
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
    width: 500
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 200
  },
  {
    title: '操作',
    key: 'action',
    width: 200,
    render: (text, record) => (
      <div>
        <a href="#">禁用</a>
        <span> </span>
        <a href="#">删除</a>
      </div>
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
			{label: '失物箱'},
			{label: '失物箱管理'}
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