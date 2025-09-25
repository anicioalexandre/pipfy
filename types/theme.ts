import { THEME_MODE } from 'constants/theme'

import type { ValueOf } from './typescript'

export type ThemeMode = ValueOf<typeof THEME_MODE>

export type Theme = {
  primary: string
  secondary: string
  error: string
  text: string
  disabled: string
  black: string
  white: string
}
