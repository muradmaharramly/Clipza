import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './AutomationFlow.module.scss';
import { 
  FiType, FiFileText, FiLayers, FiVideo, 
  FiMic, FiMusic, FiFilm, FiHash, 
  FiSearch, FiImage, FiPlay, FiCheckCircle, FiArrowRight, FiClock
} from 'react-icons/fi';

// Canvas: 1700 × 620px
const CANVAS_W = 1700;
const CANVAS_H = 620;
const NODE_HALF_W = 75; // node width = 150px

const nodes = [
  // Layer 0 — Entry
  { id: 'trigger',  subtitle: 'LINK TRIGGER',  title: 'Input URL',       icon: <FiType />,     x: 90,   y: 310 },
  // Layer 1 — Script
  { id: 'script',   subtitle: 'AI MODULE',      title: 'Script Writer',   icon: <FiFileText />, x: 300,  y: 310 },
  // Layer 2 — Planning
  { id: 'scene',    subtitle: 'PROCESSING',     title: 'Scene Planner',   icon: <FiLayers />,   x: 510,  y: 310 },
  // Layer 3 — 3 parallel tracks
  { id: 'visual',   subtitle: 'VISUAL TRACK',   title: 'Visual Planner',  icon: <FiVideo />,    x: 730,  y: 130 },
  { id: 'voice',    subtitle: 'VOICE TRACK',    title: 'Voice Planner',   icon: <FiMic />,      x: 730,  y: 310 },
  { id: 'sfxtrack', subtitle: 'AUDIO TRACK',    title: 'Audio Planner',   icon: <FiMusic />,    x: 730,  y: 490 },
  // Layer 4 — 5 generation modules (each track splits)
  { id: 'aiimg',    subtitle: 'DALLE·3',        title: 'AI Image Gen',    icon: <FiImage />,    x: 970,  y: 70  },
  { id: 'broll',    subtitle: 'PEXELS API',     title: 'B-Roll Search',   icon: <FiFilm />,     x: 970,  y: 190 },
  { id: 'tts',      subtitle: 'ELEVENLABS',     title: 'Text-to-Speech',  icon: <FiMic />,      x: 970,  y: 310 },
  { id: 'music',    subtitle: 'SUNO AI',        title: 'AI Music Gen',    icon: <FiMusic />,    x: 970,  y: 430 },
  { id: 'sfx',      subtitle: 'SFX LIBRARY',    title: 'Ambient SFX',     icon: <FiPlay />,     x: 970,  y: 550 },
  // Layer 5 — Compiler
  { id: 'compiler', subtitle: 'FFMPEG CORE',    title: 'Video Compiler',  icon: <FiFilm />,     x: 1220, y: 310 },
  // Layer 6 — Output 3 branches
  { id: 'captions', subtitle: 'WHISPER AI',     title: 'Auto Captions',   icon: <FiHash />,     x: 1450, y: 170 },
  { id: 'meta',     subtitle: 'SEO MODULE',     title: 'Titles & Tags',   icon: <FiSearch />,   x: 1450, y: 310 },
  { id: 'thumb',    subtitle: 'STABLE DIFF',    title: 'Thumbnail Gen',   icon: <FiImage />,    x: 1450, y: 450 },
];

const edges = [
  { id: 'e1',  from: 'trigger',  to: 'script'   },
  { id: 'e2',  from: 'script',   to: 'scene'    },
  // scene → 3 tracks
  { id: 'e3',  from: 'scene',    to: 'visual',   curved: true },
  { id: 'e4',  from: 'scene',    to: 'voice'    },
  { id: 'e5',  from: 'scene',    to: 'sfxtrack', curved: true },
  // visual → 2 modules
  { id: 'e6',  from: 'visual',   to: 'aiimg',    curved: true },
  { id: 'e7',  from: 'visual',   to: 'broll',    curved: true },
  // voice → tts
  { id: 'e8',  from: 'voice',    to: 'tts'      },
  // sfxtrack → 2 modules
  { id: 'e9',  from: 'sfxtrack', to: 'music',    curved: true },
  { id: 'e10', from: 'sfxtrack', to: 'sfx',      curved: true },
  // 5 modules → compiler
  { id: 'e11', from: 'aiimg',    to: 'compiler', curved: true },
  { id: 'e12', from: 'broll',    to: 'compiler', curved: true },
  { id: 'e13', from: 'tts',      to: 'compiler' },
  { id: 'e14', from: 'music',    to: 'compiler', curved: true },
  { id: 'e15', from: 'sfx',      to: 'compiler', curved: true },
  // compiler → 3 outputs
  { id: 'e16', from: 'compiler', to: 'captions', curved: true },
  { id: 'e17', from: 'compiler', to: 'meta'     },
  { id: 'e18', from: 'compiler', to: 'thumb',    curved: true },
];

