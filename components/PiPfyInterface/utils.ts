export const isNodeElement = (node: Node | Element): node is Element =>
  node.nodeType === Node.ELEMENT_NODE

export const isVideoElement = (node: Element): node is HTMLVideoElement =>
  node.tagName.toLowerCase() === 'video'

export const createOverlay = () => {
  const overlay = document.createElement('div')
  overlay.id = 'pipfy-overlay'
  overlay.style.background = 'transparent'
  overlay.style.transition = 'all 0.25s ease'
  overlay.style.zIndex = '10'
  overlay.style.justifyContent = 'center'
  overlay.style.overflow = 'hidden'
  overlay.style.position = 'relative'
  overlay.style.alignItems = 'center'
  overlay.style.display = 'flex'

  return overlay
}

const getOrCreateOverlayBlur = (overlay: HTMLDivElement) => {
  const overlayBlur = (overlay.closest('#pipfy-overlay-blur') ??
    document.createElement('div')) as HTMLDivElement

  overlayBlur.id = 'pipfy-overlay-blur'
  overlayBlur.style.position = 'absolute'
  overlayBlur.style.width = '100%'
  overlayBlur.style.height = '100%'
  overlayBlur.style.zIndex = '10'
  overlayBlur.style.pointerEvents = 'none'
  overlayBlur.style.animation = 'pipfy-animation 1.85s infinite ease-in-out'

  overlay.appendChild(overlayBlur)
}

const getOrCreateOverlayText = (overlay: HTMLDivElement) => {
  const overlayText = (overlay.closest('#pipfy-overlay-text') ??
    document.createElement('div')) as HTMLDivElement

  overlayText.id = 'pipfy-overlay-text'
  overlayText.style.position = 'absolute'
  overlayText.style.background = 'rgba(0, 0, 0, 0.5)'
  overlayText.style.color = 'white'
  overlayText.style.padding = '5px'
  overlayText.style.borderRadius = '4px'
  overlayText.textContent = 'Video to enter PiP mode'
  overlayText.style.zIndex = '999999999'
  overlayText.style.pointerEvents = 'none'
  overlayText.style.fontFamily = 'monospace'

  overlay.appendChild(overlayText)
}

export const updateOverlayStyling = (overlay: HTMLDivElement) => {
  getOrCreateOverlayBlur(overlay)
  getOrCreateOverlayText(overlay)
}

export const appendOverlay = (video: HTMLVideoElement, overlay: HTMLDivElement) => {
  if (video.parentNode === overlay) return

  overlay.style.width = `${video.clientWidth}px`
  overlay.style.height = `${video.clientHeight}px`
  video.parentNode.insertBefore(overlay, video)
  overlay.appendChild(video)

  updateOverlayStyling(overlay)
}

export const removeOverlay = (video: HTMLVideoElement) => {
  if (!video) return

  const overlay = video.closest('#pipfy-overlay') as HTMLDivElement
  if (!overlay) return

  overlay.querySelectorAll('div[id="pipfy-overlay-blur"]').forEach((element) => element.remove())
  overlay.querySelectorAll('div[id="pipfy-overlay-text"]').forEach((element) => element.remove())
  overlay.parentNode.replaceChild(video, overlay)
}

export const isElementPartiallyInViewport = (element: HTMLElement) => {
  if (!element) return false

  const rect = element.getBoundingClientRect()

  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  const windowWidth = window.innerWidth || document.documentElement.clientWidth

  const verticallyInView = rect.top < windowHeight && rect.bottom > 0
  const horizontallyInView = rect.left < windowWidth && rect.right > 0

  return verticallyInView && horizontallyInView
}

export const isElementVisible = (element: HTMLElement): boolean => {
  if (!element) return false

  if (!element.isConnected) {
    return false
  }

  const style = window.getComputedStyle(element)

  if (style.display === 'none' || style.visibility === 'hidden') {
    return false
  }

  const rect = element.getBoundingClientRect()
  if (rect.width === 0 || rect.height === 0) {
    return false
  }
  element.dataset.pipfy_processed = 'true'
  return true
}

// export const getVisibleVideos = () => {
//   const initialVideos = document.getElementsByTagName('video')

//   const visibleVideos = Array.from(initialVideos).filter(isElementVisible)

//   return visibleVideos
// }

export const getVisibleVideos = (): HTMLVideoElement[] => {
  const visibleVideos: HTMLVideoElement[] = []
  const maxDepth = 3

  const collectVideos = (document: Document, currentDepth: number) => {
    if (currentDepth > maxDepth) {
      return
    }

    try {
      const videoElements = document.getElementsByTagName('video')
      for (const video of videoElements) {
        if (isElementVisible(video)) {
          visibleVideos.push(video)
        }
      }

      const iframes = document.getElementsByTagName('iframe')
      for (const iframe of iframes) {
        iframe.contentWindow.postMessage
        console.log('iframe', iframe)
        console.log('iframe contentDocument', iframe.contentDocument)
        console.log('iframe contentWindow', iframe.contentWindow)
        console.log('iframe contentWindow.document', iframe.contentWindow?.document)
        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document
        if (iframeDocument) {
          collectVideos(iframeDocument, currentDepth + 1)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  collectVideos(document, 1)
  console.log('visibleVideos', visibleVideos)
  return visibleVideos
}
