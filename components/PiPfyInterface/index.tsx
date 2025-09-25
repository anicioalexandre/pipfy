import { useEffect, useState } from 'react'

import IconButton from 'components/design-system/IconButton'
import Text from 'components/design-system/Text'
import BackIcon from 'components/design-system/icons/BackIcon'
import CloseIcon from 'components/design-system/icons/CloseIcon'
import SettingsIcon from 'components/design-system/icons/SettingsIcon'
import { PIPFY_INTERFACE_CLOSE } from 'constants/events'
import { ROUTE } from 'constants/route'
import type { Routes } from 'types/route'
import { getPiPfyElement } from 'utils/dom'
import { getPiPfySettings } from 'utils/settings'

import Home from './Home'
import Settings from './Settings'
import { MIN_VIDEOS_SIZE_TO_SHOW_MORE_VIDEOS } from './constants'
import {
  Container,
  EnablePiPButton,
  IconButtonsContainer,
  MoreVideosContainer,
  MoreVideosItem,
  RoutesContainer,
} from './styled'
import {
  appendOverlay,
  createOverlay,
  getVisibleVideos,
  isElementVisible,
  isNodeElement,
  isVideoElement,
  removeOverlay,
} from './utils'

const PiPfyInterface = () => {
  const [route, setRoute] = useState<Routes>(ROUTE.home)
  const [videos, setVideos] = useState<HTMLVideoElement[]>([])
  const [isVideoInPipMode, setIsVideoInPiPMode] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<HTMLVideoElement | undefined>(undefined)

  const addVideo = (element: HTMLVideoElement) => {
    element.dataset.pipfy_processed = 'true'
    setVideos((prevVideos) => {
      if (prevVideos.includes(element) || !isElementVisible(element)) {
        return prevVideos
      }
      return [...prevVideos, element]
    })
  }

  const pipfyElement = getPiPfyElement()

  const handleInterfaceClose = () => {
    const event = new CustomEvent(PIPFY_INTERFACE_CLOSE, {
      bubbles: true,
      composed: true,
    })
    pipfyElement?.dispatchEvent(event)

    removeOverlay(selectedVideo)
  }

  const handlePiPEnter = () => {
    setIsVideoInPiPMode(true)
  }

  const handlePiPLeave = () => {
    setIsVideoInPiPMode(false)
  }

  const handlePlayVideo = async (video: HTMLVideoElement) => {
    const settings = await getPiPfySettings()
    if (settings.playVideoOnClick) {
      video.play()
    }
  }

  const handleVideoClick = (video?: HTMLVideoElement) => {
    const videoToRequestPiP = video ?? selectedVideo
    if (isVideoInPipMode) {
      return
    }

    handlePlayVideo(videoToRequestPiP)

    videoToRequestPiP.requestPictureInPicture()
    videoToRequestPiP.addEventListener('enterpictureinpicture', handlePiPEnter)
    videoToRequestPiP.addEventListener('leavepictureinpicture', handlePiPLeave)

    setSelectedVideo(videoToRequestPiP)
    handleInterfaceClose()
  }

  const handleVideoItemClick = (video: HTMLVideoElement) => {
    const previousSelectedVideo = selectedVideo

    if (previousSelectedVideo) {
      previousSelectedVideo.removeEventListener('enterpictureinpicture', handlePiPEnter)
      previousSelectedVideo.removeEventListener('leavepictureinpicture', handlePiPLeave)
      removeOverlay(previousSelectedVideo)
    }

    video.scrollIntoView({ behavior: 'smooth', block: 'center' })

    const overlay = createOverlay()
    appendOverlay(video, overlay)

    setSelectedVideo(video)
  }

  const handleFirstVideoFound = async () => {
    const visibleVideos = getVisibleVideos()

    setVideos(visibleVideos)

    const firstVisibleVideo = visibleVideos[0]

    if (!firstVisibleVideo) return

    const settings = await getPiPfySettings()
    if (settings.automaticallyOpenFirstVideo) {
      handleVideoClick(firstVisibleVideo)
    } else {
      handleVideoItemClick(firstVisibleVideo)
    }
  }

  useEffect(() => {
    handleFirstVideoFound()
  }, [])

  const handleDocumentClick = async (e: MouseEvent) => {
    const isClickInsideInterface = e.composedPath().includes(pipfyElement)

    if (isClickInsideInterface) return

    const settings = await getPiPfySettings()
    if (settings.closeInterfaceOnClickOutside) {
      handleInterfaceClose()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (
              isNodeElement(node) &&
              isVideoElement(node) &&
              node.dataset.pipfy_processed !== 'true'
            ) {
              addVideo(node)
            }
          })
        }
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()

      const visibleVideos = getVisibleVideos()

      visibleVideos.forEach((video) => {
        delete video.dataset.pipfy_processed
        video.removeEventListener('enterpictureinpicture', handlePiPEnter)
        video.removeEventListener('leavepictureinpicture', handlePiPLeave)
        removeOverlay(video)
      })
    }
  }, [])

  const isHomeRoute = route === ROUTE.home
  const isSettingsRoute = route === ROUTE.settings

  const getEnablePiPButtonTitle = () => {
    if (!selectedVideo) {
      return 'No videos found'
    }

    if (isVideoInPipMode) {
      return 'Video is in PiP Mode'
    }

    return 'Enable PiP Mode'
  }

  const renderRightButton = () => {
    if (isHomeRoute) {
      return (
        <IconButton onClick={() => setRoute(ROUTE.settings)}>
          <SettingsIcon />
        </IconButton>
      )
    }

    return (
      <IconButton onClick={() => setRoute(ROUTE.home)}>
        <BackIcon />
      </IconButton>
    )
  }

  const renderMoreVideos = () => {
    if (videos.length < MIN_VIDEOS_SIZE_TO_SHOW_MORE_VIDEOS) {
      return null
    }

    return (
      <MoreVideosContainer>
        {videos.map((video, index) => (
          <MoreVideosItem
            $selected={video === selectedVideo}
            key={video.src}
            onClick={(e) => {
              e.currentTarget.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              })
              handleVideoItemClick(video)
            }}
          >
            <Text $variant="button">Video {index + 1}</Text>
          </MoreVideosItem>
        ))}
      </MoreVideosContainer>
    )
  }

  return (
    <Container $route={route} $videosSize={videos.length}>
      <IconButtonsContainer>
        <IconButton onClick={handleInterfaceClose}>
          <CloseIcon />
        </IconButton>
        <Text $variant="h1">PiPfy</Text>
        {renderRightButton()}
      </IconButtonsContainer>
      <RoutesContainer>
        {isHomeRoute && (
          <Home isVisible={isHomeRoute}>
            <EnablePiPButton
              disabled={!selectedVideo}
              $enabled={!isVideoInPipMode}
              onClick={() => handleVideoClick()}
            >
              {getEnablePiPButtonTitle()}
            </EnablePiPButton>
            {renderMoreVideos()}
          </Home>
        )}
        {isSettingsRoute && <Settings isVisible={isSettingsRoute} />}
      </RoutesContainer>
    </Container>
  )
}

export default PiPfyInterface
