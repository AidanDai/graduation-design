import 'react-hot-loader/patch'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Us from './us.page'

let ele = document.querySelector('#content')

ReactDOM.render(
	<AppContainer>
		<Us/>
	</AppContainer>,
	ele
)

if (module.hot) {
  module.hot.accept('./us.page.js', () => {
  	const NextUs = require('./us.page').default
  	
    ReactDOM.render(
			<AppContainer>
				<NextUs/>
			</AppContainer>,
			ele
		)
  })
}
