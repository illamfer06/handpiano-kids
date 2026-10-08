import { useEffect, useRef, useState } from 'react';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';

const NOTES = ['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI'];

const NOTE_FREQUENCIES = {
  DO: 261.63,
  RE: 293.66,
  MI: 329.63,
  FA: 349.23,
  SOL: 392.0,
  LA: 440.0,
  SI: 493.88,
};

const STAFF_NOTE_POSITIONS = {
  DO: 'below',
  RE: 'below-space',
  MI: 'line-1',
  FA: 'space-1',
  SOL: 'line-2',
  LA: 'space-2',
  SI: 'line-3',
};

const CONFETTI_COLORS = ['#2563eb', '#38bdf8', '#fbbf24', '#f472b6', '#34d399'];

const CONFETTI_PARTICLES = Array.from({ length: 24 }, (_, index) => {
  const angle = (index / 24) * Math.PI * 2;
  const distance = 55 + (index % 4) * 14;

  return {
    color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
    x: `${Math.cos(angle) * distance}px`,
    y: `${Math.sin(angle) * distance - 20}px`,
    rotation: `${(index % 2 === 0 ? 1 : -1) * (180 + index * 23)}deg`,
    delay: `${(index % 6) * 12}ms`,
  };
});

const ACCIDENTAL_KEYS = [
  { label: 'DO♯ / RE♭', sharpNote: 'DO', flatNote: 'RE', position: 'do-re' },
  { label: 'RE♯ / MI♭', sharpNote: 'RE', flatNote: 'MI', position: 're-mi' },
  { label: 'FA♯ / SOL♭', sharpNote: 'FA', flatNote: 'SOL', position: 'fa-sol' },
  { label: 'SOL♯ / LA♭', sharpNote: 'SOL', flatNote: 'LA', position: 'sol-la' },
  { label: 'LA♯ / SI♭', sharpNote: 'LA', flatNote: 'SI', position: 'la-si' },
];

export function landmarkDistance(firstPoint, secondPoint) {
  return Math.hypot(
    firstPoint.x - secondPoint.x,
    firstPoint.y - secondPoint.y,
    (firstPoint.z || 0) - (secondPoint.z || 0)
  );
}

export function isFingerExtended(landmarks, tipIndex, pipIndex, mcpIndex) {
  const wrist = landmarks[0];
  const tip = landmarks[tipIndex];
  const pip = landmarks[pipIndex];
  const mcp = landmarks[mcpIndex];

  return landmarkDistance(tip, wrist) > landmarkDistance(pip, wrist) * 1.08
    && landmarkDistance(tip, mcp) > landmarkDistance(pip, mcp) * 1.05;
}

export function getFingerState(landmarks) {
  const state = {
    thumb: false,
    index: false,
    middle: false,
    ring: false,
    pinky: false,
  };

  const thumbTip = landmarks[4];
  const thumbIP = landmarks[3];
  const wrist = landmarks[0];
  const indexMCP = landmarks[5];

  state.thumb = landmarkDistance(thumbTip, wrist) > landmarkDistance(thumbIP, wrist) * 1.08
    && landmarkDistance(thumbTip, indexMCP) > landmarkDistance(thumbIP, indexMCP) * 1.05;
  state.index = isFingerExtended(landmarks, 8, 6, 5);
  state.middle = isFingerExtended(landmarks, 12, 10, 9);
  state.ring = isFingerExtended(landmarks, 16, 14, 13);
  state.pinky = isFingerExtended(landmarks, 20, 18, 17);

  return state;
}

export function getVolumeFromLeftHand(landmarks) {
  const fingers = getFingerState(landmarks);

  const isThumbRaised = fingers.thumb;
  const isPinkyRaised = fingers.pinky;

  if (isThumbRaised && !fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky) {
    return { type: 'sharp', volume: 0 };
  }

  if (isPinkyRaised && !fingers.index && !fingers.middle && !fingers.ring && !fingers.thumb) {
    return { type: 'flat', volume: 0 };
  }

  const isFist = !fingers.thumb && !fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky;
  if (isFist) {
    return { type: 'volume', volume: 0 };
  }

  const active = [fingers.index, fingers.middle, fingers.ring, fingers.pinky].filter(Boolean).length;
  if (active > 0 && active <= 4) {
    return { type: 'volume', volume: active * 25 };
  }

  return { type: 'none', volume: 100 };
}

