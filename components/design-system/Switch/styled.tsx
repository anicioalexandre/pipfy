import styled from 'styled-components'

export const Switcher = styled.div`
  position: relative;
  width: 35px;
  height: 18px;
  background: var(--pipfy-disabled);
  border-radius: 32px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 35px;
    top: 50%;
    left: -12px;
    background: var(--pipfy-secondary);
    transform: translate(15px, -50%);
  }
`

export const Label = styled.label`
  align-items: center;
  cursor: pointer;
  display: grid;
  gap: 10px;
  grid-template-columns: 150px 35px;
`

export const Input = styled.input`
  display: none;

  &:checked + ${Switcher} {
    background: var(--pipfy-primary);
    &:before {
      transform: translate(32px, -50%);
    }
  }
`
