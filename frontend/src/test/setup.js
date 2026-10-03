import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('@mediapipe/tasks-vision', () => {
  class HandLandmarker {
    static async createFromOptions() {
      return {
        detectForVideo: () => ({ landmarks: [], handednesses: [] }),
        close: vi.fn(),
      };
    }
  }

  return {
    FilesetResolver: {
      forVisionTasks: vi.fn().mockResolvedValue({}),
    },
    HandLandmarker,
  };
});

const fakeAudioContext = {
  state: 'running',
  currentTime: 0,
  resume: vi.fn(),
  destination: {},
  createGain: () => ({
    gain: {
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
    },
    connect: vi.fn(),
  }),
  createBiquadFilter: () => ({
    type: '',
    frequency: {
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
    },
    Q: { value: 0 },
    connect: vi.fn(),
  }),
  createDynamicsCompressor: () => ({
    threshold: { value: 0 },
    knee: { value: 0 },
    ratio: { value: 0 },
    attack: { value: 0 },
    release: { value: 0 },
    connect: vi.fn(),
  }),
  createOscillator: () => ({
    type: '',
    frequency: { value: 0 },
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
  }),
};

Object.defineProperty(window, 'AudioContext', {
  writable: true,
  value: vi.fn(() => fakeAudioContext),
});

Object.defineProperty(window, 'webkitAudioContext', {
  writable: true,
  value: vi.fn(() => fakeAudioContext),
});

Object.defineProperty(navigator, 'mediaDevices', {
  configurable: true,
  value: {
    getUserMedia: vi.fn().mockResolvedValue({
      getTracks: () => [],
    }),
  },
});

Object.defineProperty(HTMLMediaElement.prototype, 'play', {
  configurable: true,
  value: vi.fn().mockResolvedValue(),
});

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  configurable: true,
  value: vi.fn(() => ({
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
  })),
});
