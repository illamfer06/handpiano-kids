import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import App, {
  getRightNoteFromHand,
  getVolumeFromLeftHand,
  getAccidentalLabel,
  playTone,
} from './App';

const { mockDetectForVideo } = vi.hoisted(() => ({
  mockDetectForVideo: vi.fn(() => ({ landmarks: [], handednesses: [] })),
}));

const makeLandmarksForFingerState = ({ thumb, index, middle, ring, pinky }) => {
  const base = Array.from({ length: 21 }, () => ({ x: 0, y: 0, z: 0 }));

  const setFinger = (tipIndex, pipIndex, mcpIndex, extended) => {
    const tip = extended ? { x: 2.2, y: 0.2, z: 0 } : { x: 0.3, y: 0.2, z: 0 };
    const pip = extended ? { x: 1.1, y: 0.1, z: 0 } : { x: 0.8, y: 0.1, z: 0 };
    const mcp = extended ? { x: 0.5, y: 0.05, z: 0 } : { x: 0.6, y: 0.05, z: 0 };

    base[tipIndex] = tip;
    base[pipIndex] = pip;
    base[mcpIndex] = mcp;
  };

  base[0] = { x: 0, y: 0, z: 0 };
  setFinger(8, 6, 5, index);
  setFinger(12, 10, 9, middle);
  setFinger(16, 14, 13, ring);
  setFinger(20, 18, 17, pinky);

  if (thumb) {
    base[4] = { x: 2.5, y: 0.7, z: 0 };
    base[3] = { x: 1.2, y: 0.6, z: 0 };
  } else {
    base[4] = { x: 0.4, y: 0.5, z: 0 };
    base[3] = { x: 0.9, y: 0.5, z: 0 };
  }

  return base;
};

let originalMediaDevices;
let mediaDevicesCaptured = false;

const setupCameraDetection = async () => {
  originalMediaDevices = Object.getOwnPropertyDescriptor(navigator, 'mediaDevices');
  mediaDevicesCaptured = true;
  const getUserMedia = vi.fn().mockResolvedValue({
    getTracks: () => [{ stop: vi.fn() }],
  });
  const animationFrames = [];
  const context = {
    arc: vi.fn(),
    beginPath: vi.fn(),
    clearRect: vi.fn(),
    fill: vi.fn(),
    lineTo: vi.fn(),
    moveTo: vi.fn(),
    stroke: vi.fn(),
  };

  Object.defineProperty(navigator, 'mediaDevices', {
    configurable: true,
    value: { getUserMedia },
  });
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
  Object.defineProperty(HTMLMediaElement.prototype, 'readyState', {
    configurable: true,
    get: () => 2,
  });
  vi.spyOn(HTMLVideoElement.prototype, 'videoWidth', 'get').mockReturnValue(640);
  vi.spyOn(HTMLVideoElement.prototype, 'videoHeight', 'get').mockReturnValue(480);
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context);
  vi.stubGlobal('requestAnimationFrame', vi.fn((callback) => {
    animationFrames.push(callback);
    return animationFrames.length;
  }));
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
  vi.stubGlobal('__handPianoDetectForVideo', mockDetectForVideo);

  render(<App />);
  await waitFor(() => expect(getUserMedia).toHaveBeenCalled());
  await waitFor(() => expect(mockDetectForVideo).toHaveBeenCalled());

  const detectNextFrame = async (result) => {
    mockDetectForVideo.mockReturnValueOnce(result);
    const callback = animationFrames.shift();
    expect(callback).toBeDefined();
    await act(async () => callback());
  };

  return {
    detectNextFrame,
  };
};

