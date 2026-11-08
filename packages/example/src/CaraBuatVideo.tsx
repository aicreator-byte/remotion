import {Sequence, useCurrentFrame, interpolate, spring} from 'remotion';
import React from 'react';

const fadeIn = (frame: number, start: number, duration: number) => {
  if (frame < start) return 0;
  if (frame > start + duration) return 1;
  return (frame - start) / duration;
};

const slideUp = (frame: number, start: number, duration: number) => {
  if (frame < start) return 100;
  if (frame > start + duration) return 0;
  return 100 - (100 * (frame - start) / duration);
};

const slideDown = (frame: number, start: number, duration: number) => {
  if (frame < start) return -100;
  if (frame > start + duration) return 0;
  return -100 + (100 * (frame - start) / duration);
};

const Slide = ({
  children,
  startFrame,
  duration = 60,
  direction = 'up',
}: {
  children: React.ReactNode;
  startFrame: number;
  duration?: number;
  direction?: 'up' | 'down';
}) => {
  const frame = useCurrentFrame();
  const opacity = fadeIn(frame, startFrame, duration);
  const translateY = direction === 'up'
    ? slideUp(frame, startFrame, duration)
    : slideDown(frame, startFrame, duration);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        transition: 'none',
      }}
    >
      {children}
    </div>
  );
};

export const CaraBuatVideo = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0f0f0f',
        color: '#ffffff',
        fontFamily: 'system-ui, sans-serif',
        padding: '80px',
        boxSizing: 'border-box',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <Slide startFrame={0} duration={45} direction="up">
        <h1 style={{
          fontSize: '72px',
          fontWeight: 800,
          margin: 0,
          lineHeight: 1.1,
          letterSpacing: '-2px',
        }}>
          Cara Membuat Video dari{' '}
          <span style={{color: '#00d4aa'}}>Claude</span> dan{' '}
          <span style={{color: '#00d4aa'}}>Remotion</span>
        </h1>
      </Slide>

      <Slide startFrame={200} duration={45} direction="up">
        <div style={{
          width: '120px',
          height: '4px',
          background: '#00d4aa',
          marginTop: '24px',
          marginBottom: '24px',
        }} />
      </Slide>

      <Slide startFrame={250} duration={45} direction="up">
        <p style={{
          fontSize: '28px',
          color: '#aaaaaa',
          maxWidth: '900px',
          margin: 0,
          lineHeight: 1.5,
        }}>
          1. Minta AI coding agent menulis kode composition Remotion
        </p>
      </Slide>

      <Slide startFrame={350} duration={45} direction="up">
        <p style={{
          fontSize: '28px',
          color: '#aaaaaa',
          maxWidth: '900px',
          margin: 0,
          lineHeight: 1.5,
        }}>
          2. Simpan kode ke repo GitHub (fork Remotion)
        </p>
      </Slide>

      <Slide startFrame={450} duration={45} direction="up">
        <p style={{
          fontSize: '28px',
          color: '#aaaaaa',
          maxWidth: '900px',
          margin: 0,
          lineHeight: 1.5,
        }}>
          3. Jalankan GitHub Actions untuk render
        </p>
      </Slide>

      <Slide startFrame={550} duration={45} direction="up">
        <p style={{
          fontSize: '28px',
          color: '#aaaaaa',
          maxWidth: '900px',
          margin: 0,
          lineHeight: 1.5,
        }}>
          4. Unduh MP4 dari Artifacts
        </p>
      </Slide>

      <Slide startFrame={750} duration={60} direction="down">
        <div style={{
          marginTop: '60px',
          padding: '32px 64px',
          background: 'rgba(0, 212, 170, 0.1)',
          border: '1px solid #00d4aa',
          borderRadius: '8px',
        }}>
          <p style={{
            fontSize: '32px',
            fontWeight: 600,
            margin: 0,
            color: '#00d4aa',
          }}>
            Subscribe untuk tutorial lebih lanjut!
          </p>
        </div>
      </Slide>
    </div>
  );
};

export const CARA_BUAT_VIDEO_DURATION = 900; // 30 fps * 30 seconds = 900 frames