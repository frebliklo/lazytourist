import React from 'react'
import styled from 'styled-components'

import { colors } from '../../theme'

import NavItem from './NavItem'
import routes from './routes'

const NavContainer = styled.nav`
  position: fixed;
  top: auto;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: ${colors.primary};

  & .active {
    color: ${colors.blue['000']};
    opacity: 1;
  }

  @media (min-width: 720px) {
    background: none;
    position: relative;
    align-self: flex-end;
    margin: 3.2rem;
  }
`

const Nav = () => (
  <NavContainer>
    {routes.map(route => (
      <NavItem
        key={route.label}
        path={route.path} 
        label={route.label} 
        icon={route.icon} 
      />
    ))}
  </NavContainer>
)

export default Nav