afterEach(() => {
  if (mediaDevicesCaptured) {
    if (originalMediaDevices) {
      Object.defineProperty(navigator, 'mediaDevices', originalMediaDevices);
    } else {
      delete navigator.mediaDevices;
    }
    originalMediaDevices = undefined;
    mediaDevicesCaptured = false;
  }
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('App', () => {
  it('renders the main interface', async () => {
    await act(async () => {
      render(<App />);
    });

    expect(screen.getByText('HandPiano Kids')).toBeInTheDocument();
    expect(screen.getByText('Aprende notas con tus manos')).toBeInTheDocument();
    expect(screen.getByText('Nota actual')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Empezar evaluación/i })).toBeInTheDocument();
  });

  it('starts the evaluation round', async () => {
    await act(async () => {
      render(<App />);
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Empezar evaluación/i }));
    });

    expect(screen.getByText(/Ronda 1 de 3/i)).toBeInTheDocument();
    expect(screen.getByText(/¿Qué nota es\? Responde con la mano derecha\./i)).toBeInTheDocument();
  });

  it('shows a confetti burst when the detected note answers correctly', async () => {
    mockDetectForVideo.mockReset();
    mockDetectForVideo.mockReturnValue({ landmarks: [], handednesses: [] });
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const { detectNextFrame } = await setupCameraDetection();
    vi.useFakeTimers();

    fireEvent.click(screen.getByRole('button', { name: /Empezar evaluación/i }));
    await detectNextFrame({ landmarks: [], handednesses: [] });
    await detectNextFrame({
      landmarks: [makeLandmarksForFingerState({
        thumb: false,
        index: false,
        middle: false,
        ring: false,
        pinky: false,
      })],
      handednesses: [[{ displayName: 'Right' }]],
    });

    expect(screen.getByText('¡Correcto! Has acertado la nota DO.')).toBeInTheDocument();
    expect(document.querySelectorAll('.confetti-piece')).toHaveLength(24);
  });

  it('does not show confetti when the detected note is incorrect', async () => {
    mockDetectForVideo.mockReset();
    mockDetectForVideo.mockReturnValue({ landmarks: [], handednesses: [] });
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const { detectNextFrame } = await setupCameraDetection();

    fireEvent.click(screen.getByRole('button', { name: /Empezar evaluación/i }));
    await detectNextFrame({ landmarks: [], handednesses: [] });
    await detectNextFrame({
      landmarks: [makeLandmarksForFingerState({
        thumb: true,
        index: false,
        middle: false,
        ring: false,
        pinky: false,
      })],
      handednesses: [[{ displayName: 'Right' }]],
    });

    expect(screen.getByText('Todavía no. Prueba otra posición de la mano.')).toBeInTheDocument();
    expect(document.querySelector('.confetti-burst')).not.toBeInTheDocument();
  });
});

describe('music logic', () => {
  it('maps a right-hand gesture to a note', () => {
    expect(getRightNoteFromHand(makeLandmarksForFingerState({ thumb: true, index: true, middle: false, ring: false, pinky: false }))).toBe('MI');
    expect(getRightNoteFromHand(makeLandmarksForFingerState({ thumb: true, index: true, middle: true, ring: true, pinky: false }))).toBe('SOL');
    expect(getRightNoteFromHand(makeLandmarksForFingerState({ thumb: false, index: false, middle: false, ring: false, pinky: false }))).toBe('DO');
  });

  it('covers every supported note and rejects ambiguous right-hand gestures', () => {
    const cases = [
      ['DO', { thumb: false, index: false, middle: false, ring: false, pinky: false }],
      ['RE', { thumb: true, index: false, middle: false, ring: false, pinky: false }],
      ['MI', { thumb: true, index: true, middle: false, ring: false, pinky: false }],
      ['FA', { thumb: true, index: true, middle: true, ring: false, pinky: false }],
      ['SOL', { thumb: true, index: true, middle: true, ring: true, pinky: false }],
      ['LA', { thumb: true, index: true, middle: true, ring: true, pinky: true }],
      ['SI', { thumb: true, index: false, middle: false, ring: false, pinky: true }],
    ];

    cases.forEach(([expectedNote, fingers]) => {
      expect(getRightNoteFromHand(makeLandmarksForFingerState(fingers))).toBe(expectedNote);
    });

    expect(getRightNoteFromHand(makeLandmarksForFingerState({
      thumb: false,
      index: true,
      middle: false,
      ring: false,
      pinky: false,
    }))).toBeNull();
  });

  it('maps a left-hand gesture to the expected volume or accidental', () => {
    expect(getVolumeFromLeftHand(makeLandmarksForFingerState({ thumb: true, index: false, middle: false, ring: false, pinky: false }))).toEqual({ type: 'sharp', volume: 0 });
    expect(getVolumeFromLeftHand(makeLandmarksForFingerState({ thumb: false, index: false, middle: false, ring: false, pinky: true }))).toEqual({ type: 'flat', volume: 0 });
    expect(getVolumeFromLeftHand(makeLandmarksForFingerState({ thumb: false, index: true, middle: true, ring: true, pinky: true }))).toEqual({ type: 'volume', volume: 100 });
  });

  it('writes accidental labels and plays tones with a provided audio context', () => {
    expect(getAccidentalLabel('sharp')).toBe('#');
    expect(getAccidentalLabel('natural')).toBe('');

    const audioContext = {
      currentTime: 0,
      createGain: () => ({
        gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
        connect: vi.fn(),
      }),
      createBiquadFilter: () => ({
        type: '',
        frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
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
      destination: {},
    };

    const oscillators = [];
    audioContext.createOscillator = vi.fn(() => {
      const oscillator = {
        type: '',
        frequency: { value: 0 },
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
      };
      oscillators.push(oscillator);
      return oscillator;
    });

    playTone('DO', 'sharp', 50, audioContext);

    expect(audioContext.createOscillator).toHaveBeenCalledTimes(4);
    expect(oscillators).toHaveLength(4);
  });
});
