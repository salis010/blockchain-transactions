import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: RGB(0, 128, 184, 0.8);
`

const Prompt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50vh;
  background-color: white;
  border-radius: 20px;
`

export const SplashScreen = () =>
  <Wrapper>
    <Prompt>
      <h2>Data loading...</h2>
    </Prompt>
  </Wrapper>
