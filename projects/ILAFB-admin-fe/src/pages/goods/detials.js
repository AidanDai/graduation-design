import 'react-hot-loader/patch'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Detials from './detials.page'

let ele = document.querySelector('#content')

ReactDOM.render(
	<AppContainer>
		<Detials/>
	</AppContainer>,
	ele
)

if (module.hot) {
  module.hot.accept('./detials.page.js', () => {
  	const NextDetials = require('./detials.page').default
  	
    ReactDOM.render(
			<AppContainer>
				<NextDetials/>
			</AppContainer>,
			ele
		)
  })
}
