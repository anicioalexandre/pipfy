import type { PiPfySettings } from 'types/settings'

export const PIPFY_SETTINGS_KEY = 'pipfy-settings'

export const DEFAULT_PIPFY_SETTINGS: PiPfySettings = {
  themeMode: 'dark',
  automaticallyOpenFirstVideo: false,
  playVideoOnClick: true,
  closeInterfaceOnClickOutside: true,
}
