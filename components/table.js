import React from 'react'
import styled from '@emotion/styled'
import * as fns from 'date-fns'

const size = "768px"

const Section = styled.section`

  margin-top: 50px;
`

const Wrapper = styled.div`
  @media only screen and (max-width: ${size}) {
    display: flex;
    justify-content: center;
  }
`

const H2 = styled.h2`
  color: RGB(120, 120, 120);

  @media only screen and (max-width: ${size}) {
    margin-left: 20px;
  }
`

const GroupTable = styled.table`
  border: 1px solid RGB(0, 128, 184);
  border-collapse: collapse;

  @media only screen and (max-width: ${size}) {
    width: 95%;
  }
`

const TH = styled.tr`
  font-weight: 800;
  height: 2em;
  padding-left: 10px;
  color: RGB(240, 240, 240);
  background-color: RGB(0, 128, 184);
  border-radius: 4px;
`

const TR = styled.tr`
  height: 1.8em;
  &:nth-of-type(odd) {
    background-color: #f2f2f2;
  }
`

const TD = styled.td`
  padding: 0 8px 0 8px;
  overflow: hidden;

  @media only screen and (max-width: ${size}) {
    max-width: 250px;
  }

`

const Hash = styled.label`
  color: RGB(0, 128, 184);
  &:hover {
    color: RGB( 0, 166, 222);
    cursor: pointer;
  }
`

function formatDate(date) {

  const d = new Date(date)

  return fns.format(d, 'dd/MM/yyyy')
}

export const Table = (props) => {

  const hasData = props.data !== undefined

  if(hasData) {
    return (
      <Section>
        <H2>{props.title}</H2>
        <Wrapper>
          {props.data.txs.length > 0 ?
            <GroupTable>
              <tbody>
                <TH><TD>Transaction</TD><TD>Date</TD></TH>
                {props.data.txs.map((tx, i) =>
                  <TR key={i}>
                    <TD>
                      <Hash onClick={() => props.showTransactionDetails(tx.block_hash)}>
                        {tx.block_hash}
                      </Hash>
                    </TD>
                    <TD>{formatDate(tx.date)}</TD>
                  </TR>)}
              </tbody>
            </GroupTable>
            :
            <GroupTable>
              <tbody>
                <TH><TD>No Transactions</TD><TD></TD></TH>

              </tbody>
            </GroupTable>
          }
        </Wrapper>
      </Section>
    )
  }
  return null
}
