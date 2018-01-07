import React, {　Component } from 'react'
import { Table, Pagination, Select } from 'antd'
import IHeader from '../../components/header'
import IMenu from '../../components/menu'
import IPagination from '../../components/pagination'
import IBreadcrumb from '../../components/breadcrumb'
import IFooter from '../../components/footer'
import config from '../../../config'
import { getUniqueKey } from '../../common/javascripts/utils'
import axios from 'axios'

import '../../common/stylesheets/common.less'
import './stylesheets/list.less'

const apisVersion = `${config.apis.perfix}/${config.apis.version}`

const dataSource = [
  {
    key: getUniqueKey(),
    _id: getUniqueKey(),
    name: '文具类',
    status: '正常'
  },
  {
    key: getUniqueKey(),
    _id: getUniqueKey(),
    name: '书籍类',
    status: '正常'
  },
  {
    key: getUniqueKey(),
    _id: getUniqueKey(),
    name: '金属类',
    status: '正常'
  },
  {
    key: getUniqueKey(),
    _id: getUniqueKey(),
    name: '卡片类',
    status: '正常'
  }
]

const columns = [
  {
    title: '分类ID',
    dataIndex: '_id',
    key: '_id',
    width: 300
  }, 
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
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

  componentDidMount() {
    axios.get(`${apisVersion}/goods/category`).then((res) => {
      if (res.data.code === '000') {
        console.log(res.data.date)
      } else {
        console.error(res.data)
      }
    }).catch((e) => {
      console.error(e)
    })
  }

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
        defaultValue="0"
        onChange={this.selectChange.bind(this)}
      > 
        <Option value="-1" >删除</Option>
        <Option value="0" >正常</Option>
        <Option value="1">禁用</Option>
      </Select>
    )
  }
	render() {
		const breadcrumb = [
			{label: '失物'},
			{label: '分类管理'}
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