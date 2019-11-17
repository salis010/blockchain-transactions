import React from 'react'
import styled from '@emotion/styled'
import { SplashScreen} from './splash-screen'
import { Table } from './table'
import { Addresses } from './addresses'
import { TransactionDetails } from './transaction-details'

const size = "768px"

const Wrapper = styled.div`
  margin-left: 40px;

  @media only screen and (max-width: ${size}) {
    margin-left: 0px;
`

export class Transactions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      addresses: [
        "1DUb2YYbQA1jjaNYzVXLZ7ZioEhLXtbUru",
        "168o1kqNquEJeR9vosUB5fw4eAwcVAgh8P",
        "1D5bPm1YAdn9WvAAixht7PbACU3TtkqtJJ",
        "1Po4J4SNyJuGnMGYJfGTXLEvGgAZKiddr7"
      ],
      currentAddress: "1DUb2YYbQA1jjaNYzVXLZ7ZioEhLXtbUru",
      currentTransaction: null,
      addressData: {},
      transactionDetailsVisible: false,
    }

    this.isDataAvailable = this.isDataAvailable.bind(this)
    this.onChangeAddress = this.onChangeAddress.bind(this)
    this.getAddressData = this.getAddressData.bind(this)
    this.showTransactionDetails = this.showTransactionDetails.bind(this)
    this.onBack = this.onBack.bind(this)
  }

  isDataAvailable() {
    return this.state.addressData !== null && Object.keys(this.state.addressData).length > 0
  }

  onChangeAddress(e) {
    const address = e.target.value

    this.setState( { currentAddress: address } )
  }

  getAddressData() {
    //check if Address data has already been stored in SessionStorage first
    //else fetch
    if(sessionStorage.getItem(this.state.currentAddress) !== null) {

      const data = JSON.parse(sessionStorage.getItem(this.state.currentAddress))

      this.setState( { addressData: data })

    } else {
        fetch(`/get-address-data/${this.state.currentAddress}`)
        .then(res => res.json())
        .then(data => [
          this.setState( { addressData: data }),
          sessionStorage.setItem(this.state.currentAddress, JSON.stringify(data)),
        ])
        .catch(err => console.log(err))
    }
  }

  showTransactionDetails(hash) {
    this.setState( { transactionDetailsVisible: true } )
    this.setState( { currentTransaction: hash } )
  }

  onBack() {
    this.setState( { transactionDetailsVisible: false } )
  }

  componentDidMount() {

    //transaction
    // fetch("https://api.blockcypher.com/v1/btc/main/txs/f854aebae95150b379cc1187d848d58225f3c4157fe992bcd166f58bd5063449")
    //   .then(res => res.json())
    //   .then(data => console.log(data))

    this.getAddressData()

  }

  render() {
    if(this.isDataAvailable()) {
      return(
        <React.Fragment>
          {!this.state.transactionDetailsVisible &&
            <Wrapper>
              <Addresses
                addresses={this.state.addresses}
                onChangeAddress={this.onChangeAddress}
                getAddressData={this.getAddressData}
              />
              <Table title="Today" data={this.state.addressData.today} showTransactionDetails={this.showTransactionDetails}/>
              <Table title="This Week" data={this.state.addressData.thisWeek} showTransactionDetails={this.showTransactionDetails}/>
              <Table title="This Month" data={this.state.addressData.thisMonth} showTransactionDetails={this.showTransactionDetails}/>
              <Table title="This Year" data={this.state.addressData.thisYear} showTransactionDetails={this.showTransactionDetails}/>
              <Table title="Other" data={this.state.addressData.rest} showTransactionDetails={this.showTransactionDetails}/>
            </Wrapper>
          }
          {this.state.transactionDetailsVisible &&
            <TransactionDetails hash={this.state.currentTransaction} onBack={this.onBack} />
          }
        </React.Fragment>
      )
    }
    return <SplashScreen />
  }
}
