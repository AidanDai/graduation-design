import React, {　Component } from 'react'
import { Breadcrumb } from 'antd'
import { getUniqueKey } from '../../common/javascripts/utils'

import '../../common/stylesheets/common.less'
import './index.less'

export default class IBreadcrumb extends 　Component {

	render() {
		const breadcrumb = this.props.breadcrumb || []
		
		return (
			<div className="breadcrumb-fun">
				<Breadcrumb className="breadcrumb">
					{
						breadcrumb.map((v) => {
			    		return (
			    			<Breadcrumb.Item key={getUniqueKey()}>
			    				{
			    					v.url
			    						? <a href={v.url} target="_self">{v.label}</a>
			    						: v.label
			    				}
			    			</Breadcrumb.Item>
			    		)
						})
					}
			  </Breadcrumb>
		  	<div className="children">{this.props.children}</div>
			</div>
		)
	}
}