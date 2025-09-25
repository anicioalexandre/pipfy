import styled from 'styled-components'

import type { TextVariant } from './types'
import { FONT_SIZE_VARIANT_MAP, FONT_WEIGHT_VARIANT_MAP } from './constants'

const Text = styled.p<{ $variant?: TextVariant }>`
  color: var(--pipfy-primary);
  font-family: monospace;
  font-size: ${(props) => FONT_SIZE_VARIANT_MAP[props.$variant]};
  font-weight: ${(props) => FONT_WEIGHT_VARIANT_MAP[props.$variant]};
  line-height: normal;
  margin: 0;
  text-align: center;
`
Text.defaultProps = {
  $variant: 'body1',
}

export default Text
