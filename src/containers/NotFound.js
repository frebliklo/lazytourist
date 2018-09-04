import React from 'react'

import Container, { ContentContainer } from '../components/Container'
import ScreenTitle from '../components/ScreenTitle'

const NotFound = () => (
  <Container>
    <ContentContainer justify="center">
      <ScreenTitle>404 - Page not found</ScreenTitle>
      <p>You found something that didn't exist</p>
    </ContentContainer>
  </Container>
)

export default NotFound
