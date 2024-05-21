export type EventHandler<T = any> = (...args: T[]) => void

export class EventEmitter<T extends Record<string, EventHandler>> {
  private events: { [K in keyof T]?: T[K][] } = {}

  on<K extends keyof T>(event: K, handler: T[K]) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event]!.push(handler)
  }

  off<K extends keyof T>(event: K, handler: T[K]) {
    if (!this.events[event]) return
    this.events[event] = this.events[event]!.filter(h => h !== handler)
  }

  emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>) {
    if (!this.events[event]) return
    this.events[event]!.forEach(handler => handler(...args))
  }
}
