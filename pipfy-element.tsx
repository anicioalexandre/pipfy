import { type Root, createRoot } from 'react-dom/client'
import { StyleSheetManager } from 'styled-components'

import { PIPFY_INTERFACE_CLOSE } from 'constants/events'
import { INITIALIZE_POPUP_ELEMENT } from 'constants/messages'
import { injectGlobalStyles } from 'utils/dom'

import PiPfyInterface from './components/PiPfyInterface'

export class PiPfyElement extends HTMLElement {
  private _root: null | Root
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this._root = null
    this.handlePiPfyInterfaceClose = this.handlePiPfyInterfaceClose.bind(this)
  }

  connectedCallback() {
    injectGlobalStyles()

    chrome.runtime.onMessage.addListener((message) => {
      if (message && message.type === INITIALIZE_POPUP_ELEMENT) {
        this.render()
      }
    })

    this.addEventListener(PIPFY_INTERFACE_CLOSE, this.handlePiPfyInterfaceClose)
  }

  disconnectedCallback() {
    this.removeEventListener(PIPFY_INTERFACE_CLOSE, this.handlePiPfyInterfaceClose)
    if (this._root) {
      this._root.unmount()
      this._root = null
    }
  }

  handlePiPfyInterfaceClose() {
    this.render(false)
  }

  render(renderPiPfyInterface = true) {
    if (!renderPiPfyInterface) {
      this._root.unmount()
      return
    }

    this._root?.unmount()
    this.shadowRoot.innerHTML = ''

    const mountPoint = document.createElement('div')
    this.shadowRoot.appendChild(mountPoint)

    this._root = createRoot(mountPoint)
    this._root.render(
      <StyleSheetManager target={this.shadowRoot}>
        <PiPfyInterface />
      </StyleSheetManager>,
    )
  }
}
