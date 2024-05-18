function on(eventType: string, listener: any): void {
  document.addEventListener(eventType, listener)
}

function off(eventType: string, listener: any): void {
  document.removeEventListener(eventType, listener)
}

function once(eventType: string, listener: any): void {
  on(eventType, handleEventOnce)

  function handleEventOnce(event: any): void {
    listener(event)
    off(eventType, handleEventOnce)
  }
}

function trigger(eventType: string, data?: any): void {
  const event = new CustomEvent(eventType, { detail: data })
  document.dispatchEvent(event)
}

export { on, once, off, trigger }