export function getRightNoteFromHand(landmarks) {
  const fingers = getFingerState(landmarks);

  const isFist = !fingers.thumb && !fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky;
  const isThumbOnly = fingers.thumb && !fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky;
  const isThumbIndex = fingers.thumb && fingers.index && !fingers.middle && !fingers.ring && !fingers.pinky;
  const isThumbIndexMiddle = fingers.thumb && fingers.index && fingers.middle && !fingers.ring && !fingers.pinky;
  const isThumbIndexMiddleRing = fingers.thumb && fingers.index && fingers.middle && fingers.ring && !fingers.pinky;
  const isOpenHand = fingers.thumb && fingers.index && fingers.middle && fingers.ring && fingers.pinky;
  const isThumbPinky = fingers.thumb && !fingers.index && !fingers.middle && !fingers.ring && fingers.pinky;

  if (isFist) return 'DO';
  if (isThumbOnly) return 'RE';
  if (isThumbIndex) return 'MI';
  if (isThumbIndexMiddle) return 'FA';
  if (isThumbIndexMiddleRing) return 'SOL';
  if (isOpenHand) return 'LA';
  if (isThumbPinky) return 'SI';

  return null;
}

export function getAccidentalLabel(accidental) {
  if (!accidental || accidental === 'natural') return '';
  return accidental === 'sharp' ? '#' : 'b';
}

export function getKeyboardNaturalNote(note, accidental) {
  if (accidental === 'natural') return note;
  if (accidental === 'sharp' && note === 'MI') return 'FA';
  if (accidental === 'sharp' && note === 'SI') return 'DO';
  if (accidental === 'flat' && note === 'DO') return 'SI';
  if (accidental === 'flat' && note === 'FA') return 'MI';
  return null;
}

