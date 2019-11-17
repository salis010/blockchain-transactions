import React from 'react'
import styled from '@emotion/styled'


const H2 = styled.h2`
  margin-left: 60px;
  color: RGB(120, 120, 120);
`

const Section = styled.section`
  margin-left: 80px;
  margin-bottom: 40px;
`

const P = styled.p`
  margin-left: 20px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`

const BackButton = styled.button`
  font-size: 1.5em;
  font-weight: 800;
  height: 2em;
  min-width: 400px;
  color: RGB(240, 240, 240);
  background-color: RGB(0, 128, 184);
  border: none;
  border-radius: 4px;
  outline: none;
`

export class TransactionDetails extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      tx: {
        hash: props.hash,
        total: 0,
        fees: 0,
        size: 0,
      }
    }
  }

  componentDidMount() {
    fetch(`/get-transaction-details/${this.state.tx.hash}`)
      .then(res => res.json())
      .then(data => this.setState( { tx: data } ))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <React.Fragment>
        <H2>Transaction Details</H2>
          <Section>
            <h3>Hash</h3>
            <P>{this.state.tx.hash}</P>
          </Section>
          <Section>
            <h3>Total</h3>
            <P>{this.state.tx.total}</P>
          </Section>
          <Section>
            <h3>Fees</h3>
            <P>{this.state.tx.fees}</P>
          </Section>
          <Section>
            <h3>Size</h3>
            <P>{this.state.tx.size}</P>
          </Section>
          <ButtonWrapper>
            <BackButton onClick={this.props.onBack}>Back</BackButton>
          </ButtonWrapper>
      </React.Fragment>
    )
  }
}
