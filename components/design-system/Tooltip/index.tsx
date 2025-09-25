import type { FC } from 'react'

import { TooltipContainer, TooltipText } from './styled'
import type { TooltipProps } from './types'

const Tooltip: FC<TooltipProps> = ({ children, content }) => (
  <TooltipContainer>
    {children}
    <TooltipText $variant='caption'>{content}</TooltipText>
  </TooltipContainer>
)

export default Tooltip
