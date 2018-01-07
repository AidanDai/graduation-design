import React, {　Component } from 'react'
import { Dropdown, Menu, Icon } from 'antd'
import config from '../../../config'

import '../../common/stylesheets/common.less'
import './index.less'

export default class IHeader extends 　Component {

	renderMenu() {
		return (
		  <Menu>
		    <Menu.Item>
		      <a target="_self" rel="noopener noreferrer" href="/admin/users/logout">退出</a>
		    </Menu.Item>
		  </Menu>
		)
	}

	render() {
		return (
			<header>
				<h1>智能失物招领系统 - 失物管理平台</h1>
				<div className="logout-menu">
					<Dropdown overlay={this.renderMenu()}>
				    <Icon type="user"></Icon>
				  </Dropdown>
				</div>
			</header>
		)
	}
}