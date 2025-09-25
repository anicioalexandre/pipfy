import { type FC } from 'react'

import AnimatedTransition from 'components/design-system/AnimatedTransition'
import RouteContainer from 'components/design-system/RouteContainer'
import Switch from 'components/design-system/Switch'
import Text from 'components/design-system/Text'
import Tooltip from 'components/design-system/Tooltip'
import useSettings from 'hooks/useSettings'
import type { PiPfySettingsKeys } from 'types/settings'
import { setPiPfySettings } from 'utils/settings'

import { SwitchCaptionContainer } from './styled'
import type { SettingsProps } from './types'

const Settings: FC<SettingsProps> = ({ isVisible }) => {
  const { settings } = useSettings()

  const toggleThemeMode = async (checked: boolean) => {
    const mode = checked ? 'dark' : 'light'
    await setPiPfySettings({ themeMode: mode })
  }

  const handleSettingsToggle = (settingKey: PiPfySettingsKeys) => async (checked: boolean) => {
    await setPiPfySettings({
      [settingKey]: checked,
    })
  }

  return (
    <AnimatedTransition $isVisible={isVisible}>
      <RouteContainer>
        <Switch
          label="Light/Dark mode"
          checked={settings.themeMode === 'dark'}
          onChange={toggleThemeMode}
        />
        <Switch
          label="Play video on click"
          checked={settings.playVideoOnClick}
          onChange={handleSettingsToggle('playVideoOnClick')}
        />
        <Switch
          label="Close interface on click outside"
          checked={settings.closeInterfaceOnClickOutside}
          onChange={handleSettingsToggle('closeInterfaceOnClickOutside')}
        />
        <Tooltip content="If true, to access the settings again, you'd need to open PiPfy in a tab that doesn't have any video.">
          <Switch
            label="Automatically open first video found *"
            checked={settings.automaticallyOpenFirstVideo}
            onChange={handleSettingsToggle('automaticallyOpenFirstVideo')}
          />
        </Tooltip>
      </RouteContainer>
    </AnimatedTransition>
  )
}

export default Settings
