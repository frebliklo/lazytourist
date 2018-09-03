import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../../theme';

const Wrapper = styled(NavLink)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 6.8rem;
  height: 100%;
  padding: .6rem;
  color: ${colors.white};
  text-align: center;
  opacity: .6;
  transition: opacity 150ms ease-in, color 150ms ease-in;

  &:hover {
    color: ${colors.blue['000']};
    opacity: 1;
    transition: opacity 180ms ease-out, color 180ms ease-out;
  }

  @media (min-width: 720px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-width: auto;
    padding: .8rem;

    &:not(:first-child) {
      margin-left: 1.6rem;
    }
  }
`

const Label = styled.h3`
  color: currentColor;
  font-size: 1.2rem;
  font-weight: 400;
  text-decoration: none;

  @media (min-width: 720px) {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 2.4rem;
  }
`

const Icon = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  margin-bottom: .4rem;

  & svg {
    width: 100%;
    height: 100%;

    & path {
      fill: currentColor;
    }

  }

  @media (min-width: 720px) {
    display: none;
  }
`

const NavItem = ({ path, label, icon }) => (
  <Wrapper exact to={path} activeClassName="active">
    <Icon>{icon}</Icon>
    <Label>{label}</Label>
  </Wrapper>
)

export default NavItem