export function playTone(noteName, noteAccidental, noteVolume, providedAudioContext = null) {
  if (noteVolume === 0) return;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const audioContext = providedAudioContext || (AudioContextClass ? new AudioContextClass() : null);

  if (!audioContext) return;

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const now = audioContext.currentTime;
  const baseFrequency = NOTE_FREQUENCIES[noteName] || NOTE_FREQUENCIES.DO;
  const multiplier = noteAccidental === 'sharp' ? 1.05946 : noteAccidental === 'flat' ? 1 / 1.05946 : 1;
  const frequency = baseFrequency * multiplier;

  const gainNode = audioContext.createGain();
  const toneFilter = audioContext.createBiquadFilter();
  const compressor = audioContext.createDynamicsCompressor();
  const duration = 2.2;
  const partials = [
    { multiplier: 1, level: 0.7, type: 'triangle' },
    { multiplier: 2.01, level: 0.16, type: 'sine' },
    { multiplier: 3.99, level: 0.08, type: 'sine' },
    { multiplier: 6.02, level: 0.035, type: 'sine' },
  ];

  toneFilter.type = 'lowpass';
  toneFilter.frequency.setValueAtTime(2800, now);
  toneFilter.frequency.exponentialRampToValueAtTime(1000, now + duration);
  toneFilter.Q.value = 0.7;
  compressor.threshold.value = -18;
  compressor.knee.value = 16;
  compressor.ratio.value = 3;
  compressor.attack.value = 0.003;
  compressor.release.value = 0.35;
  gainNode.gain.setValueAtTime(0.0001, now);
  gainNode.gain.exponentialRampToValueAtTime(Math.max(0.035, (noteVolume / 100) * 0.19), now + 0.025);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  partials.forEach(({ multiplier: partialMultiplier, level, type }) => {
    const oscillator = audioContext.createOscillator();
    const partialGain = audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency * partialMultiplier;
    partialGain.gain.value = level;
    oscillator.connect(partialGain);
    partialGain.connect(toneFilter);
    oscillator.start(now);
    oscillator.stop(now + duration);
  });

  toneFilter.connect(gainNode);
  gainNode.connect(compressor);
  compressor.connect(audioContext.destination);
}

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [status, setStatus] = useState('Preparando cámara...');
  const [note, setNote] = useState('DO');
  const [accidental, setAccidental] = useState('natural');
  const [volume, setVolume] = useState(100);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const accidentalRef = useRef('natural');
  const audioContextRef = useRef(null);
  const [evaluationActive, setEvaluationActive] = useState(false);
  const [evaluationRound, setEvaluationRound] = useState(0);
  const [evaluationTarget, setEvaluationTarget] = useState(null);
  const [evaluationFeedback, setEvaluationFeedback] = useState('');
  const [evaluationComplete, setEvaluationComplete] = useState(false);
  const [confettiBurst, setConfettiBurst] = useState(0);
  const evaluationActiveRef = useRef(false);
  const evaluationTargetRef = useRef(null);
  const evaluationRoundRef = useRef(0);
  const evaluationCanAnswerRef = useRef(true);

  useEffect(() => {
    accidentalRef.current = accidental;
  }, [accidental]);

  const chooseEvaluationNote = () => NOTES[Math.floor(Math.random() * NOTES.length)];

  const startEvaluation = () => {
    const firstTarget = chooseEvaluationNote();
    evaluationActiveRef.current = true;
    evaluationTargetRef.current = firstTarget;
    evaluationRoundRef.current = 1;
    evaluationCanAnswerRef.current = false;
    setEvaluationActive(true);
    setEvaluationComplete(false);
    setEvaluationRound(1);
    setEvaluationTarget(firstTarget);
    setEvaluationFeedback('¿Qué nota es? Responde con la mano derecha.');
  };

  const finishEvaluation = () => {
    evaluationActiveRef.current = false;
    evaluationTargetRef.current = null;
    evaluationCanAnswerRef.current = false;
    setEvaluationActive(false);
    setEvaluationComplete(true);
    setEvaluationTarget(null);
    setEvaluationFeedback('Evaluación terminada. ¿Quieres hacer otra?');
  };

  const cancelEvaluation = () => {
    evaluationActiveRef.current = false;
    evaluationTargetRef.current = null;
    evaluationRoundRef.current = 0;
    evaluationCanAnswerRef.current = false;
    setEvaluationActive(false);
    setEvaluationComplete(false);
    setEvaluationRound(0);
    setEvaluationTarget(null);
    setEvaluationFeedback('Evaluación cancelada.');
  };

  const handleEvaluationAnswer = (detectedNote) => {
    if (!evaluationActiveRef.current || !evaluationCanAnswerRef.current) return;

    if (detectedNote !== evaluationTargetRef.current) {
      setEvaluationFeedback('Todavía no. Prueba otra posición de la mano.');
      return;
    }

    evaluationCanAnswerRef.current = false;
    const currentRound = evaluationRoundRef.current;
    setEvaluationFeedback(`¡Correcto! Has acertado la nota ${detectedNote}.`);
    setConfettiBurst((burst) => burst + 1);

    if (currentRound >= 3) {
      finishEvaluation();
      return;
    }

    const nextRound = currentRound + 1;
    evaluationRoundRef.current = nextRound;
    setTimeout(() => {
      if (!evaluationActiveRef.current) return;
      const nextTarget = chooseEvaluationNote();
      evaluationTargetRef.current = nextTarget;
      evaluationCanAnswerRef.current = false;
      setEvaluationRound(nextRound);
      setEvaluationTarget(nextTarget);
      setEvaluationFeedback(`Ronda ${nextRound} de 3. ¿Qué nota es?`);
    }, 900);
  };

  useEffect(() => {
    const unlockAudio = () => {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
      }

      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    };

    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  useEffect(() => {
    let stream;
    let landmarker;
    let animationFrameId;

    const startDetection = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        );

        landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numHands: 2,
        });

        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setIsCameraReady(true);
          setStatus('Cámara lista. Mano derecha para notas, mano izquierda para volumen o accidentales.');
        }

        const render = () => {
          if (!videoRef.current || !landmarker) {
            animationFrameId = requestAnimationFrame(render);
            return;
          }

          const video = videoRef.current;
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');

          if (video.readyState >= 2) {
            const result = landmarker.detectForVideo(video, performance.now());

            if (canvas) {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
            }

            context.clearRect(0, 0, canvas.width, canvas.height);

            if (result.landmarks && result.landmarks.length > 0) {
              const rightHandIndex = result.handednesses?.findIndex(
                (entry) => entry[0]?.displayName === 'Right'
              );

              const leftHandIndex = result.handednesses?.findIndex(
                (entry) => entry[0]?.displayName === 'Left'
              );

              const rightHand = rightHandIndex !== undefined && rightHandIndex >= 0
                ? result.landmarks[rightHandIndex]
                : null;

              const leftHand = leftHandIndex !== undefined && leftHandIndex >= 0
                ? result.landmarks[leftHandIndex]
                : null;

              if (rightHand) {
                const detectedNote = getRightNoteFromHand(rightHand);
                if (detectedNote) {
                  setNote(detectedNote);
                  handleEvaluationAnswer(detectedNote);
                } else if (evaluationActiveRef.current) {
                  evaluationCanAnswerRef.current = true;
                }
              } else if (evaluationActiveRef.current) {
                evaluationCanAnswerRef.current = true;
              }

              if (leftHand) {
                const leftEvaluation = getVolumeFromLeftHand(leftHand);
                if (leftEvaluation.type === 'volume') {
                  if (leftEvaluation.volume === 0 && accidentalRef.current !== 'natural') {
                    setAccidental('natural');
                    setVolume(100);
                    setStatus('Sostenido o bemol retirado. Nota natural.');
                  } else {
                    setAccidental('natural');
                    setVolume(leftEvaluation.volume);
                    setStatus(`Volumen ${leftEvaluation.volume}%`);
                  }
                } else if (leftEvaluation.type === 'sharp') {
                  setAccidental('sharp');
                  setVolume(100);
                  setStatus('Sostenido activado');
                } else if (leftEvaluation.type === 'flat') {
                  setAccidental('flat');
                  setVolume(100);
                  setStatus('Bemol activado');
                } else if (leftEvaluation.type === 'none') {
                  setAccidental('natural');
                  setVolume(100);
                  setStatus('Nota natural. Gesto de alteración retirado.');
                }
              } else {
                setAccidental('natural');
                setVolume(100);
                setStatus('Nota natural. Sin mano izquierda no hay volumen ni accidental.');
              }

              result.landmarks.forEach((landmarks) => {
                context.strokeStyle = '#6ee7b7';
                context.lineWidth = 3;

                landmarks.forEach((point) => {
                  context.beginPath();
                  context.arc(point.x * canvas.width, point.y * canvas.height, 4, 0, Math.PI * 2);
                  context.fillStyle = '#fbbf24';
                  context.fill();
                });

                context.beginPath();
                context.moveTo(landmarks[0].x * canvas.width, landmarks[0].y * canvas.height);
                for (let i = 1; i < landmarks.length; i++) {
                  context.lineTo(landmarks[i].x * canvas.width, landmarks[i].y * canvas.height);
                }
                context.stroke();
              });
            } else if (evaluationActiveRef.current) {
              evaluationCanAnswerRef.current = true;
            }
          }

          animationFrameId = requestAnimationFrame(render);
        };

        render();
      } catch (error) {
        console.error(error);
        setStatus('No se pudo acceder a la cámara. Comprueba los permisos.');
      }
    };

    startDetection();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (landmarker) {
        landmarker.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!isCameraReady) return;

    const activeVisualNote = `${note}${getAccidentalLabel(accidental)}`;
    setStatus(`Nota activa: ${activeVisualNote} • Volumen ${volume}%`);
    playTone(note, accidental, volume, audioContextRef.current);
  }, [note, accidental, isCameraReady]);

  const accidentalSymbol = accidental === 'sharp' ? '♯' : accidental === 'flat' ? '♭' : '';
  const staffNote = evaluationActive ? evaluationTarget : note;
  const keyboardNaturalNote = evaluationActive ? null : getKeyboardNaturalNote(note, accidental);

  return (
    <div className="app-shell">
      <div className="music-decor" aria-hidden="true">
        <span className="music-note note-one">♪</span>
        <span className="music-note note-two">♫</span>
        <span className="music-note note-three">♩</span>
        <span className="music-note note-four">𝄞</span>
      </div>
      <header className="topbar">
        <div>
          <p className="label">HandPiano Kids</p>
          <h1>Aprende notas con tus manos</h1>
        </div>
      </header>

      <main className="game-layout">
        <section className="camera-panel">
          <div className="camera-frame">
            <video ref={videoRef} autoPlay playsInline muted />
            <canvas ref={canvasRef} />
          </div>
          <p className="status">{status}</p>
        </section>

        <aside className="info-panel">
          <div className="note-card">
            <span className="note-title">Nota actual</span>
            <strong>{evaluationActive ? '?' : `${note}${getAccidentalLabel(accidental)}`}</strong>
          </div>

          <div className="note-list">
            {NOTES.map((item) => (
              <div key={item} className={`pill ${!evaluationActive && item === note ? 'active' : ''}`}>
                {item}
              </div>
            ))}
          </div>

          <div className="controls-grid">
            <div className="mini-box">
              <span>Volumen</span>
              <strong>{volume}%</strong>
            </div>
            <div className="mini-box">
              <span>Accidental</span>
              <strong>{accidental === 'natural' ? 'Natural' : accidental === 'sharp' ? 'Sostenido' : 'Bemol'}</strong>
            </div>
          </div>

          <div className="staff-box">
            <span className="treble-clef" aria-hidden="true">𝄞</span>
            <div className="staff-line" />
            <div className="staff-line" />
            <div className="staff-line" />
            <div className="staff-line" />
            <div className="staff-line" />
            {staffNote === 'DO' && <div className="ledger-line ledger-line-below" />}
            <div className={`note-on-staff ${STAFF_NOTE_POSITIONS[staffNote]}`}>
              {!evaluationActive && accidentalSymbol && <span className="accidental-on-staff">{accidentalSymbol}</span>}
              <span className="whole-note" aria-label={evaluationActive ? 'Nota de evaluación' : `${note}${getAccidentalLabel(accidental)}`} />
            </div>
          </div>

          <section className={`evaluation-panel ${evaluationActive || evaluationComplete ? 'evaluation-live' : ''}`}>
            {confettiBurst > 0 && (
              <div key={confettiBurst} className="confetti-burst" aria-hidden="true">
                {CONFETTI_PARTICLES.map((particle, index) => (
                  <span
                    key={index}
                    className="confetti-piece"
                    style={{
                      '--confetti-color': particle.color,
                      '--confetti-x': particle.x,
                      '--confetti-y': particle.y,
                      '--confetti-rotation': particle.rotation,
                      '--confetti-delay': particle.delay,
                    }}
                  />
                ))}
              </div>
            )}
            <div className="evaluation-copy">
              <span className="note-title">Evaluación</span>
              <strong>{evaluationActive ? `Ronda ${evaluationRound} de 3` : evaluationComplete ? 'Tres rondas completadas' : 'Pon a prueba tu oído visual'}</strong>
              {evaluationFeedback && <p>{evaluationFeedback}</p>}
            </div>
            {!evaluationActive && !evaluationComplete && (
              <button className="evaluation-button" type="button" onClick={startEvaluation}>
                Empezar evaluación
              </button>
            )}
            {evaluationComplete && (
              <div className="evaluation-actions">
                <button className="evaluation-button" type="button" onClick={startEvaluation}>Sí, otra</button>
                <button className="evaluation-button secondary" type="button" onClick={() => {
                  setEvaluationComplete(false);
                  setEvaluationFeedback('');
                }}>No</button>
              </div>
            )}
            {evaluationActive && (
              <button className="evaluation-button secondary" type="button" onClick={cancelEvaluation}>
                Salir de la evaluación
              </button>
            )}
          </section>

          <section className="keyboard-panel" aria-label="Teclado musical">
            <div className="keyboard-heading">
              <span>Teclado</span>
              <strong>{evaluationActive ? '?' : `${note}${getAccidentalLabel(accidental)}`}</strong>
            </div>
            <div className="keyboard">
              <div className="white-keys">
                {NOTES.map((item) => (
                  <div
                    key={item}
                    className={`piano-key white-key ${item === keyboardNaturalNote ? 'active' : ''}`}
                  >
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              {ACCIDENTAL_KEYS.map((item) => {
                const isActive = (accidental === 'sharp' && item.sharpNote === note)
                  || (accidental === 'flat' && item.flatNote === note);

                return (
                  <div
                    key={item.position}
                    className={`piano-key black-key ${item.position} ${isActive ? 'active' : ''}`}
                    aria-label={item.label}
                  />
                );
              })}
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}

export default App;
