declare interface MediaRecorderErrorEvent extends Event {
  name: string;
}

declare interface MediaRecorderDataAvailableEvent extends Event {
  data: Blob;
}

interface MediaRecorderEventMap {
  "dataavailable": MediaRecorderDataAvailableEvent;
  "error": MediaRecorderErrorEvent ;
  "pause": Event;
  "resume": Event;
  "start": Event;
  "stop": Event;
  "warning": MediaRecorderErrorEvent ;
}

declare class MediaRecorder extends EventTarget {
  readonly mimeType: string;
  readonly state: "inactive" | "recording" | "paused";
  readonly stream: MediaStream;
  ignoreMutedMedia: boolean;
  videoBitsPerSecond: number;
  audioBitsPerSecond: number;

  ondataavailable: (event: MediaRecorderDataAvailableEvent) => void;
  onerror: (event: MediaRecorderErrorEvent) => void;
  onpause: () => void;
  onresume: () => void;
  onstart: () => void;
  onstop: () => void;

  constructor(stream: MediaStream, options?: {mimeType?: string; audioBitsPerSecond?: number; videoBitsPerSecond?: number; bitsPerSecond?: number});

  start(timeslice?: number): void;

  stop(): void;

  resume(): void;

  pause(): void;

  isTypeSupported(type: string): boolean;

  requestData(): Blob;

  addEventListener<K extends keyof MediaRecorderEventMap>(type: K, listener: (this: MediaStream, ev: MediaRecorderEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;

  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;

  removeEventListener<K extends keyof MediaRecorderEventMap>(type: K, listener: (this: MediaStream, ev: MediaRecorderEventMap[K]) => any, options?: boolean | EventListenerOptions): void;

  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
