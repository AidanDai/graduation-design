import 'react-hot-loader/patch'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import List from './list.page'

let ele = document.querySelector('#content')

ReactDOM.render(
	<AppContainer>
		<List/>
	</AppContainer>,
	ele
)

if (module.hot) {
  module.hot.accept('./list.page.js', () => {
  	const NextList = require('./list.page').default
  	
    ReactDOM.render(
			<AppContainer>
				<NextList/>
			</AppContainer>,
			ele
		)
  })
}
