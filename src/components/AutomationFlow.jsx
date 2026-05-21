import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AutomationFlow.module.scss';
import {
  FiType, FiFileText, FiLayers, FiVideo, FiMic, FiMusic, FiFilm,
  FiHash, FiSearch, FiImage, FiPlay, FiCheckCircle, FiArrowRight,
  FiClock, FiZap, FiShield, FiSend, FiPlus, FiMinus, FiMaximize,
  FiCpu, FiCheck
} from 'react-icons/fi';
import { FaYoutube, FaTiktok, FaInstagram } from 'react-icons/fa';

const CANVAS_W   = 1900;
const CANVAS_H   = 620;
const NODE_HALF_W = 75;

const nodes = [
  { id: 'trigger',    subtitle: 'LINK TRIGGER',  title: 'Input URL',       icon: <FiType />,      x: 90,   y: 310 },
  { id: 'script',     subtitle: 'AI MODULE',      title: 'Script Writer',   icon: <FiFileText />,  x: 280,  y: 310 },
  { id: 'scene',      subtitle: 'PROCESSING',     title: 'Scene Planner',   icon: <FiLayers />,    x: 470,  y: 310 },
  { id: 'visual',     subtitle: 'VISUAL TRACK',   title: 'Visual Planner',  icon: <FiVideo />,     x: 680,  y: 130 },
  { id: 'voice',      subtitle: 'VOICE TRACK',    title: 'Voice Planner',   icon: <FiMic />,       x: 680,  y: 310 },
  { id: 'sfxtrack',   subtitle: 'AUDIO TRACK',    title: 'Audio Planner',   icon: <FiMusic />,     x: 680,  y: 490 },
  { id: 'aiimg',      subtitle: 'DALLE·3',        title: 'AI Image Gen',    icon: <FiImage />,     x: 910,  y: 70  },
  { id: 'broll',      subtitle: 'PEXELS API',     title: 'B-Roll Search',   icon: <FiFilm />,      x: 910,  y: 190 },
  { id: 'tts',        subtitle: 'ELEVENLABS',     title: 'Text-to-Speech',  icon: <FiMic />,       x: 910,  y: 310 },
  { id: 'music',      subtitle: 'SUNO AI',        title: 'AI Music Gen',    icon: <FiMusic />,     x: 910,  y: 430 },
  { id: 'sfx',        subtitle: 'SFX LIBRARY',    title: 'Ambient SFX',     icon: <FiPlay />,      x: 910,  y: 550 },
  { id: 'compiler',   subtitle: 'FFMPEG CORE',    title: 'Video Compiler',  icon: <FiFilm />,      x: 1140, y: 310 },
  { id: 'captions',   subtitle: 'WHISPER AI',     title: 'Auto Captions',   icon: <FiHash />,      x: 1350, y: 170 },
  { id: 'meta',       subtitle: 'SEO MODULE',     title: 'Titles & Tags',   icon: <FiSearch />,    x: 1350, y: 310 },
  { id: 'thumb',      subtitle: 'STABLE DIFF',    title: 'Thumbnail Gen',   icon: <FiImage />,     x: 1350, y: 450 },
  { id: 'checkmedia', subtitle: 'QUALITY CHECK',  title: 'Check Media',     icon: <FiShield />,    x: 1580, y: 310 },
  { id: 'publish',    subtitle: 'DISTRIBUTOR',    title: 'Send to Publish', icon: <FiSend />,      x: 1780, y: 310 },
];

const edges = [
  { id: 'e1',  from: 'trigger',    to: 'script'     },
  { id: 'e2',  from: 'script',     to: 'scene'      },
  { id: 'e3',  from: 'scene',      to: 'visual',     curved: true },
  { id: 'e4',  from: 'scene',      to: 'voice'      },
  { id: 'e5',  from: 'scene',      to: 'sfxtrack',   curved: true },
  { id: 'e6',  from: 'visual',     to: 'aiimg',      curved: true },
  { id: 'e7',  from: 'visual',     to: 'broll',      curved: true },
  { id: 'e8',  from: 'voice',      to: 'tts'        },
  { id: 'e9',  from: 'sfxtrack',   to: 'music',      curved: true },
  { id: 'e10', from: 'sfxtrack',   to: 'sfx',        curved: true },
  { id: 'e11', from: 'aiimg',      to: 'compiler',   curved: true },
  { id: 'e12', from: 'broll',      to: 'compiler',   curved: true },
  { id: 'e13', from: 'tts',        to: 'compiler'   },
  { id: 'e14', from: 'music',      to: 'compiler',   curved: true },
  { id: 'e15', from: 'sfx',        to: 'compiler',   curved: true },
  { id: 'e16', from: 'compiler',   to: 'captions',   curved: true },
  { id: 'e17', from: 'compiler',   to: 'meta'       },
  { id: 'e18', from: 'compiler',   to: 'thumb',      curved: true },
  { id: 'e19', from: 'captions',   to: 'checkmedia', curved: true },
  { id: 'e20', from: 'meta',       to: 'checkmedia' },
  { id: 'e21', from: 'thumb',      to: 'checkmedia', curved: true },
  { id: 'e22', from: 'checkmedia', to: 'publish'    },
];

