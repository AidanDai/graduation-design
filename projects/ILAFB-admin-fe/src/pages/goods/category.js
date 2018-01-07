import 'react-hot-loader/patch'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Home from './category.page'

let ele = document.querySelector('#content')

ReactDOM.render(
	<AppContainer>
		<Home/>
	</AppContainer>,
	ele
)

if (module.hot) {
  module.hot.accept('./category.page.js', () => {
  	const NextHome = require('./category.page').default
  	
    ReactDOM.render(
			<AppContainer>
				<NextHome/>
			</AppContainer>,
			ele
		)
  })
}
