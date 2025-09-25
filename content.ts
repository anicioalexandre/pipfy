import '@webcomponents/custom-elements'

import { getPiPfySettings } from 'utils/settings'
import { getTheme, setCSSVariables } from 'utils/theme'

import { PiPfyElement } from './pipfy-element'

const initialize = async () => {
  window.customElements.define('pipfy-element', PiPfyElement)
  const element = document.createElement('pipfy-element')

  // TODO: grabing theme mode from the browser settings is not working
  // const isBrowserOnDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  const { themeMode } = await getPiPfySettings()
  const theme = getTheme(themeMode)

  setCSSVariables(element, theme)

  document.documentElement.append(element)
}

initialize()

export {}
