import styled from 'styled-components'

import { BACKGROUND_VARIANT_MAP, BORDER_VARIANT_MAP, COLOR_VARIANT_MAP } from './constants'
import type { ButtonVariant } from './types'

const Button = styled.button<{ $variant?: ButtonVariant }>`
  align-items: center;
  background-color: ${(props) => BACKGROUND_VARIANT_MAP[props.$variant]};
  border-radius: 24px;
  border: ${(props) => BORDER_VARIANT_MAP[props.$variant]};
  color: ${(props) => COLOR_VARIANT_MAP[props.$variant]};
  display: flex;
  font-family: monospace;
  font-weight: 700;
  justify-content: center;
  max-width: 200px;
  min-height: 48px;
  padding: 0px 24px;
  text-align: center;
  width: 100%;

  &:not(:disabled):hover {
    opacity: 0.9;
    cursor: pointer;
  }

  &:disabled {
    background-color: var(--pipfy-disabled);
    cursor: not-allowed;
  }
`
Button.defaultProps = {
  $variant: 'contained',
}

export default Button
