import { type ChangeEventHandler, type FC } from 'react'

import Text from 'components/design-system/Text'

import { Input, Label, Switcher } from './styled'
import type { SwitchProps } from './types'

const Switch: FC<SwitchProps> = ({ label, checked, onChange }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked } = e.target
    onChange(checked)
  }

  return (
    <Label>
      <Text>{label}</Text>
      <Input type="checkbox" checked={checked} onChange={handleChange} />
      <Switcher />
    </Label>
  )
}

export default Switch
