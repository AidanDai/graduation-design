import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import config from '../../../config'
import { getUniqueKey } from '../../common/javascripts/utils'

import './index.less'

const SubMenu = Menu.SubMenu

export default class IMenu extends Component {

	handleClick(item) {
		window.location.href = item.key
	}

	renderChildrenMenu(data) {
		return data.map((v) => {
			return (
				<Menu.Item key={v.value}>{v.label}</Menu.Item>
			)
		})
	}

	render(){
		const { data } = config.menus


		return (
			<Menu 
				onClick={this.handleClick.bind(this)}
				className="main-menu" 
				style={{width: 100}} 
				mode="vertical"
			>
				{
					data.map((m) => {
						return (
							<SubMenu key={getUniqueKey()} 
								title={m.label}>
								{this.renderChildrenMenu(m.children)}
							</SubMenu>
						)
					})
				}
		  </Menu>
		)
	}
}