import React, {　Component } from 'react'
import { Menu, NavBar } from 'antd-mobile'
import config from '../../../config'

import '../../common/javascripts/flexible.js'
import '../../common/stylesheets/common.less'
import './index.less'

export default class IHeader extends 　Component {

	constructor(...args) {
		super(...args)

		const { data, value } = config.menus
		this.state = {
			initData: this.props.menuData || data,
			initValue: this.props.menuValue || value,
			show: false
		}
	}

	handleRightClick() {
		window.location.href = '/'
	}

	handleLeftClick(e) {
		const { data, value } = config.menus

		e.preventDefault()

    this.setState({
      show: !this.state.show,
      initData: this.props.menuData || data, 
      initValue: this.props.menuValue || value
    })
	}

	handleChange(item){
		window.location.href = item[0]
	}

	render() {
		const { show, initData, initValue} = this.state
		const { 
			title = 'Intelligent Last & Found', 
			menu = false,
			home = false
		} = this.props
		
		const menuEle = (
			<Menu
				className="main-menu"
				data={initData}
				value={initValue}
				level={1}
				height={initData.length * 42}
				onChange={this.handleChange.bind(this)}
			></Menu>
		)

		return (
			<header className={ show ? 'menu-active' : '' }>
				<NavBar
          mode="dark"
          onLeftClick={this.handleLeftClick.bind(this)}
          iconName={false}
          leftContent={
          	menu
          	? (<i className="fa fa-list" 
          		aria-hidden="true"
          	></i>)
          	: ''
          }
          rightContent={
          	home 
          	? (<i
	          	onClick={this.handleRightClick.bind(this)}
	          	className="fa fa-home" 
	          	aria-hidden="true"></i>)
          	: ''
          }
				>
					{title}
				</NavBar>
				 {show ? menuEle : null}
			</header>
		)
	}
}