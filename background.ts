let previousTabId: number | null = null

chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { type: 'INITIALIZE_POPUP_ELEMENT' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error sending message:', chrome.runtime.lastError)
      } else {
        console.log('Content script response:', response)
      }
    })
  }
})

chrome.tabs.onActivated.addListener((activeInfo) => {
  if (previousTabId !== null && previousTabId !== activeInfo.tabId) {
    chrome.tabs.sendMessage(previousTabId, { action: 'triggerPiP' })
  }
  previousTabId = activeInfo.tabId
})

chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE && previousTabId !== null) {
    chrome.tabs.sendMessage(previousTabId, { action: 'triggerPiP' })
  }
})

export {}
