import styled from 'styled-components'

const IconButton = styled.button`
  align-items: center;
  background-color: transparent;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  padding: 0;

  &:not(:disabled):hover {
    opacity: 0.9;
    cursor: pointer;
  }

  &:disabled {
    background-color: var(--pipfy-disabled);
    cursor: not-allowed;
  }
`

export default IconButton
