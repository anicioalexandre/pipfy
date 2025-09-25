import type { FC } from 'react'

import AnimatedTransition from 'components/design-system/AnimatedTransition'
import RouteContainer from 'components/design-system/RouteContainer'

import type { HomeProps } from './types'

const Home: FC<HomeProps> = ({ isVisible, children }) => {
  return (
    <AnimatedTransition $isVisible={isVisible}>
      <RouteContainer>{children}</RouteContainer>
    </AnimatedTransition>
  )
}

export default Home
