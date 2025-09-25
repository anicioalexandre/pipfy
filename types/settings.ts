import type { ThemeMode } from './theme'

export type PiPfySettings = {
  themeMode: ThemeMode
  automaticallyOpenFirstVideo: boolean
  playVideoOnClick: boolean
  closeInterfaceOnClickOutside: boolean
}

export type PiPfySettingsKeys = keyof PiPfySettings
