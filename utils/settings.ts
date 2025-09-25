import { DEFAULT_PIPFY_SETTINGS, PIPFY_SETTINGS_KEY } from 'constants/settings'
import type { PiPfySettings } from 'types/settings'

export const getPiPfySettings = (): Promise<PiPfySettings> => {
  return new Promise((resolve) => {
    chrome.storage.local.get([PIPFY_SETTINGS_KEY], (result) => {
      if (chrome.runtime.lastError) {
        console.error('Error getting settings:', chrome.runtime.lastError)
        return resolve(DEFAULT_PIPFY_SETTINGS)
      }
      const settings = result[PIPFY_SETTINGS_KEY] || DEFAULT_PIPFY_SETTINGS
      resolve(settings)
    })
  })
}

export const setPiPfySettings = (
  newSettings: Partial<PiPfySettings>,
): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    getPiPfySettings().then((currentSettings: PiPfySettings) => {
      const updatedSettings = { ...currentSettings, ...newSettings }
      chrome.storage.local.set({ [PIPFY_SETTINGS_KEY]: updatedSettings }, () => {
        if (chrome.runtime.lastError) {
          console.error('Error setting settings:', chrome.runtime.lastError)
          return resolve({ success: false })
        }
        resolve({ success: true })
      })
    })
  })
}
