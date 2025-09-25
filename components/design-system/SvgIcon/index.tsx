import React from 'react'

import styled from 'styled-components'

const Icon = styled.svg.attrs({
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
})``

const SvgIcon = styled(Icon)`
  cursor: pointer;
  height: 24px;
  width: 24px;
`

export default SvgIcon
