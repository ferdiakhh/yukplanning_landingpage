import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Eye,
  Heart,
  MessageCircle,
  RefreshCw,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { SUPPORT_WHATSAPP } from '../config/env';

interface MaintenanceExperienceProps {
  message: string;
  supportWhatsapp?: string;
  isChecking: boolean;
  onRecheck: () => Promise<void>;
  onMinimize: () => void;
}

type FallKind = 'ring' | 'rose' | 'heart' | 'drama';

interface FallingItem {
  kind: FallKind;
  x: number; // normalized 0..1
  y: number; // normalized -0.08..1.15
  speed: number;
  radius: number;
  swayAmp: number;
  swayFreq: number;
  phase: number;
  rotation: number;
  rotSpeed: number;
}

interface BurstDot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  isStar: boolean;
  life: number;
}

interface ScorePopup {
  text: string;
  x: number;
  y: number;
  color: string;
  life: number;
}

interface BgStar {
  x: number;
  y: number;
  size: number;
  phase: number;
}

export interface StageTheme {
  name: string;
  bgGradient: string;
  arenaGradient: string;
  accentColor: string;
  stageGlowHex: string;
  catcherTop: string;
  catcherBottom: string;
  buttonTextColor: string;
}

const MILESTONE_STEP = 1000;
const MAX_LIVES = 3;
const RECHECK_SECONDS = 30;
const BEST_SCORE_STORAGE_KEY = 'yukplanning_maint_best_score';

export const STAGE_THEMES: StageTheme[] = [
  {
    name: 'Malam Burgundy',
    bgGradient: 'linear-gradient(180deg, #2D0E17 0%, #3E1420 50%, #19060B 100%)',
    arenaGradient: 'linear-gradient(180deg, #1A070D 0%, #2B0D16 55%, #16050A 100%)',
    accentColor: '#F8DFB4',
    stageGlowHex: '#D8AB64',
    catcherTop: '#9E3B52',
    catcherBottom: '#5D1D2C',
    buttonTextColor: '#4A1924',
  },
  {
    name: 'Taman Senja',
    bgGradient: 'linear-gradient(180deg, #0D241E 0%, #153D32 50%, #071612 100%)',
    arenaGradient: 'linear-gradient(180deg, #081814 0%, #0F2B23 55%, #05110E 100%)',
    accentColor: '#D9F5C4',
    stageGlowHex: '#7AD6A7',
    catcherTop: '#256D58',
    catcherBottom: '#123C30',
    buttonTextColor: '#103329',
  },
  {
    name: 'Langit Bintang',
    bgGradient: 'linear-gradient(180deg, #0E1535 0%, #1A285C 50%, #080C1F 100%)',
    arenaGradient: 'linear-gradient(180deg, #090E24 0%, #121C42 55%, #060917 100%)',
    accentColor: '#C7DCFF',
    stageGlowHex: '#7FA8FF',
    catcherTop: '#334C96',
    catcherBottom: '#1B2958',
    buttonTextColor: '#15214C',
  },
  {
    name: 'Senja Sakura',
    bgGradient: 'linear-gradient(180deg, #3A1228 0%, #5D1F42 50%, #1F0916 100%)',
    arenaGradient: 'linear-gradient(180deg, #240A19 0%, #3E142D 55%, #16060F 100%)',
    accentColor: '#FFD6E8',
    stageGlowHex: '#F28AB8',
    catcherTop: '#A83E72',
    catcherBottom: '#631E40',
    buttonTextColor: '#4F1634',
  },
  {
    name: 'Istana Emas',
    bgGradient: 'linear-gradient(180deg, #2C1D0A 0%, #4B3211 50%, #170F05 100%)',
    arenaGradient: 'linear-gradient(180deg, #1C1206 0%, #33210A 55%, #120B03 100%)',
    accentColor: '#FFE59E',
    stageGlowHex: '#E6B555',
    catcherTop: '#9C6D24',
    catcherBottom: '#5C3D10',
    buttonTextColor: '#422A0A',
  },
];

function getThemeForScore(score: number): StageTheme {
  const tier = Math.max(0, Math.floor(score / MILESTONE_STEP));
  return STAGE_THEMES[tier % STAGE_THEMES.length];
}

