import styled from 'styled-components'

import Text from '../Text'

export const TooltipContainer = styled.div`
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: inline-block;
  position: relative;

  &:hover p {
    opacity: 1;
    visibility: visible;
  }
`

export const TooltipText = styled(Text)`
  background-color: var(--pipfy-primary);
  border-radius: 6px;
  bottom: 100%; /* Adjust as needed */
  color: var(--pipfy-secondary);
  left: 70%;
  opacity: 0;
  padding: 4px;
  pointer-events: none;
  position: absolute;
  text-align: center;
  transform: translateX(-70%);
  transition: opacity 0.3s;
  visibility: hidden;
  width: 180px;
  z-index: 1;
`
