import React, {　Component } from 'react'

import '../../common/javascripts/flexible.js'
import '../../common/stylesheets/common.less'
import './stylesheets/404.less'

export default class Error404 extends 　Component {

	render() {		
		return (
			<div id="content" className="error-wrap">
		    <img src="http://i-fantuan.guokr.net/Ftw07tnQaZu0_KepWmWb0r6hExez" 
		    	alt="404 logo" 
		    />
		    <p>{ tip }</p>
		    <p>{ message }</p>
		    <a
		      href="/"
		      class="btn btn-nofill btn-primary"
		    >
		      返回首页
		    </a>
			</div>
		)
	}
}