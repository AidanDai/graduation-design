import React, {　Component } from 'react'
import { Flex, Button, Toast } from 'antd-mobile'
import IHeader from '../../components/header'
import IFooter from '../../components/footer'
import config from '../../../config'
import axios from 'axios'
import '../../common/javascripts/flexible.js'
import '../../common/stylesheets/common.less'
import './stylesheets/home.less'

const apisPerfix = `${config.apis.perfix}/${config.apis.version}`

export default class Home extends 　Component {

	handleClaimClick() {
		window.location.href = '/login'
	}

	handleDeliveryClick() {
		axios.get(`${apisPerfix}/delivery-goods`).then((res) => {
			Toast.info(res.data.message, 3.5)
		}).catch((e) => {
			console.error(e)
		})
	}

	render() {
		return (
			<Flex direction="column" className="flex-con">
				<Flex.Item>
					<IHeader 
					></IHeader>
				</Flex.Item>
				<Flex.Item className="btns-con">
					<Flex className="btns-flex-con" direction="column" justify="center" align="center">
						<Flex.Item className="btns-flex-item">
							<Button onClick={this.handleDeliveryClick.bind(this)} className="btn delivery" type="primary">我要投递</Button>
						</Flex.Item>
						<Flex.Item className="btns-flex-item">
							<Button onClick={this.handleClaimClick.bind(this)} className="btn claim" type="primary">我要认领</Button>
						</Flex.Item>
					</Flex>
				</Flex.Item>
				<Flex.Item><IFooter></IFooter></Flex.Item>
			</Flex>
		)
	}
}