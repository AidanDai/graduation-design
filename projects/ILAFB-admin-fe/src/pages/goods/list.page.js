import React, {　Component } from 'react'
import { Carousel, Pagination, Select } from 'antd'
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
export default class Home extends 　Component {

  constructor(...args) {
    super(...args)

    this.state = {
      goods: []
    }
  }

  componentDidMount() {
    axios.get(`${apisVersion}/goods`).then((res) => {
      this.setState({
        goods: res.data.data
      })
    }).catch((e) => {
      console.error(e)
    })
  }

	pageChange(pageNumber) {
		console.log(pageNumber)
	}

	toGoods(id) {
		window.location.href = `/admin/goods/${id}`
	}

  selectChange(value) {
    console.log(value)
  }

  renderSelect() {
    const Option = Select.Option
    return (
      <Select
        style={{ width: 200 }}
        defaultValue="1"
        onChange={this.selectChange.bind(this)}
      >
        <Option value="0">成功领取</Option>
        <Option value="1">等待领取</Option>
        <Option value="2">领取失败</Option>
      </Select>
    )
  }
	render() {
		const breadcrumb = [
			{label: '失物'},
			{label: '失物管理'}
		]
    const { goods } = this.state

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
							{goods.map((v) => (
								<Carousel
									key={getUniqueKey()} 
									className="imgs-con"
								>
							    {
							    	v.images.graffitied.map((i) => {
							    		return (
							    			<div className="img-cont" key={getUniqueKey()}>
							    				<img onClick={this.toGoods.bind(this, v._id)} src={'http://127.0.0.1:3000' + i} alt={v.title}/>
							    			</div>
							    		)
							    	})
							    }
							  </Carousel>
							))}
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