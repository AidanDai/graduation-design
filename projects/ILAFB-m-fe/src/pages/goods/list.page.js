import React, {　Component } from 'react'
import { Carousel } from 'antd-mobile'
import config from '../../../config'
import IHeader from '../../components/header'
import IFooter from '../../components/footer'
import { getUniqueKey } from '../../common/javascripts/utils'
import axios from 'axios'
import '../../common/javascripts/flexible.js'
import '../../common/stylesheets/common.less'
import './stylesheets/list.less'

const apisPerfix = `${config.apis.perfix}/${config.apis.version}`

export default class List extends 　Component {

  constructor(...args) {
    super(...args)

    this.state = {
      category: {},
      goods: []
    }
  }

	componentWillMount() {
    this.getGoodsCategory()
    this.getGoods()
  }

  getGoodsCategory() {
    axios.get(`${apisPerfix}/goods-category`).then((res) => {
      let category = this.menuDataFormat(res.data.data)

      this.setState({
        category: category
      })
    }).catch((e) => {
      console.error(e)
    })
  }

  getGoods() {
    axios.get(`${apisPerfix}/goods`).then((res) => {
      this.setState({
        goods: res.data.data
      })
    }).catch((e) => {
      console.error(e)
    })
  }

  menuDataFormat(data = []) {
    let category = {data: [], value: ''}

    data.forEach((v, i) => {
      category.data.push({label: v.name, value: `/goods?category=${v._id}`})
      if (i === 0) {
        category.value = [`/goods?category=${v._id}`]
      }
    })
    return category
  }

  goGoods(data) {
    console.log(data)
    window.location.href = `/goods/${data._id}`
  }

	render() {
    const { goods } = this.state
		const { data, value } = this.state.category
      
		return (
			<div>
				<IHeader 
					menu={true}
					menuData={data}
					menuValue={value}
					home={true} 
					title="Loss Goodses"></IHeader>
				<ul className="list-con">
					{goods.map((v) => (
						<li className="list-item"
            onClick={this.goGoods.bind(this, v)} 
            key={getUniqueKey()}>
							<Carousel
                dots={false}
                autoplay={true}
                infinite
              >
              { (v.images && v.images.graffitied)
                  ? v.images.graffitied.map(
                    (i) => (<img key={getUniqueKey()} src={i} alt="失物"/>)
                  )
                  : (<img src="" alt="失物"/>)
              }
              </Carousel>
						</li>
					))}
				</ul>
				<IFooter></IFooter>
			</div>
		)
	}
}