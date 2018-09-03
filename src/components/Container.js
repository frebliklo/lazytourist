import styled from 'styled-components'

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
