import React from 'react'

import SvgIcon from 'components/design-system/SvgIcon'

const CloseIcon = () => (
  <SvgIcon viewBox="0 0 24 24">
    <path
      d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
      stroke="var(--pipfy-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
)

export default CloseIcon
