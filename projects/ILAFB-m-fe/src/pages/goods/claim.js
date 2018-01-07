import 'react-hot-loader/patch'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Claim from './claim.page'

let ele = document.querySelector('#content')

ReactDOM.render(
	<AppContainer>
		<Claim/>
	</AppContainer>,
	ele
)

if (module.hot) {
  module.hot.accept('./claim.page.js', () => {
  	const NextClaim = require('./claim.page').default
  	
    ReactDOM.render(
			<AppContainer>
				<NextClaim/>
			</AppContainer>,
			ele
		)
  })
}