const getPathD = (from, to, curved) => {
  const sx = from.x + NODE_HALF_W, ex = to.x - NODE_HALF_W;
  if (!curved || from.y === to.y) return `M ${sx} ${from.y} L ${ex} ${to.y}`;
  const mx = (sx + ex) / 2;
  return `M ${sx} ${from.y} C ${mx} ${from.y}, ${mx} ${to.y}, ${ex} ${to.y}`;
};

const STEPS = [
  {
    nodes: ['trigger'],
    edges: [],
    text: 'Initializing workflow',
    title: 'Initializing Workflow',
    description: 'URL trigger detected, fetching data...',
    icon: <FiZap />,
    step: 1
  },
  {
    nodes: ['script'],
    edges: ['e1'],
    text: 'AI drafting script',
    title: 'AI Drafting Script',
    description: 'Writing voiceover and pacing...',
    icon: <FiFileText />,
    step: 2
  },
  {
    nodes: ['scene'],
    edges: ['e2'],
    text: 'Planning scenes',
    title: 'Planning Scenes',
    description: 'Mapping visuals to script segments...',
    icon: <FiLayers />,
    step: 3
  },
  {
    nodes: ['visual', 'voice', 'sfxtrack'],
    edges: ['e3', 'e4', 'e5'],
    text: 'Splitting tracks',
    title: 'Splitting Tracks',
    description: 'Creating parallel rendering lanes...',
    icon: <FiVideo />,
    step: 4
  },
  {
    nodes: ['aiimg', 'broll', 'tts', 'music', 'sfx'],
    edges: ['e6','e7','e8','e9','e10'],
    text: 'Running AI modules',
    title: 'Running AI Modules',
    description: 'Generating images, audio, voice...',
    icon: <FiCpu />,
    step: 5
  },
  {
    nodes: ['compiler'],
    edges: ['e11','e12','e13','e14','e15'],
    text: 'Compiling assets',
    title: 'Compiling Assets',
    description: 'FFmpeg merging video layers...',
    icon: <FiFilm />,
    step: 6
  },
  {
    nodes: ['captions', 'meta', 'thumb'],
    edges: ['e16', 'e17', 'e18'],
    text: 'Generating metadata',
    title: 'Generating Metadata',
    description: 'Whisper captions & Stable Diffusion...',
    icon: <FiHash />,
    step: 7
  },
  {
    nodes: ['checkmedia'],
    edges: ['e19', 'e20', 'e21'],
    text: 'Running quality checks',
    title: 'Running Quality Checks',
    description: 'Applying AI-powered safety filters...',
    icon: <FiShield />,
    step: 8
  },
  {
    nodes: ['publish'],
    edges: ['e22'],
    text: 'Sending to distributor',
    title: 'Sending to Distributor',
    description: 'Pushing to TikTok, YouTube, Reels...',
    icon: <FiSend />,
    step: 9
  },
];

