import type { Size } from '@/data/products';

export type StoredLine = { handle: string; size: Size; quantity: number };

const STORAGE_KEY = 'piura-bag';
const EMPTY: StoredLine[] = [];

type Listener = () => void;

/**
 * The bag as an external store backed by localStorage, read through
 * useSyncExternalStore so server and client render the same empty bag first
 * and the persisted lines arrive on subscription without effect-driven setState.
 */
class BagStore {
  private lines: StoredLine[] = EMPTY;
  private hydrated = false;
  private listeners = new Set<Listener>();
  private validate: (line: StoredLine) => boolean = () => true;

  /** Lets the provider reject lines whose products no longer exist. */
  setValidator(validate: (line: StoredLine) => boolean) {
    this.validate = validate;
  }

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    if (!this.hydrated) {
      this.hydrated = true;
      this.lines = this.read();
      queueMicrotask(() => this.notify());
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        this.lines = this.read();
        this.notify();
      }
    };
    window.addEventListener('storage', onStorage);
    return () => {
      this.listeners.delete(listener);
      window.removeEventListener('storage', onStorage);
    };
  };

  getSnapshot = () => this.lines;

  getServerSnapshot = () => EMPTY;

  set(next: StoredLine[]) {
    this.lines = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* Private mode or quota: the bag still works for this visit. */
    }
    this.notify();
  }

  private read(): StoredLine[] {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(parsed)) return EMPTY;
      return parsed.filter(
        (line): line is StoredLine =>
          typeof line === 'object' &&
          line !== null &&
          typeof (line as StoredLine).handle === 'string' &&
          typeof (line as StoredLine).size === 'string' &&
          typeof (line as StoredLine).quantity === 'number' &&
          (line as StoredLine).quantity > 0 &&
          this.validate(line as StoredLine),
      );
    } catch {
      return EMPTY;
    }
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }
}

export const bagStore = new BagStore();