function formatThousands(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function loadBestScore(): number {
  try {
    const raw = window.localStorage.getItem(BEST_SCORE_STORAGE_KEY);
    const parsed = raw ? parseInt(raw, 10) : 0;
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  } catch {
    return 0;
  }
}

function saveBestScore(score: number) {
  try {
    window.localStorage.setItem(BEST_SCORE_STORAGE_KEY, String(score));
  } catch {
    // Abaikan jika storage tidak tersedia
  }
}

function drawFourPointStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  fillStyle: string
) {
  ctx.beginPath();
  ctx.moveTo(cx, cy - r);
  ctx.quadraticCurveTo(cx, cy, cx + r, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy + r);
  ctx.quadraticCurveTo(cx, cy, cx - r, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy - r);
  ctx.closePath();
  ctx.fillStyle = fillStyle;
  ctx.fill();
}

function drawGoldenRing(ctx: CanvasRenderingContext2D, r: number) {
  // Soft glow
  const glow = ctx.createRadialGradient(0, 0, 2, 0, 0, r * 1.15);
  glow.addColorStop(0, 'rgba(248, 223, 180, 0.28)');
  glow.addColorStop(1, 'rgba(248, 223, 180, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, r * 1.15, 0, Math.PI * 2);
  ctx.fill();

  // Ring band
  ctx.beginPath();
  ctx.arc(0, 3, r * 0.56, 0, Math.PI * 2);
  ctx.strokeStyle = '#F6D492';
  ctx.lineWidth = 3.2;
  ctx.stroke();

  // Diamond crown
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.8);
  ctx.lineTo(r * 0.35, -r * 0.36);
  ctx.lineTo(0, -r * 0.14);
  ctx.lineTo(-r * 0.35, -r * 0.36);
  ctx.closePath();
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.strokeStyle = '#F8DFB4';
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawBlushRose(ctx: CanvasRenderingContext2D, r: number) {
  // Leaves
  ctx.fillStyle = '#7FA688';
  ctx.save();
  ctx.rotate(-0.6);
  ctx.beginPath();
  ctx.ellipse(-r * 0.45, r * 0.25, r * 0.34, r * 0.16, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.rotate(0.6);
  ctx.beginPath();
  ctx.ellipse(r * 0.45, r * 0.25, r * 0.34, r * 0.16, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 5 outer petals
  ctx.fillStyle = '#F29CB3';
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(Math.cos(a) * r * 0.34, Math.sin(a) * r * 0.34, r * 0.38, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = '#FFDCE5';
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#E06D8B';
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.13, 0, Math.PI * 2);
  ctx.fill();
}

function drawLoveHeart(ctx: CanvasRenderingContext2D, r: number) {
  const s = r * 0.85;
  const grad = ctx.createLinearGradient(-s, -s, s, s);
  grad.addColorStop(0, '#FFB7C5');
  grad.addColorStop(1, '#E06D8B');
  ctx.beginPath();
  ctx.moveTo(0, s * 0.65);
  ctx.bezierCurveTo(-s * 1.1, 0, -s * 0.9, -s * 0.95, 0, -s * 0.3);
  ctx.bezierCurveTo(s * 0.9, -s * 0.95, s * 1.1, 0, 0, s * 0.65);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.fillStyle = 'rgba(255,255,255,0.72)';
  ctx.beginPath();
  ctx.arc(-s * 0.32, -s * 0.28, 2.2, 0, Math.PI * 2);
  ctx.fill();
}

function drawDramaCloud(ctx: CanvasRenderingContext2D, r: number) {
  ctx.fillStyle = '#4B3E59';
  ctx.strokeStyle = 'rgba(168, 150, 186, 0.72)';
  ctx.lineWidth = 1.4;

  ctx.beginPath();
  ctx.arc(-r * 0.42, 0, r * 0.39, 0, Math.PI * 2);
  ctx.arc(r * 0.42, 0, r * 0.39, 0, Math.PI * 2);
  ctx.arc(0, -r * 0.24, r * 0.48, 0, Math.PI * 2);
  ctx.roundRect(-r * 0.75, -r * 0.12, r * 1.5, r * 0.52, r * 0.24);
  ctx.fill();
  ctx.stroke();

  // Lightning bolt
  ctx.beginPath();
  ctx.moveTo(2, r * 0.35);
  ctx.lineTo(-5, r * 0.78);
  ctx.lineTo(1, r * 0.78);
  ctx.lineTo(-3, r * 1.15);
  ctx.lineTo(7, r * 0.66);
  ctx.lineTo(1, r * 0.66);
  ctx.closePath();
  ctx.fillStyle = '#FFD166';
  ctx.fill();
}

export function MaintenanceExperience({
  message,
  supportWhatsapp,
  isChecking,
  onRecheck,
  onMinimize,
}: MaintenanceExperienceProps) {
  const [countdown, setCountdown] = useState(RECHECK_SECONDS);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState<number>(() => loadBestScore());
  const [combo, setCombo] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);
  const [stageTier, setStageTier] = useState(0);
  const [damageFlash, setDamageFlash] = useState(0);
  const [milestoneBanner, setMilestoneBanner] = useState<{
    title: string;
    subtitle: string;
  } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const arenaRef = useRef<HTMLDivElement | null>(null);
  const bannerTimeoutRef = useRef<number | null>(null);
  const keysHeldRef = useRef<{ left: boolean; right: boolean }>({
    left: false,
    right: false,
  });

  // Mutable 60fps simulation state
  const gameRef = useRef({
    clock: 0,
    width: 0,
    height: 0,
    catcherX: 0.5,
    targetCatcherX: 0.5,
    catcherTilt: 0,
    catchGlow: 0,
    damageFlash: 0,
    spawnAccumulator: 0,
    hasInteracted: false,
    isGameOver: false,
    score: 0,
    bestScore: loadBestScore(),
    combo: 0,
    lives: MAX_LIVES,
    stageTier: 0,
    items: [] as FallingItem[],
    particles: [] as BurstDot[],
    popups: [] as ScorePopup[],
    stars: Array.from({ length: 28 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.78,
      size: 1.0 + Math.random() * 1.8,
      phase: Math.random() * Math.PI * 2,
    })) as BgStar[],
  });

  const cleanPhone = (supportWhatsapp || SUPPORT_WHATSAPP || '').replace(/[^0-9]/g, '');
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        'Halo tim YukPlanning, saya ingin menanyakan progres pemeliharaan sistem.'
      )}`
    : '';

  const stageTheme = getThemeForScore(score);
  const displayMessage =
    message?.trim() || 'Kami sedang merapikan sistem sebentar. Main dulu yuk!';

  const createItem = useCallback(
    (forcedKind?: FallKind, initialY = -0.08): FallingItem => {
      const g = gameRef.current;
      const difficulty = Math.min(1, g.score / 320);
      let kind: FallKind;
      if (forcedKind) {
        kind = forcedKind;
      } else {
        const roll = Math.random();
        const dramaChance = g.hasInteracted ? 0.18 + difficulty * 0.12 : 0.08;
        if (roll < dramaChance) {
          kind = 'drama';
        } else if (roll < dramaChance + 0.22) {
          kind = 'ring';
        } else if (roll < dramaChance + 0.56) {
          kind = 'heart';
        } else {
          kind = 'rose';
        }
      }

      const baseSpeed =
        kind === 'ring'
          ? 0.3 + Math.random() * 0.08
          : kind === 'rose'
          ? 0.2 + Math.random() * 0.06
          : kind === 'heart'
          ? 0.24 + Math.random() * 0.07
          : 0.26 + Math.random() * 0.09;

      const speedScale = g.hasInteracted ? 1 + difficulty * 0.55 : 0.72;

      return {
        kind,
        x: 0.12 + Math.random() * 0.76,
        y: initialY,
        speed: baseSpeed * speedScale,
        radius:
          kind === 'ring' ? 19 : kind === 'rose' ? 17 : kind === 'heart' ? 16 : 21,
        swayAmp: kind === 'rose' ? 0.045 : 0.015,
        swayFreq: 1.6 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
        rotation: (Math.random() - 0.5) * 0.4,
        rotSpeed: (Math.random() - 0.5) * (kind === 'drama' ? 0.3 : 1.1),
      };
    },
    []
  );

  const spawnBurst = useCallback(
    (x: number, y: number, baseColor: string, count = 12) => {
      const g = gameRef.current;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
        const speed = 75 + Math.random() * 145;
        g.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 65,
          size: 2.2 + Math.random() * 3.0,
          color: i % 2 === 0 ? baseColor : '#FFFFFF',
          isStar: i % 3 === 0,
          life: 1.0,
        });
      }
      if (g.particles.length > 80) {
        g.particles.splice(0, g.particles.length - 80);
      }
    },
    []
  );

  const triggerMilestoneCelebration = useCallback(
    (tier: number) => {
      const g = gameRef.current;
      const theme = STAGE_THEMES[tier % STAGE_THEMES.length];
      const milestonePoints = tier * MILESTONE_STEP;

      let healed = false;
      if (g.lives < MAX_LIVES) {
        g.lives += 1;
        setLives(g.lives);
        healed = true;
      }

      setMilestoneBanner({
        title: `${formatThousands(milestonePoints)} POIN • ${theme.name.toUpperCase()}`,
        subtitle: healed
          ? 'Suasana baru terbuka! Bonus +1 ♥ nyawa'
          : 'Suasana pelaminan baru terbuka ✨',
      });

      if (bannerTimeoutRef.current) {
        window.clearTimeout(bannerTimeoutRef.current);
      }
      bannerTimeoutRef.current = window.setTimeout(() => {
        setMilestoneBanner(null);
      }, 2600);

      if (g.width > 0 && g.height > 0) {
        spawnBurst(g.width * 0.25, g.height * 0.26, theme.accentColor, 10);
        spawnBurst(g.width * 0.5, g.height * 0.2, '#FFE5A8', 12);
        spawnBurst(g.width * 0.75, g.height * 0.26, theme.stageGlowHex, 10);
      }
    },
    [spawnBurst]
  );

  // Lock underlying document scroll while full-screen overlay is active
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Auto-recheck countdown every 30s
  useEffect(() => {
    const id = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          void onRecheck();
          return RECHECK_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [onRecheck]);

  // Keyboard support for desktop players (ArrowLeft / ArrowRight / A / D)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        keysHeldRef.current.left = true;
        if (!gameRef.current.hasInteracted) {
          gameRef.current.hasInteracted = true;
          setHasInteracted(true);
        }
      } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        keysHeldRef.current.right = true;
        if (!gameRef.current.hasInteracted) {
          gameRef.current.hasInteracted = true;
          setHasInteracted(true);
        }
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        keysHeldRef.current.left = false;
      } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        keysHeldRef.current.right = false;
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  // Main 60fps Canvas Loop
  useEffect(() => {
    const g = gameRef.current;
    if (g.items.length === 0) {
      g.items.push(createItem('rose', 0.14), createItem('ring', -0.02));
    }

    let rafId = 0;
    let lastTs = performance.now();

    const syncCanvasSize = () => {
      const canvas = canvasRef.current;
      const arena = arenaRef.current;
      if (!canvas || !arena) return;
      const rect = arena.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (
        Math.abs(rect.width - g.width) > 0.5 ||
        Math.abs(rect.height - g.height) > 0.5
      ) {
        g.width = rect.width;
        g.height = rect.height;
        canvas.width = Math.max(1, Math.floor(rect.width * dpr));
        canvas.height = Math.max(1, Math.floor(rect.height * dpr));
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
      }
    };

    syncCanvasSize();
    const resizeObserver = new ResizeObserver(syncCanvasSize);
    if (arenaRef.current) {
      resizeObserver.observe(arenaRef.current);
    }

    const handleCatch = (kind: FallKind, x: number, y: number) => {
      if (!g.hasInteracted) {
        if (kind === 'drama') {
          spawnBurst(x, y, '#9E8EB2', 8);
          return;
        }
        g.catchGlow = 0.8;
        spawnBurst(x, y, '#F8DFB4', 10);
        return;
      }

      if (kind === 'drama') {
        g.combo = 0;
        g.lives = Math.max(0, g.lives - 1);
        g.damageFlash = 1.0;
        setCombo(0);
        setLives(g.lives);
        setDamageFlash(1.0);
        spawnBurst(x, y, '#FF6B6B', 14);
        g.popups.push({
          text: 'Drama Vendor! -1 ♥',
          x,
          y: y - 8,
          color: '#FF8E8E',
          life: 1.0,
        });
        if (g.lives <= 0) {
          g.isGameOver = true;
          g.items = [];
          setIsGameOver(true);
        }
        return;
      }

      g.combo += 1;
      const multiplier = g.combo >= 8 ? 3 : g.combo >= 4 ? 2 : 1;
      const basePoints = kind === 'ring' ? 25 : kind === 'heart' ? 15 : 10;
      const gained = basePoints * multiplier;
      g.score += gained;
      g.catchGlow = 1.0;

      setScore(g.score);
      setCombo(g.combo);

      if (g.score > g.bestScore) {
        g.bestScore = g.score;
        setBestScore(g.score);
        setIsNewBest(true);
        saveBestScore(g.score);
      }

      const newTier = Math.floor(g.score / MILESTONE_STEP);
      if (newTier > g.stageTier) {
        g.stageTier = newTier;
        setStageTier(newTier);
        triggerMilestoneCelebration(newTier);
      }

      spawnBurst(
        x,
        y,
        kind === 'ring' ? '#F8DFB4' : '#F7B2C4',
        kind === 'ring' ? 16 : 10
      );
      g.popups.push({
        text: multiplier > 1 ? `+${gained}  x${multiplier}!` : `+${gained}`,
        x,
        y: y - 6,
        color: kind === 'ring' ? '#FFE5A8' : '#FFD6E0',
        life: 1.0,
      });
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTs) / 1000));
      lastTs = now;
      g.clock += dt;

      // Keyboard movement
      if (!g.isGameOver) {
        const keySpeed = 0.85 * dt;
        if (keysHeldRef.current.left) {
          g.targetCatcherX = Math.max(0.11, g.targetCatcherX - keySpeed);
        }
        if (keysHeldRef.current.right) {
          g.targetCatcherX = Math.min(0.89, g.targetCatcherX + keySpeed);
        }
      }

      // Smooth catcher interpolation & tilt
      const dx = g.targetCatcherX - g.catcherX;
      g.catcherX += dx * Math.min(1, dt * 18);
      const desiredTilt = Math.max(-0.24, Math.min(0.24, dx * 3.8));
      g.catcherTilt += (desiredTilt - g.catcherTilt) * Math.min(1, dt * 14);

      if (g.catchGlow > 0) g.catchGlow = Math.max(0, g.catchGlow - dt * 3);
      if (g.damageFlash > 0) {
        g.damageFlash = Math.max(0, g.damageFlash - dt * 3.2);
        if (g.damageFlash === 0) setDamageFlash(0);
      }

      // Update particles
      for (let i = g.particles.length - 1; i >= 0; i--) {
        const p = g.particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 260 * dt;
        p.life -= dt * 1.65;
        if (p.life <= 0) g.particles.splice(i, 1);
      }

      // Update popups
      for (let i = g.popups.length - 1; i >= 0; i--) {
        const pop = g.popups[i];
        pop.y -= 48 * dt;
        pop.life -= dt * 1.35;
        if (pop.life <= 0) g.popups.splice(i, 1);
      }

      // Update falling items & collisions
      if (!g.isGameOver && g.width > 0 && g.height > 0) {
        const difficulty = Math.min(1, g.score / 320);
        const spawnInterval = g.hasInteracted
          ? Math.max(0.45, 0.95 - difficulty * 0.42)
          : 1.25;
        g.spawnAccumulator += dt;
        if (g.spawnAccumulator >= spawnInterval) {
          g.spawnAccumulator = 0;
          if (g.items.length < 10) {
            g.items.push(createItem());
          }
        }

        const catcherPxX = g.catcherX * g.width;
        const catcherPxY = g.height - 54;
        const catcherHalfW = 44;
        const catcherHitH = 26;

        for (let i = g.items.length - 1; i >= 0; i--) {
          const item = g.items[i];
          item.y += item.speed * dt;
          item.rotation += item.rotSpeed * dt;

          const drawNormX = Math.max(
            0.08,
            Math.min(
              0.92,
              item.x + Math.sin(g.clock * item.swayFreq + item.phase) * item.swayAmp
            )
          );
          const itemPxX = drawNormX * g.width;
          const itemPxY = item.y * g.height;

          const hitX = Math.abs(itemPxX - catcherPxX) <= catcherHalfW + item.radius * 0.55;
          const hitY = Math.abs(itemPxY - catcherPxY) <= catcherHitH + item.radius * 0.55;

          if (hitX && hitY) {
            g.items.splice(i, 1);
            handleCatch(item.kind, itemPxX, catcherPxY - 12);
            continue;
          }

          if (item.y > 1.08) {
            g.items.splice(i, 1);
            if (g.hasInteracted && item.kind === 'ring' && g.combo > 0) {
              g.combo = 0;
              setCombo(0);
            }
          }
        }
      }

      // Draw frame
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx && g.width > 0 && g.height > 0) {
        const w = g.width;
        const h = g.height;
        const theme = getThemeForScore(g.score);
        ctx.clearRect(0, 0, w, h);

        // 1. Ambient Stage Glow
        const stageGlow = ctx.createRadialGradient(
          w * 0.5,
          h * 0.92,
          10,
          w * 0.5,
          h * 0.92,
          Math.max(w, h) * 0.72
        );
        stageGlow.addColorStop(
          0,
          hexToRgba(theme.stageGlowHex, 0.16 + g.catchGlow * 0.16)
        );
        stageGlow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = stageGlow;
        ctx.fillRect(0, 0, w, h);

        // 2. Twinkling Starfield
        for (const s of g.stars) {
          const twinkle =
            0.2 + 0.55 * (0.5 + 0.5 * Math.sin(g.clock * 2.0 + s.phase));
          ctx.fillStyle = hexToRgba(theme.accentColor, twinkle);
          ctx.beginPath();
          ctx.arc(s.x * w, s.y * h, s.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // 3. Soft Floor Guide Line
        const catcherPxX = g.catcherX * w;
        const catcherPxY = h - 54;
        ctx.strokeStyle = 'rgba(255,255,255,0.07)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(28, catcherPxY + 24);
        ctx.lineTo(w - 28, catcherPxY + 24);
        ctx.stroke();

        // 4. Falling Items
        for (const item of g.items) {
          const drawNormX = Math.max(
            0.08,
            Math.min(
              0.92,
              item.x + Math.sin(g.clock * item.swayFreq + item.phase) * item.swayAmp
            )
          );
          ctx.save();
          ctx.translate(drawNormX * w, item.y * h);
          ctx.rotate(item.rotation);
          if (item.kind === 'ring') drawGoldenRing(ctx, item.radius);
          else if (item.kind === 'rose') drawBlushRose(ctx, item.radius);
          else if (item.kind === 'heart') drawLoveHeart(ctx, item.radius);
          else drawDramaCloud(ctx, item.radius);
          ctx.restore();
        }

        // 5. Velvet & Gold Ring Pillow Catcher
        ctx.save();
        ctx.translate(catcherPxX, catcherPxY);
        ctx.rotate(g.catcherTilt);

        if (g.catchGlow > 0.01) {
          const aura = ctx.createRadialGradient(0, 0, 8, 0, 0, 58);
          aura.addColorStop(0, hexToRgba(theme.accentColor, 0.36 * g.catchGlow));
          aura.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = aura;
          ctx.beginPath();
          ctx.ellipse(0, 0, 58, 24, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        // Drop shadow
        ctx.fillStyle = 'rgba(0,0,0,0.42)';
        ctx.beginPath();
        ctx.ellipse(0, 18, 38, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cushion body
        const cushionGrad = ctx.createLinearGradient(0, -14, 0, 14);
        cushionGrad.addColorStop(0, theme.catcherTop);
        cushionGrad.addColorStop(1, theme.catcherBottom);
        ctx.beginPath();
        ctx.roundRect(-42, -14, 84, 28, 16);
        ctx.fillStyle = cushionGrad;
        ctx.fill();

        // Gold border
        const rimGrad = ctx.createLinearGradient(-42, 0, 42, 0);
        rimGrad.addColorStop(0, '#F8DFB4');
        rimGrad.addColorStop(0.5, '#D8AB64');
        rimGrad.addColorStop(1, '#FFF2D6');
        ctx.strokeStyle = rimGrad;
        ctx.lineWidth = 2.2;
        ctx.stroke();

        // Satin ribbon + emblem
        ctx.strokeStyle = 'rgba(248, 223, 180, 0.38)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-32, 0);
        ctx.lineTo(32, 0);
        ctx.stroke();
        drawFourPointStar(ctx, 0, 0, 6.5, '#FFF2D6');
        ctx.restore();

        // 6. Sparkle Burst Particles
        for (const p of g.particles) {
          const alpha = Math.max(0, Math.min(1, p.life));
          const col = p.color.startsWith('#')
            ? hexToRgba(p.color, alpha)
            : p.color;
          if (p.isStar) {
            drawFourPointStar(ctx, p.x, p.y, p.size * 1.6, col);
          } else {
            ctx.fillStyle = col;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // 7. Floating Score Popups
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '800 13px "Plus Jakarta Sans", system-ui, sans-serif';
        for (const pop of g.popups) {
          const alpha = Math.max(0, Math.min(1, pop.life));
          ctx.fillStyle = hexToRgba(pop.color, alpha);
          ctx.fillText(pop.text, pop.x, pop.y);
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      if (bannerTimeoutRef.current) {
        window.clearTimeout(bannerTimeoutRef.current);
      }
    };
  }, [createItem, spawnBurst, triggerMilestoneCelebration]);

  const updatePointerPosition = (clientX: number) => {
    const arena = arenaRef.current;
    const g = gameRef.current;
    if (!arena || g.isGameOver) return;
    const rect = arena.getBoundingClientRect();
    if (rect.width <= 0) return;
    if (!g.hasInteracted) {
      g.hasInteracted = true;
      setHasInteracted(true);
    }
    const rel = (clientX - rect.left) / rect.width;
    g.targetCatcherX = Math.max(0.11, Math.min(0.89, rel));
  };

  const handleRestart = () => {
    const g = gameRef.current;
    g.score = 0;
    g.combo = 0;
    g.lives = MAX_LIVES;
    g.stageTier = 0;
    g.isGameOver = false;
    g.hasInteracted = true;
    g.damageFlash = 0;
    g.catchGlow = 0;
    g.spawnAccumulator = 0;
    g.particles = [];
    g.popups = [];
    g.items = [createItem('rose', 0.05), createItem('ring', -0.1)];

    setScore(0);
    setCombo(0);
    setLives(MAX_LIVES);
    setStageTier(0);
    setIsGameOver(false);
    setIsNewBest(false);
    setDamageFlash(0);
    setMilestoneBanner(null);
  };

  const handleManualRecheck = async () => {
    setCountdown(RECHECK_SECONDS);
    await onRecheck();
  };

  return (
    <div
      className="fixed inset-0 z-[100] h-[100dvh] w-full text-[#FFF9F7] transition-all duration-1000 select-none overflow-hidden"
      style={{ background: stageTheme.bgGradient }}
    >
      <div className="h-full max-w-xl mx-auto px-5 py-4 sm:py-6 flex flex-col">
        {/* 1. MINIMAL HEADER (Zero clutter, no stacked cards) */}
        <div className="text-center shrink-0">
          <div className="inline-flex items-center justify-center gap-2 mb-1.5">
            <span
              className="w-2 h-2 rounded-full transition-colors duration-700"
              style={{
                backgroundColor: stageTheme.accentColor,
                boxShadow: `0 0 10px ${stageTheme.accentColor}`,
              }}
            />
            <span
              className="text-[10.5px] font-bold uppercase tracking-[0.2em] transition-colors duration-700"
              style={{ color: stageTheme.accentColor }}
            >
              {stageTier > 0
                ? `MAINTENANCE • ${stageTheme.name.toUpperCase()}`
                : 'MAINTENANCE'}
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
            Sebentar Ya, Sedang Bersolek
          </h1>

          <p className="mt-1.5 text-xs sm:text-sm text-[#F3D0D8]/85 line-clamp-2 max-w-md mx-auto leading-relaxed">
            {displayMessage}
          </p>
        </div>

        {/* 2. HERO INTERACTIVE 60FPS MINI-GAME ARENA */}
        <motion.div
          animate={damageFlash > 0 ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.25 }}
          ref={arenaRef}
          data-testid="maintenance-game-arena"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture?.(e.pointerId);
            updatePointerPosition(e.clientX);
          }}
          onPointerMove={(e) => {
            if (e.pointerType === 'mouse' || e.buttons > 0) {
              updatePointerPosition(e.clientX);
            }
          }}
          className="relative flex-1 min-h-[260px] my-3.5 rounded-[28px] overflow-hidden shadow-2xl cursor-ew-resize touch-none transition-all duration-1000"
          style={{
            background: stageTheme.arenaGradient,
            border: `1.5px solid ${
              damageFlash > 0
                ? 'rgba(255, 107, 107, 0.8)'
                : hexToRgba(stageTheme.accentColor, 0.22)
            }`,
          }}
        >
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Compact HUD Top Row */}
          <div className="pointer-events-none absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
            <div
              data-testid="maintenance-score-badge"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/35 border border-white/10 backdrop-blur-sm"
            >
              <Sparkles
                className="w-3.5 h-3.5 transition-colors duration-700"
                style={{ color: stageTheme.accentColor }}
              />
              <span className="text-xs font-extrabold text-white tabular-nums">
                {formatThousands(score)}
              </span>
              {combo >= 3 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#E6BE78] text-[#2B0D16] text-[10px] font-extrabold leading-none">
                  x{combo >= 8 ? 3 : 2}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              {bestScore > 0 && (
                <span
                  className="text-[11px] font-semibold tabular-nums transition-colors duration-700"
                  style={{ color: hexToRgba(stageTheme.accentColor, 0.8) }}
                >
                  Rekor {formatThousands(bestScore)}
                </span>
              )}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: MAX_LIVES }).map((_, idx) => (
                  <Heart
                    key={idx}
                    className={`w-4 h-4 transition-all duration-200 ${
                      idx < lives
                        ? 'text-[#F27D97] fill-[#F27D97] scale-100'
                        : 'text-white/15 scale-90'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Floating Milestone Celebration Banner (every 1.000 pts) */}
          <AnimatePresence>
            {milestoneBanner && !isGameOver && (
              <motion.div
                key={milestoneBanner.title}
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.94 }}
                transition={{ duration: 0.35 }}
                className="pointer-events-none absolute top-14 left-4 right-4 flex justify-center"
              >
                <div
                  className="px-4 py-2 rounded-2xl bg-black/50 backdrop-blur-md text-center"
                  style={{
                    border: `1px solid ${hexToRgba(stageTheme.accentColor, 0.45)}`,
                  }}
                >
                  <p
                    className="text-[11px] font-extrabold tracking-wider"
                    style={{ color: stageTheme.accentColor }}
                  >
                    {milestoneBanner.title}
                  </p>
                  <p className="text-[11px] text-white/90 mt-0.5">
                    {milestoneBanner.subtitle}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Subtle Drag/Mouse Cue before first interaction */}
          <AnimatePresence>
            {!hasInteracted && !isGameOver && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="pointer-events-none absolute bottom-[88px] left-4 right-4 flex justify-center"
              >
                <div
                  className="px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-sm text-[11px] font-semibold text-center"
                  style={{
                    color: stageTheme.accentColor,
                    border: `1px solid ${hexToRgba(stageTheme.accentColor, 0.25)}`,
                  }}
                >
                  ← Geser kursor / jari tangkap cincin & bunga, hindari awan →
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Minimal Game Over Overlay inside arena */}
          <AnimatePresence>
            {isGameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#16050A]/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center"
              >
                {isNewBest && (
                  <span
                    className="mb-2 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase"
                    style={{
                      color: stageTheme.accentColor,
                      backgroundColor: hexToRgba(stageTheme.accentColor, 0.16),
                      border: `1px solid ${hexToRgba(stageTheme.accentColor, 0.45)}`,
                    }}
                  >
                    REKOR BARU ✨
                  </span>
                )}
                <p className="font-serif text-5xl font-bold text-white leading-none tabular-nums">
                  {formatThousands(score)}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-[#F3D0D8] max-w-xs">
                  {score >= 1000
                    ? 'Luar biasa! Kamu sudah membuka suasana baru & menaklukkan drama vendor.'
                    : 'Kena awan drama vendor! Yuk coba lagi sambil menunggu.'}
                </p>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm cursor-pointer transition-transform active:scale-95"
                  style={{
                    backgroundColor: stageTheme.accentColor,
                    color: '#1E080F',
                  }}
                >
                  <RotateCcw className="w-4 h-4" />
                  Main Lagi
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 3. COMPACT SINGLE-ROW ACTION BAR */}
        <div className="shrink-0">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleManualRecheck}
              disabled={isChecking}
              className="flex-1 h-12 rounded-2xl bg-white hover:bg-[#FFF8F5] font-bold text-sm shadow-lg transition-all active:scale-[0.98] disabled:opacity-75 cursor-pointer inline-flex items-center justify-center gap-2"
              style={{ color: stageTheme.buttonTextColor }}
            >
              <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
              <span>
                {isChecking ? 'Memeriksa...' : `Cek Status • ${countdown}d`}
              </span>
            </button>

            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Hubungi Tim Support via WhatsApp"
                aria-label="Hubungi Tim Support via WhatsApp"
                className="w-12 h-12 shrink-0 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 flex items-center justify-center transition-colors"
                style={{ color: stageTheme.accentColor }}
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            )}
          </div>

          <div className="mt-2.5 text-center">
            <button
              type="button"
              onClick={onMinimize}
              className="inline-flex items-center gap-1.5 text-[11px] text-[#F3D0D8]/70 hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              Intip info fitur sambil menunggu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