export default function AutomationFlow() {
  const [phase, setPhase]             = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeNodes, setActiveNodes] = useState([]);
  const [successNodes, setSuccessNodes] = useState([]);
  const [activeEdges, setActiveEdges] = useState([]);
  const [successEdges, setSuccessEdges] = useState([]);
  const [textInput, setTextInput]     = useState('');
  const [statusText, setStatusText]   = useState('Waiting for trigger...');
  const [isRunning, setIsRunning]     = useState(false);
  const activeIndex = currentStep - 1;
  const getStepHeight = (idx) => {
    if (idx < 0 || idx >= STEPS.length) return 0;
    const s = STEPS[idx];
    const done = currentStep > s.step;
    const lineHeight = !isRunning ? 18 : done ? 12 : 36;
    if (idx === STEPS.length - 1) return 38;
    return 38 + lineHeight;
  };

  const getOffsetToTop = (targetIdx) => {
    let offset = 0;
    for (let i = 0; i < targetIdx; i++) {
      offset += getStepHeight(i);
    }
    return offset;
  };

  const getFlexibleScroll = () => {
    if (!isRunning) return 0;
    
    const safeActiveIndex = Math.max(0, activeIndex);
    const targetIdx = Math.max(0, safeActiveIndex - 1);
    const maxTargetIdx = Math.max(0, STEPS.length - 6);
    
    const clampedTarget = Math.min(maxTargetIdx, targetIdx);
    let offset = getOffsetToTop(clampedTarget);
    
    if (safeActiveIndex > maxTargetIdx + 1) {
       let shrinkage = 0;
       for (let i = maxTargetIdx + 1; i < safeActiveIndex; i++) {
         shrinkage += 24; 
       }
       offset -= shrinkage;
    }
    
    const activeTop = getOffsetToTop(safeActiveIndex);
    const activeBottom = activeTop + getStepHeight(safeActiveIndex);
    
    const minOffset = Math.max(0, activeBottom - 280); 
    const maxOffset = Math.max(0, activeTop - 20); 
    
    return Math.max(minOffset, Math.min(maxOffset, offset));
  };

  const scrollOffset = getFlexibleScroll();


  // Pan/Zoom
  const wrapperRef      = useRef(null);
  const canvasInnerRef  = useRef(null);
  const transformRef    = useRef({ x: 0, y: 0, scale: 0.6 });
  const isDragging      = useRef(false);
  const lastMouse       = useRef({ x: 0, y: 0 });
  const runRef          = useRef(false);

  const applyTransform = () => {
    if (!canvasInnerRef.current) return;
    const { x, y, scale } = transformRef.current;
    canvasInnerRef.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  };

  const fitView = () => {
    const w = wrapperRef.current?.offsetWidth  || 900;
    const h = wrapperRef.current?.offsetHeight || 480;
    const s = Math.min(w / CANVAS_W, h / CANVAS_H) * 0.88;
    transformRef.current = { x: (w - CANVAS_W * s) / 2, y: (h - CANVAS_H * s) / 2, scale: s };
    applyTransform();
  };

  useEffect(() => {
    fitView();
    window.addEventListener('resize', fitView);
    return () => window.removeEventListener('resize', fitView);
  }, []);

  // Wheel zoom (non-passive)
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (!e.ctrlKey && !e.metaKey) return; // Ignore if Ctrl/Cmd is not pressed, allowing normal page scroll
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const factor = e.deltaY < 0 ? 1.008 : 0.992;
      const oldS = transformRef.current.scale;
      const newS = Math.min(Math.max(oldS * factor, 0.15), 3);
      transformRef.current.x = mx - (mx - transformRef.current.x) * (newS / oldS);
      transformRef.current.y = my - (my - transformRef.current.y) * (newS / oldS);
      transformRef.current.scale = newS;
      applyTransform();
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const onMouseDown = (e) => { isDragging.current = true; lastMouse.current = { x: e.clientX, y: e.clientY }; };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    transformRef.current.x += e.clientX - lastMouse.current.x;
    transformRef.current.y += e.clientY - lastMouse.current.y;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    applyTransform();
  };
  const onMouseUp = () => { isDragging.current = false; };
  const zoomIn    = () => { transformRef.current.scale = Math.min(transformRef.current.scale * 1.2, 3); applyTransform(); };
  const zoomOut   = () => { transformRef.current.scale = Math.max(transformRef.current.scale * 0.8, 0.15); applyTransform(); };

  // Sequence
  const typeText = async (text, setter, delay = 18) => {
    setter('');
    for (let i = 0; i <= text.length; i++) {
      setter(text.slice(0, i));
      await new Promise(r => setTimeout(r, delay));
    }
  };

  const runSequence = async () => {
    if (runRef.current) return;
    runRef.current = true;
    setIsRunning(true);
    setPhase(1);
    setCurrentStep(0);
    setActiveNodes([]); setSuccessNodes([]);
    setActiveEdges([]);  setSuccessEdges([]);
    setTextInput('');
    setStatusText('Extracting data from URL...');
    await typeText('https://youtu.be/MjKP4ozSn8I?si=OOJbcAtL_IxP1aWE', setTextInput);
    await new Promise(r => setTimeout(r, 400));

    for (const step of STEPS) {
      setStatusText(step.text + '...');
      setCurrentStep(step.step);
      if (step.edges.length) {
        setActiveEdges(step.edges);
        await new Promise(r => setTimeout(r, 600));
        setSuccessEdges(prev => [...prev, ...step.edges]);
        setActiveEdges([]);
      }
      setActiveNodes(step.nodes);
      await new Promise(r => setTimeout(r, 950));
      setActiveNodes([]);
      setSuccessNodes(prev => [...prev, ...step.nodes]);
    }
    setCurrentStep(STEPS.length + 1);
    setStatusText('Workflow completed!');
    await new Promise(r => setTimeout(r, 800));
    setPhase(2);
    setIsRunning(false);
    runRef.current = false;
  };

  const handlePublish = async () => {
    setPhase(3);
    await new Promise(r => setTimeout(r, 4500));
    setPhase(0); setCurrentStep(0);
    setActiveNodes([]); setSuccessNodes([]);
    setActiveEdges([]);  setSuccessEdges([]);
    setTextInput(''); setStatusText('Waiting for trigger...');
    runRef.current = false; setIsRunning(false);
  };

  useEffect(() => {
    let t;
    if (phase === 2) t = setTimeout(() => handlePublish(), 4000);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <section className={styles.flowSection}>

      {/* ── Two-column header ── */}
      <div className={styles.sectionHeader}>

        {/* Left: title + CTA */}
        <div className={styles.headerLeft}>
          <div className={styles.badge}><span>Fully Automated</span></div>
          <h2>Intelligent Automation<br />Workflow</h2>
          <p>
            Drop a URL and watch Clipza orchestrate 17 AI modules in parallel —
            generating script, visuals, voice, music, captions and publishing
            to every platform in seconds.
          </p>
          <div className={styles.headerActions}>
            <button
              className={`primaryBtn no-rotate ${styles.seeHowBtn} ${isRunning ? styles.disabled : ''}`}
              onClick={() => { if (!isRunning && phase < 2) runSequence(); }}
            >
              <span className="btn-text">{isRunning ? 'Running...' : 'See how it works'}</span>
              <div className="btn-icon-wrapper"><FiPlay /></div>
            </button>
          </div>
        </div>

        {/* Right: live card */}
        <div className={styles.headerRight}>
          <div className={styles.liveCard}>
             <div className={styles.liveCardHeader}>
              <span className={styles.liveDot}></span>
              <span>
                {phase === 2 ? 'Generated Video Preview' : phase === 3 ? 'Publishing Status' : 'Live Workflow Status'}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {phase === 2 && (
                <motion.div
                  key="preview"
                  className={styles.inlinePreview}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ type: 'spring', damping: 22 }}
                >
                  <div className={styles.inlineThumbnail}>
                    <div className={styles.playBtn}><FiPlay /></div>
                  </div>
                  <div className={styles.inlineMeta}>
                    <h4>How AI is Changing Tech in 2026</h4>
                    <p>Discover the unseen revolutions happening behind closed doors...</p>
                  </div>
                  <div className={styles.inlineTags}>
                    <span>#AI</span><span>#Tech2026</span><span>#Future</span>
                  </div>
                  <div className={styles.actionButtons}>
                    <button className={`secondaryBtn ${styles.scheduleBtn}`}>
                      <span className="btn-text">Schedule</span>
                      <div className="btn-icon-wrapper"><FiClock /></div>
                    </button>
                    <button className={`primaryBtn ${styles.publishBtn}`} onClick={handlePublish}>
                      <span className="btn-text">Publish Now</span>
                      <div className="btn-icon-wrapper"><FiArrowRight /></div>
                    </button>
                  </div>
                </motion.div>
              )}

              {phase === 3 && (
                <motion.div
                  key="success"
                  className={styles.inlineSuccess}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', damping: 20 }}
                >
                  <motion.div className={styles.checkCircle} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: 'spring' }}>
                    <FiCheckCircle />
                  </motion.div>
                  <h4>Video Published!</h4>
                  <p className={styles.successSubtext}>Live across all platforms.</p>
                  <div className={styles.platformLinks}>
                    <div className={styles.platform}>
                      <FaYoutube className={`${styles.platformIcon} ${styles.youtube}`} />
                      <span>YouTube Shorts</span>
                    </div>
                    <div className={styles.platform}>
                      <FaTiktok className={`${styles.platformIcon} ${styles.tiktok}`} />
                      <span>TikTok</span>
                    </div>
                    <div className={styles.platform}>
                      <FaInstagram className={`${styles.platformIcon} ${styles.instagram}`} />
                      <span>Instagram Reels</span>
                    </div>
                  </div>
                  <div className={styles.progressBarWrapper}>
                    <div className={styles.progressText}>Resetting workflow...</div>
                    <motion.div className={styles.progressBarFill} initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 4.5, ease: 'linear' }} />
                  </div>
                </motion.div>
              )}

              {phase < 2 && (
                <motion.div key="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className={styles.terminalOutput}>
                    <span className={styles.terminalPrompt}>$</span>
                    <span className={styles.terminalText}>{textInput || 'waiting for input...'}</span>
                    {isRunning && (
                      <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className={styles.cursor}>|</motion.span>
                    )}
                  </div>

                  <div className={styles.stepsViewport}>
                    <motion.div
                      className={styles.stepsScrollContainer}
                      animate={{ y: -scrollOffset }}
                      transition={{ type: 'spring', damping: 22, stiffness: 100 }}
                    >
                      {STEPS.map((s, idx) => {
                        const done   = currentStep > s.step;
                        const active = currentStep === s.step && isRunning;
                        const pending = currentStep < s.step || (!isRunning && currentStep === 0);
                        
                        const lineHeight = !isRunning ? 18 : done ? 12 : 36;
                        
                        return (
                          <div
                            key={s.step}
                            className={`${styles.stepWrapper} ${done ? styles.stepDone : ''} ${active ? styles.stepActive : ''} ${pending ? styles.stepPending : ''}`}
                          >
                            <div className={styles.stepFlex}>
                              <div className={styles.stepLeft}>
                                <div className={styles.stepCircle}>
                                  {done ? <FiCheck className={styles.checkIcon} /> : s.icon}
                                </div>
                                {idx < STEPS.length - 1 && (
                                  <motion.div
                                    className={styles.stepConnector}
                                    animate={{ height: lineHeight }}
                                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                                  />
                                )}
                              </div>
                              
                              <div className={styles.stepContent}>
                                <h4 className={styles.stepTitle}>{s.title}</h4>
                                <p className={styles.stepDescription}>{s.description}</p>
                              </div>
                              
                              <div className={styles.stepRight}>
                                {active ? (
                                  <span className={styles.activePulse}>In Progress</span>
                                ) : done ? (
                                  <span className={styles.doneLabel}>Done</span>
                                ) : (
                                  <span className={styles.pendingLabel}>Pending</span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  </div>

                  <div className={styles.statusPill}>
                    <AnimatePresence mode="wait">
                      <motion.span key={statusText} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className={styles.statusText}>
                        {statusText}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Draggable / Zoomable Canvas ── */}
      <div
        className={styles.flowWrapper}
        ref={wrapperRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* Inner canvas — positioned by transform */}
        <div className={styles.canvasInner} ref={canvasInnerRef}>
          <svg className={styles.svgConnections} viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}>
            {edges.map(edge => {
              const from   = nodes.find(n => n.id === edge.from);
              const to     = nodes.find(n => n.id === edge.to);
              const d      = getPathD(from, to, edge.curved);
              const active = activeEdges.includes(edge.id) || successEdges.includes(edge.id);
              return (
                <g key={edge.id}>
                  <path d={d} className={styles.basePath} />
                  <motion.path d={d} className={styles.solidPath}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                  />
                </g>
              );
            })}
          </svg>

          {nodes.map(node => (
            <motion.div
              key={node.id}
              className={styles.nodeBox}
              style={{ '--x': `${node.x}px`, '--y': `${node.y}px` }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className={[
                styles.node,
                activeNodes.includes(node.id)  ? styles.processing  : '',
                successNodes.includes(node.id) ? styles.success     : '',
                node.id === 'checkmedia'       ? styles.nodeQA      : '',
                node.id === 'publish'          ? styles.nodePublish : '',
              ].join(' ')}>
                <div className={styles.anchorLeft}></div>
                <div className={styles.anchorRight}></div>
                <div className={styles.nodeHeader}>
                  <div className={styles.icon}>{node.icon}</div>
                  <span className={styles.subtitle}>{node.subtitle}</span>
                </div>
                <h3 className={styles.title}>{node.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Zoom controls */}
        <div className={styles.zoomControls}>
          <button onClick={zoomIn}  title="Zoom in"><FiPlus /></button>
          <button onClick={fitView} title="Fit view"><FiMaximize /></button>
          <button onClick={zoomOut} title="Zoom out"><FiMinus /></button>
        </div>

        {/* Hint */}
        <div className={styles.canvasHint}>Ctrl + Scroll to zoom &middot; Drag to pan</div>
      </div>
    </section>
  );
}
