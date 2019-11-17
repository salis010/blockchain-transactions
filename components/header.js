import React from 'react'
import styled from '@emotion/styled'

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  height: 90px;
  background-color: RGB(30, 30, 30);
`

const H1 = styled.h1`
	margin-left: 20px;
	color: RGB(0, 128, 184);
`

export const Header = () =>
  <HeaderDiv>
    <H1>Blockchain Transactions</H1>
  </HeaderDiv>