const getPathD = (fromNode, toNode, curved) => {
  const startX = fromNode.x + NODE_HALF_W;
  const endX   = toNode.x   - NODE_HALF_W;
  if (!curved || fromNode.y === toNode.y) {
    return `M ${startX} ${fromNode.y} L ${endX} ${toNode.y}`;
  }
  const midX = (startX + endX) / 2;
  return `M ${startX} ${fromNode.y} C ${midX} ${fromNode.y}, ${midX} ${toNode.y}, ${endX} ${toNode.y}`;
};

const AutomationFlow = () => {
  const [phase, setPhase]           = useState(0);
  const [activeNodes, setActiveNodes]   = useState([]);
  const [successNodes, setSuccessNodes] = useState([]);
  const [activeEdges, setActiveEdges]   = useState([]);
  const [successEdges, setSuccessEdges] = useState([]);
  const [textInput, setTextInput]   = useState('');
  const [statusText, setStatusText] = useState('Waiting for trigger...');
  const [scale, setScale]           = useState(1);
  const [offset, setOffset]         = useState(0);
  const wrapperRef = React.useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (!wrapperRef.current) return;
      const avail = wrapperRef.current.offsetWidth - 48; // 2×24px side padding
      if (avail < CANVAS_W) {
        const s = avail / CANVAS_W;
        setScale(s);
        setOffset(0); // already fills width
      } else {
        setScale(1);
        setOffset((avail - CANVAS_W) / 2); // center when viewport > canvas
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const typeText = async (text, setter, delay = 20) => {
    setter('');
    for (let i = 0; i <= text.length; i++) {
      setter(text.slice(0, i));
      await new Promise(r => setTimeout(r, delay));
    }
  };

  const runSequence = async () => {
    setPhase(0);
    setActiveNodes([]);
    setSuccessNodes([]);
    setActiveEdges([]);
    setSuccessEdges([]);
    setTextInput('');
    setStatusText('Waiting for trigger...');

    await new Promise(r => setTimeout(r, 800));
    setStatusText('Extracting data from URL...');
    await typeText('https://en.wikipedia.org/wiki/Artificial_intelligence', setTextInput);
    await new Promise(r => setTimeout(r, 600));
    setPhase(1);

    const steps = [
      { nodes: ['trigger'],                               edges: [],                                                   text: 'Initializing workflow...' },
      { nodes: ['script'],                                edges: ['e1'],                                               text: 'AI drafting video script...' },
      { nodes: ['scene'],                                 edges: ['e2'],                                               text: 'Planning scene structure...' },
      { nodes: ['visual', 'voice', 'sfxtrack'],           edges: ['e3', 'e4', 'e5'],                                   text: 'Splitting into parallel tracks...' },
      { nodes: ['aiimg', 'broll', 'tts', 'music', 'sfx'],edges: ['e6', 'e7', 'e8', 'e9', 'e10'],                     text: 'Running AI generation modules...' },
      { nodes: ['compiler'],                              edges: ['e11', 'e12', 'e13', 'e14', 'e15'],                 text: 'Compiling all assets...' },
      { nodes: ['captions', 'meta', 'thumb'],             edges: ['e16', 'e17', 'e18'],                               text: 'Generating output & metadata...' },
    ];

    for (const step of steps) {
      setStatusText(step.text);
      if (step.edges.length > 0) {
        setActiveEdges(step.edges);
        await new Promise(r => setTimeout(r, 700));
        setSuccessEdges(prev => [...prev, ...step.edges]);
        setActiveEdges([]);
      }
      setActiveNodes(step.nodes);
      await new Promise(r => setTimeout(r, 1100));
      setActiveNodes([]);
      setSuccessNodes(prev => [...prev, ...step.nodes]);
    }

    setStatusText('Workflow completed successfully!');
    await new Promise(r => setTimeout(r, 600));
    setPhase(2);
  };

  useEffect(() => { runSequence(); }, []);

  useEffect(() => {
    let timer;
    if (phase === 2) timer = setTimeout(() => handlePublish(), 3000);
    return () => clearTimeout(timer);
  }, [phase]);

  const handlePublish = async () => {
    setPhase(3);
    await new Promise(r => setTimeout(r, 4000));
    runSequence();
  };

  return (
    <section className={styles.flowSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Intelligent Automation Workflow</h2>
          <p>Watch as Clipza transforms a simple link into a fully produced video in seconds.</p>
        </div>

        <div className={styles.topControls}>
          <div className={styles.inputBox}>
            <div className={styles.terminalOutput}>
              {textInput}
              <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>|</motion.span>
            </div>
            <button
              className={`primaryBtn ${styles.generateBtn} ${phase > 0 ? styles.disabled : ''}`}
              onClick={() => { if (phase === 0) runSequence(); }}
            >
              <span className="btn-text">{phase > 0 ? 'Running...' : 'Generate'}</span>
              <div className="btn-icon-wrapper"><FiPlay /></div>
            </button>
          </div>

          <div className={styles.statusPill}>
            <motion.span
              key={statusText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.statusText}
            >
              {statusText}
            </motion.span>
          </div>
        </div>
      </div>

      {/* Full-width canvas wrapper */}
      <div
        className={styles.flowWrapper}
        ref={wrapperRef}
        style={{ '--scale': scale, '--canvas-h': `${CANVAS_H}px` }}
      >
        <div
          className={styles.canvas}
          style={{ '--offset': `${offset}px` }}
        >
          {/* SVG edges */}
          <svg className={styles.svgConnections} viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}>
            {edges.map(edge => {
              const from = nodes.find(n => n.id === edge.from);
              const to   = nodes.find(n => n.id === edge.to);
              const d    = getPathD(from, to, edge.curved);
              const active = activeEdges.includes(edge.id) || successEdges.includes(edge.id);
              return (
                <g key={edge.id}>
                  <path d={d} className={styles.basePath} />
                  <motion.path
                    d={d}
                    className={styles.solidPath}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }}
                    transition={{ duration: 1.0, ease: 'easeInOut' }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map(node => (
            <motion.div
              key={node.id}
              className={styles.nodeBox}
              style={{ '--x': `${node.x}px`, '--y': `${node.y}px` }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`${styles.node} ${activeNodes.includes(node.id) ? styles.processing : ''} ${successNodes.includes(node.id) ? styles.success : ''}`}>
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

          {/* Overlay — inside canvas so it scales with it */}
          {phase >= 2 && (
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {phase === 2 ? (
                <motion.div
                  className={styles.previewCard}
                  initial={{ y: 40, scale: 0.9, opacity: 0 }}
                  animate={{ y: 0, scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 20 }}
                >
                  <div className={styles.thumbnail}>
                    <div className={styles.playBtn}><FiPlay /></div>
                  </div>
                  <div className={styles.meta}>
                    <h3>How AI is Changing Tech in 2026</h3>
                    <p>Discover the unseen revolutions happening behind closed doors in the tech industry today...</p>
                  </div>
                  <div className={styles.tags}>
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
              ) : (
                <motion.div
                  className={styles.successCard}
                  initial={{ scale: 0.8, opacity: 0, y: 30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: 'spring', damping: 20 }}
                >
                  <div className={styles.successHeader}>
                    <motion.div
                      className={styles.checkCircle}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                    >
                      <FiCheckCircle />
                    </motion.div>
                    <h3>Video Successfully Published!</h3>
                    <p className={styles.successSubtext}>Your video is now live across all platforms.</p>
                  </div>

                  <div className={styles.platformLinks}>
                    <div className={styles.platform}>
                      <div className={styles.platformDot} style={{ background: '#ff0000' }}></div>
                      <span>YouTube Shorts</span>
                    </div>
                    <div className={styles.platform}>
                      <div className={styles.platformDot} style={{ background: '#8B5CF6' }}></div>
                      <span>TikTok</span>
                    </div>
                    <div className={styles.platform}>
                      <div className={styles.platformDot} style={{ background: '#E1306C' }}></div>
                      <span>Instagram Reels</span>
                    </div>
                  </div>

                  <div className={styles.progressBarWrapper}>
                    <div className={styles.progressText}>Starting next workflow...</div>
                    <motion.div
                      className={styles.progressBarFill}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 4, ease: 'linear' }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AutomationFlow;
