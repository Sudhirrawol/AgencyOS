type EventCallback = (data?: unknown) => void;

class EventBus {
  private listeners = new Map<string, Set<EventCallback>>();

  on(eventName: string, callback: EventCallback) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName)!.add(callback);
  }
  emit(eventName: string, data?: unknown) {
    const callbacks = this.listeners.get(eventName);

    callbacks?.forEach((callback) => {
      callback(data);
    });
  }

  off(eventName: string, callback: EventCallback) {
    const callbacks = this.listeners.get(eventName);

    callbacks?.delete(callback);

    if (callbacks?.size === 0) {
      this.listeners.delete(eventName);
    }
  }
}

export const eventBus = new EventBus();
