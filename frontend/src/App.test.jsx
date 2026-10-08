import { act, fireEvent, render, screen } from '@testing-library/react';
import App, {
  getRightNoteFromHand,
  getVolumeFromLeftHand,
  getAccidentalLabel,
  playTone,
} from './App';

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
