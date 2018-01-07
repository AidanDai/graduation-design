import 'react-hot-loader/patch'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Error404 from './404.page'

let ele = document.querySelector('#content')

ReactDOM.render(
	<AppContainer>
		<Error404　pageData={pageData} />
	</AppContainer>,
	ele
)

if (module.hot) {
  module.hot.accept('./404.page.js', () => {
  	const NextError404 = require('./404.page').default
  	
    ReactDOM.render(
			<AppContainer>
				<NextError404 pageData={pageData} />
			</AppContainer>,
			ele
		)
  })
}
