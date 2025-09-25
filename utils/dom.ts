export const getPiPfyElement = (): HTMLElement => document.querySelector('pipfy-element')

export const injectGlobalStyles = () => {
  const styleId = 'pipfy-global-styles'

  // Check if the styles are already injected
  if (document.getElementById(styleId)) {
    return
  }

  const style = document.createElement('style')
  style.id = styleId
  style.textContent = `
    @keyframes pipfy-animation {
      0% {
        background: #2f2f2f;
        opacity: 0.8;
      }
      50% {
        background: #4b4b4b;
        opacity: 0.5;
      }
      100% {
        background: #2f2f2f;
        opacity: 0.8;
      }
    }
  `

  document.head.appendChild(style)
}
