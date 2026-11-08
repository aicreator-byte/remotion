import React from 'react';
import {colors} from '../utils/colors';
import {useCurrentFrame, spring} from 'remotion';

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
  color: string;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  width: number;
  height: number;
  color?: string;
  speed?: number;
  sizeRange?: [number, number];
  opacityRange?: [number, number];
  connectDistance?: number;
  connectColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ParticleBackground = ({
  particleCount = 50,
  width,
  height,
  color = colors.primary,
  speed = 0.3,
  sizeRange = [1, 3],
  opacityRange = [0.1, 0.5],
  connectDistance = 120,
  connectColor,
  className = '',
  style = {},
}: ParticleBackgroundProps) => {
  const frame = useCurrentFrame();

  // Generate deterministic particles based on frame
  const particles: Particle[] = Array.from({length: particleCount}, (_, i) => {
    const seed = i * 12345 + frame * 7;
    const seededRandom = (s: number) => {
      s = Math.sin(s) * 10000;
      return s - Math.floor(s);
    };

    return {
      x: seededRandom(seed) * width,
      y: seededRandom(seed + 1000) * height,
      size: sizeRange[0] + seededRandom(seed + 2000) * (sizeRange[1] - sizeRange[0]),
      opacity: opacityRange[0] + seededRandom(seed + 3000) * (opacityRange[1] - opacityRange[0]),
      speedX: (seededRandom(seed + 4000) - 0.5) * speed,
      speedY: (seededRandom(seed + 5000) - 0.5) * speed,
      color: color,
    };
  });

  // Animate particles
  const animatedParticles = particles.map(p => ({
    ...p,
    x: (p.x + p.speedX * frame) % width,
    y: (p.y + p.speedY * frame) % height,
  }));

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style,
      }}
      aria-hidden="true"
    >
      <svg width={width} height={height} style={{position: 'absolute', top: 0, left: 0}}>
        {/* Connections */}
        {connectDistance > 0 && (
          <g stroke={connectColor || withOpacity(color, 0.15)} strokeWidth={0.5} opacity={0.3}>
            {animatedParticles.forEach((p1, i) => {
              animatedParticles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < connectDistance) {
                  const opacity = (1 - dist / connectDistance) * 0.3;
                  return (
                    <line
                      key={`${i}-${animatedParticles.indexOf(p2)}`}
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      strokeOpacity={opacity}
                    />
                  );
                }
              });
            })}
          </g>
        )}

        {/* Particles */}
        <g>
          {animatedParticles.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={p.size}
              fill={p.color}
              opacity={p.opacity}
              style={{filter: `blur(${p.size * 0.5}px)`}}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

// Floating geometric shapes
export const FloatingShapes = ({
  count = 15,
  width,
  height,
  colors: shapeColors = [colors.primary, colors.secondary, colors.accent],
  minSize = 20,
  maxSize = 80,
  speed = 0.2,
  borderRadius = '50%',
}: {
  count?: number;
  width: number;
  height: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  speed?: number;
  borderRadius?: string;
}) => {
  const frame = useCurrentFrame();

  const shapes = Array.from({length: count}, (_, i) => {
    const seed = i * 54321 + frame * 3;
    const seededRandom = (s: number) => {
      s = Math.sin(s) * 10000;
      return s - Math.floor(s);
    };

    const size = minSize + seededRandom(seed) * (maxSize - minSize);
    const colorIndex = Math.floor(seededRandom(seed + 1000) * shapeColors.length);

    return {
      x: seededRandom(seed + 2000) * width,
      y: (seededRandom(seed + 3000) * height + frame * speed * (0.5 + seededRandom(seed + 4000) * 0.5)) % (height + size) - size / 2,
      size,
      color: shapeColors[colorIndex],
      rotation: seededRandom(seed + 5000) * 360,
      rotationSpeed: (seededRandom(seed + 6000) - 0.5) * 0.5,
      opacity: 0.05 + seededRandom(seed + 7000) * 0.1,
      borderRadius: borderRadius,
    };
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      {shapes.map((shape, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
            background: shape.color,
            borderRadius: shape.borderRadius,
            opacity: shape.opacity,
            transform: `rotate(${shape.rotation + shape.rotationSpeed * frame}deg)`,
            filter: 'blur(20px)',
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
};

// Mesh gradient background
export const MeshGradient = ({
  width,
  height,
  points = 4,
  colors: meshColors = [
    {color: colors.primary, opacity: 0.15},
    {color: colors.secondary, opacity: 0.1},
    {color: colors.accent, opacity: 0.1},
    {color: colors.primary, opacity: 0.08},
  ],
  speed = 0.02,
}: {
  width: number;
  height: number;
  points?: number;
  colors?: Array<{color: string; opacity: number}>;
  speed?: number;
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      {meshColors.map((point, i) => {
        const angle = (frame * speed + i * (360 / points)) * (Math.PI / 180);
        const radius = Math.min(width, height) * 0.4;
        const cx = width / 2 + Math.cos(angle) * radius * 0.5;
        const cy = height / 2 + Math.sin(angle) * radius * 0.5;
        const size = radius * 1.5;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: cx - size / 2,
              top: cy - size / 2,
              width: size,
              height: size,
              background: `radial-gradient(circle, ${withOpacity(point.color, point.opacity)} 0%, transparent 70%)`,
              borderRadius: '50%',
              filter: 'blur(80px)',
              pointerEvents: 'none',
              willChange: 'transform',
              animation: `float ${20 / speed}s ease-in-out infinite`,
            }}
          >
            <style jsx>{`
              @keyframes float {
                0%, 100% { transform: translate(0, 0) scale(1); }
                25% { transform: translate(30px, -20px) scale(1.1); }
                50% { transform: translate(-20px, 30px) scale(0.9); }
                75% { transform: translate(20px, 20px) scale(1.05); }
              }
            `}</style>
          </div>
        );
      })}
    </div>
  );
};

// Grid background
export const GridBackground = ({
  width,
  height,
  gridSize = 60,
  color = colors.borderSubtle,
  opacity = 0.3,
  lineWidth = 1,
  animate = false,
  speed = 0.5,
}: {
  width: number;
  height: number;
  gridSize?: number;
  color?: string;
  opacity?: number;
  lineWidth?: number;
  animate?: boolean;
  speed?: number;
}) => {
  const frame = useCurrentFrame();
  const offset = animate ? (frame * speed) % gridSize : 0;

  const cols = Math.ceil(width / gridSize) + 2;
  const rows = Math.ceil(height / gridSize) + 2;

  return (
    <svg
      width={width}
      height={height}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        opacity,
      }}
      aria-hidden="true"
    >
      <defs>
        <pattern id="grid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
          <path d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`} fill="none" stroke={color} strokeWidth={lineWidth} />
        </pattern>
      </defs>
      <rect
        width={width + gridSize * 2}
        height={height + gridSize * 2}
        x={-gridSize - offset}
        y={-gridSize - offset}
        fill="url(#grid)"
      />
    </svg>
  );
};

// Noise texture overlay
export const NoiseOverlay = ({
  width,
  height,
  opacity = 0.03,
  scale = 1,
}: {
  width: number;
  height: number;
  opacity?: number;
  scale?: number;
}) => {
  // Using a CSS-based noise pattern
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        opacity,
        pointerEvents: 'none',
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")
        `,
        backgroundSize: `${256 * scale}px`,
        mixBlendMode: 'overlay',
      }}
      aria-hidden="true"
    />
  );
};

function withOpacity(color: string, opacity: number): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}