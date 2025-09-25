import { darkTheme, lightTheme } from 'styles/theme'
import type { Theme, ThemeMode } from 'types/theme'

export const getTheme = (mode: ThemeMode) => {
  return mode === 'dark' ? darkTheme : lightTheme
}

export const setCSSVariables = (element: HTMLElement, theme: Theme) => {
  element.style.setProperty('--pipfy-primary', theme.primary)
  element.style.setProperty('--pipfy-secondary', theme.secondary)
  element.style.setProperty('--pipfy-error', theme.error)
  element.style.setProperty('--pipfy-text', theme.text)
  element.style.setProperty('--pipfy-disabled', theme.disabled)
  element.style.setProperty('--pipfy-black', theme.black)
  element.style.setProperty('--pipfy-white', theme.white)
}
