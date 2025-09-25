import { useEffect, useState } from 'react'

import { DEFAULT_PIPFY_SETTINGS, PIPFY_SETTINGS_KEY } from 'constants/settings'
import type { PiPfySettings } from 'types/settings'
import { getPiPfySettings, setPiPfySettings } from 'utils/settings'
import { getPiPfyElement } from 'utils/dom'
import { getTheme, setCSSVariables } from 'utils/theme'

const useSettings = () => {
  const [settings, setSettings] = useState<PiPfySettings>(DEFAULT_PIPFY_SETTINGS)

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local') {
      const previousSettings = changes[PIPFY_SETTINGS_KEY]?.oldValue
      const newSettings = changes[PIPFY_SETTINGS_KEY]?.newValue

      const isThemeModeChanged = previousSettings?.themeMode !== newSettings?.themeMode
      console.log('isThemeModeChanged', isThemeModeChanged)
      if (isThemeModeChanged) {
        const element = getPiPfyElement()
        const theme = getTheme(newSettings.themeMode)
        setCSSVariables(element, theme)
      }

      if (newSettings) {
        setSettings(newSettings)
      }
    }
  })

  const handleSetSettings = async (newSettings: Partial<PiPfySettings>) => {
    await setPiPfySettings(newSettings)
  }

  useEffect(() => {
    getPiPfySettings().then((settings) => {
      setSettings(settings)
    })
  }, [])

  return { settings, setSettings: handleSetSettings }
}

export default useSettings
