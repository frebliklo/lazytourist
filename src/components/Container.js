import styled, { keyframes } from 'styled-components'

const enterAnimation = keyframes`
  0% {
    scale: 0;
    opacity: 0;
  }
  100% {
    scale: 1;
    opacity: 1;
  }
`

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  transition: all 200ms ease-out;
  margin: 3.2rem 0;
`

export const AnimatedContentContainer = styled(ContentContainer)`
  animation: ${enterAnimation} 300ms ease-out;
`

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin: ${props => props.margin ? props.margin : '0 auto'};
  width: 100%;
  padding: ${props =>  props.padding ? props.padding : '1.6rem'};
  max-width: 40rem;
`

export default Container
