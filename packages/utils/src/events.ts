/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 *
 * A Promise-based generic EventEmitter, in the spirit of JS EventTarget & node
 * js EventEmitter.
 */

type OptionalIfUndefined<T> = (T extends undefined ? [] : never) | [T]
type EventMap = Record<string, any>
type EventKey<T extends EventMap> = string & keyof T
type EventReceiver<T> = (payload: T) => void | Promise<void>

export interface IEventEmitter<T extends EventMap> {
  on<K extends EventKey<T>>(name: K, fn: EventReceiver<T[K]>): () => void
  off<K extends EventKey<T>>(name: K, fn: EventReceiver<T[K]>): void
  emit<K extends EventKey<T>>(
    name: K,
    ...[payload]: OptionalIfUndefined<T[K]>
  ): Promise<void>
}

/**
 * A simple EventEmitter class, in the spirit of NodeJS EventEmitter & browser
 * APIs EventTarget. Supports `await this.emit(...)`.
 */
export class EventEmitter<T extends EventMap> implements IEventEmitter<T> {
  private _listeners: {
    [K in EventKey<T>]?: EventReceiver<T[K]>[]
  } = {}
  public muted: boolean = false

  /**
   * Attach a listener on event of given name.
   * @param name Event name
   * @param fn Listener
   * @returns A function which can be used to remove the event listener which
   * was just set.
   */
  public on<K extends EventKey<T>>(name: K, fn: EventReceiver<T[K]>) {
    if (!this._listeners.hasOwnProperty(name)) {
      this._listeners[name] = []
    }
    this._listeners[name]!.push(fn)
    return () => this.off(name, fn)
  }

  /**
   * Detach a listener on event of given name. If such listener isn't attached
   * anymore, nothing happens. If the same listener was somehow registered
   * multiple times, they will all be removed. An equality check is made on
   * the listener function.
   * @param name Event name
   * @param fn Listener to remove
   */
  public off<K extends EventKey<T>>(name: K, fn: EventReceiver<T[K]>) {
    const currentListeners = this._listeners[name]
    if (!currentListeners) return
    const listeners: EventReceiver<T[K]>[] = []
    for (let i = 0, length = currentListeners.length; i < length; i++) {
      if (currentListeners[i] !== fn) {
        listeners.push(currentListeners[i])
      }
    }
    this._listeners[name] = listeners
  }

  /**
   * Immediately call all the listeners on event of given name, and resolves
   * once all the listeners have resolved.
   *
   * @param name Event name to dispatch
   * @param payload Payload to dispatch
   */
  public async emit<K extends EventKey<T>>(
    name: K,
    ...[payload]: OptionalIfUndefined<T[K]>
  ) {
    if (this.muted) return
    const listeners = this._listeners[name]
    if (!listeners) return
    await Promise.allSettled(
      listeners.map(listener => Promise.resolve(listener(payload as any)))
    )
  }

  /**
   * Forwards all the events of a given `name` emitted by this emitter to a
   * target `emitter`. Whenever this emitter will emit `name`, the target
   * `emitter` will also emit `name` with the same payload.
   * @param name Event name
   * @param emitter Target Event Emitter which should emit the same event when
   * this emitter emits it.
   * @returns A function to clear the pipe.
   */
  public pipe<K extends EventKey<T>>(name: K, emitter: EventEmitter<T>) {
    return this.on(name, payload => emitter.emit(name, payload))
  }

  /**
   * Mute/Unmute the Event Emitter. If muted, no event will be emitted when the
   * `emit()` method is called.
   * @param muted Whether the emitter should be muted or not
   */
  public mute(muted: boolean = true) {
    this.muted = muted
    return this
  }
}
