import 'react-hot-loader/patch'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Home from './list.page'

let ele = document.querySelector('#content')

ReactDOM.render(
	<AppContainer>
		<Home/>
	</AppContainer>,
	ele
)

if (module.hot) {
  module.hot.accept('./list.page.js', () => {
  	const NextHome = require('./list.page').default
  	
    ReactDOM.render(
			<AppContainer>
				<NextHome/>
			</AppContainer>,
			ele
		)
  })
}
