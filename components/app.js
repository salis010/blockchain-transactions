import React from 'react'
import { Header } from './header'
import { Transactions } from './transactions'
import { Footer } from './footer'

export const App = () =>
	<React.Fragment>
		<Header />
		<Transactions />
		<Footer />
	</React.Fragment>
