const express = require('express')
const fetch = require('node-fetch')
const trimData = require('./util/trim-data').trimData

const app = express()

app.use(express.static(__dirname))

app.get('/get-address-data/:address', function (request, response) {

	const address = request.params.address

	fetch(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/full`)
    .then(res => res.json())
		.then(data => trimData(data))
		.then(data => response.send(data))
		.then(() => console.log(`Request for ${address}processed`))
		.catch(err => response.send(err))
})

app.get('/get-transaction-details/:hash', function (request, response) {
	const hash = request.params.hash

	//hard-coded
	const transactionDetails = {
		hash: 1234567890,
		total: 178364,
		fees: "0.09876BTC",
		size: 87434
	}

	fetch(`https://api.blockcypher.com/v1/btc/main/txs/${hash}`)
		//.then(res => res.json())
		.then(response.send(transactionDetails))
		.catch(err => response.send(err))
})

app.listen(3000, function () {
	console.log('Listening on port 3000...')
});
