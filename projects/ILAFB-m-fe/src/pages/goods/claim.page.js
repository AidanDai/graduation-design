import React, {　Component } from 'react'
import { Carousel, List, Radio, Button, Toast, Modal } from 'antd-mobile'
import config from '../../../config'
import IHeader from '../../components/header'
import IFooter from '../../components/footer'
import { getUniqueKey } from '../../common/javascripts/utils'
import axios from 'axios'
import '../../common/javascripts/flexible.js'
import '../../common/stylesheets/common.less'
import './stylesheets/claim.less'

const apisPerfix = `${config.apis.perfix}/${config.apis.version}`
const RadioItem = Radio.RadioItem

export default class Claim extends 　Component {

  constructor(...args) {
    super(...args)

    this.userAnswer = {}
    this.state = {
      goods: null,
      modal: false
    }
  }

	componentWillMount() {
    this.getGoods()
  }

  getGoods() {
    let path = window.location.pathname
    let id = path.slice(path.indexOf('goods/') + 6)

    axios.get(`${apisPerfix}/goods/${id}`).then((res) => {
      this.setState({
        goods: res.data.data
      })
    }).catch((e) => {
      console.error(e)
    })
  }

  checkedAnswer(qi, oi) {
    this.setState((preS) => {
      preS.goods.valid_questions[qi].options.map((v, i) => {
        if(oi === i) {
          this.userAnswer[qi] = v
        }
        v.checked = oi === i
      })
      return preS
    })
  }

  claimSubmit() {
    if (Object.keys(this.userAnswer).length !== this.state.goods.valid_questions.length) {
      Toast.info('请选择答案', 3.5)
      return
    }
    if (this.state.goods.level !== 0) {
     this.setState({modal: true})
     return
    }
    axios.get(`${apisPerfix}/claim-goods`).then((res) => {
      Toast.info(res.data.message, 3.5)
    }).catch((e) => {
      console.error(e)
    })
  }

  onClose() {
    this.setState({modal: false})
  }

	render() {
    const { goods } = this.state

		return (
			<div>
				<IHeader 
					menu={true}
					home={true} 
					title="Claim Goodses"></IHeader>
				<ul className="list-con">
					<li className="list-item">
            {
              (goods && goods.images && goods.images.graffitied)
                ? goods.images.graffitied.map(
                  (i) => (<img key={getUniqueKey()} src={i} alt="失物"/>)
                )
                : (<img src="" alt="失物"/>)
            
            }
					</li>
          {
            goods && goods.valid_questions.map((v, qi) => {
              const title = (qi + 1) + `、` + v.name
              return (
                <li className="detial-questions-item" 
                key={getUniqueKey()}>
                  <List renderHeader={title}>
                    {
                      v.options.map((i, oi) => {
                        return (
                          <RadioItem checked={i.checked}
                          onChange={this.checkedAnswer.bind(this, qi, oi)}>
                            {i.title}
                          </RadioItem>
                        )
                      })
                    }
                  </List>
                </li>
              )
            })
          }
				</ul>
        <div className="claim-submit-btn">
          <Button className="btn" type="primary" onClick={this.claimSubmit.bind(this)}>确认认领</Button>
        </div>
				<IFooter></IFooter>
        <Modal
          title="认领成功"
          transparent
          maskClosable={false}
          visible={this.state.modal}
          onClose={this.onClose.bind(this)}
          footer={[{ text: '确定', onPress: this.onClose.bind(this)}]}
        >
          贵重物品，请到失物招领所领取！
        </Modal>
			</div>
		)
	}
}