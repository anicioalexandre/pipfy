import styled from 'styled-components'

const AnimatedTransition = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: opacity 0.5s ease;
  animation: ${(props) => (props.$isVisible ? 'fadeIn 0.5s forwards' : 'fadeOut 0.5s forwards')};
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.$isVisible ? 'auto' : 'none')};

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(224px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-448px);
    }
  }
`

export default AnimatedTransition
