import styled from 'styled-components'

import Button from 'components/design-system/Button'
import { ROUTE } from 'constants/route'
import type { Routes } from 'types/route'

import { MIN_VIDEOS_SIZE_TO_SHOW_MORE_VIDEOS } from './constants'

export const Container = styled.div<{ $route: Routes; $videosSize: number }>`
  animation: 500ms cubic-bezier(0.4, 0.5, 0.2, 1) 0s 1 normal forwards running enter;
  background-color: var(--pipfy-secondary);
  box-shadow:
    rgba(0, 0, 0, 0.15) 0px 0px 20px,
    rgba(0, 0, 0, 0.35) 0px 4px 30px;
  border-radius: 24px;
  display: grid;
  gap: 8px;
  grid-template-rows: min-content 1fr;
  height: max-content;
  height: ${(props) => {
    if (props.$route === ROUTE.home && props.$videosSize >= MIN_VIDEOS_SIZE_TO_SHOW_MORE_VIDEOS) {
      return '208px'
    }
    if (props.$route === ROUTE.settings) {
      return '176px'
    }
    return '100px'
  }};
  overflow: visible;
  padding: 16px;
  position: fixed;
  top: 25px;
  transition:
    width 300ms cubic-bezier(0.2, 0.3, 0.2, 1),
    height 300ms cubic-bezier(0.2, 0.4, 0.2, 1);
  z-index: 123456789;
  width: 224px;

  @keyframes enter {
    0% {
      right: -344px;
    }
    100% {
      right: 24px;
    }
  }
`

export const IconButtonsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

export const RoutesContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  overflow: hidden;
  padding: 0;
  position: relative;
  width: 100%;
`

export const MoreVideosContainer = styled.div`
  border-radius: 8px;
  border: var(--pipfy-primary) solid 2px;
  display: grid;
  gap: 4px;
  height: 80px;
  max-width: 200px;
  padding: 8px;
  overflow: auto;
  width: 100%;
`
export const MoreVideosItem = styled.button<{ $selected: boolean }>`
  background: ${(props) => (props.$selected ? 'var(--pipfy-primary)' : 'transparent')};
  border-radius: 6px;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 8px;
  text-align: center;
  max-height: 32px;
  width: 100%;

  &:hover {
    background-color: var(--pipfy-primary);
    p {
      color: var(--pipfy-secondary);
    }
  }

  p {
    color: ${(props) => (props.$selected ? 'var(--pipfy-secondary)' : 'var(--pipfy-primary)')};
  }
`

export const EnablePiPButton = styled(Button)<{ $enabled?: boolean }>`
  animation: ${(props) => (props.$enabled && !props.disabled ? 'pulse 1.25s infinite' : 'none')};
  background-color: var(--pipfy-error);
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  color: var(--pipfy-white);

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(237, 52, 52, 0.7);
    }

    70% {
      box-shadow: 0 0 0 10px rgba(237, 52, 52, 0);
    }

    100% {
      box-shadow: 0 0 0 0 rgba(237, 52, 52, 0);
    }
  }
`
