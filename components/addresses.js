import React from 'react'
import styled from '@emotion/styled'

const size = "768px"

const Section = styled.section`
  display: flex;
  justify-content: center;
  margin: 50px 0 0 0;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 80px;
  background-color: RGB(0, 128, 184);
  border-radius: 4px;

  @media only screen and (max-width: ${size}) {
      flex-direction: column;
      justify-content: space-between;
      width: 90%;
      height: 200px;
  }
`

const H2 = styled.h2`
  margin: 0 20px 0 0;
  color: RGB(240, 240, 240);

  @media only screen and (max-width: ${size}) {
    margin: 20px 0 0 0;
  }
`

const Select = styled.select`
  height: 2.5em;
  color: RGB(70, 70, 70);
  background-color: white;
  border: 1px solid #f2f2f2;
  border-radius: 4px;

  @media only screen and (max-width: ${size}) {
    width: 80%;
  }
`

const Button = styled.button`
  font-weight: 800;
  height: 2.5em;
  margin: 0 0 0 20px;
  color: RGB(240, 240, 240);
  background-color: RGB(180, 180, 180);
  border: none;
  border-radius: 4px;
  outline: none;

  @media only screen and (max-width: ${size}) {
    width: 80%;
    margin: 0 0 30px 0;
  }
`

export const Addresses = (props) =>
  <Section>
    <Wrapper>
      <H2>Select Address:</H2>
      <Select onChange={props.onChangeAddress}>
        {props.addresses.map(address => <option key={address}value={address}>{address}</option>)}
      </Select>
      <Button onClick={props.getAddressData}>Get Data</Button>
    </Wrapper>
  </Section>
