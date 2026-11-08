import React from 'react';
import {colors, gradientText} from '../utils/colors';
import {typography} from '../utils/typography';
import {SlideReveal, fadeIn} from '../utils/animations';
import {useCurrentFrame} from 'remotion';

interface CodeBlockProps {
  code: string;
  language?: string;
  startFrame?: number;
  duration?: number;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  autoScroll?: boolean;
  scrollSpeed?: number;
  fontSize?: string;
}

const languageColors: Record<string, string> = {
  typescript: '#3178c6',
  javascript: '#f7df1e',
  tsx: '#61dafb',
  jsx: '#61dafb',
  python: '#3776ab',
  json: '#292929',
  css: '#1572b6',
  html: '#e34f26',
  bash: '#4eaa25',
  sh: '#4eaa25',
  yaml: '#cb171e',
  markdown: '#083fa1',
};

export const CodeBlock = ({
  code,
  language = 'typescript',
  startFrame = 0,
  duration = 40,
  showLineNumbers = true,
  highlightLines = [],
  autoScroll = false,
  scrollSpeed = 0.5,
  fontSize = '13px',
}: CodeBlockProps) => {
  const frame = useCurrentFrame();
  const opacity = fadeIn(frame, startFrame, duration);

  const lines = code.trim().split('\n');
  const langColor = languageColors[language.toLowerCase()] || colors.primary;

  const scrollOffset = autoScroll ? (frame * scrollSpeed) % (lines.length * 24) : 0;

  return (
    <div
      style={{
        opacity,
        background: colors.bgCard,
        border: `1px solid ${colors.borderSubtle}`,
        borderRadius: '12px',
        overflow: 'hidden',
        fontFamily: typography.fontFamilies.mono,
        fontSize,
        lineHeight: '24px',
        maxWidth: '100%',
        boxShadow: colors.shadows.lg,
        position: 'relative' as const,
      }}
    >
      {/* Header bar */}
      <div
        style={{
          background: colors.bgSecondary,
          borderBottom: `1px solid ${colors.borderSubtle}`,
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {/* Window controls */}
        <div style={{display: 'flex', gap: '6px'}}>
          <div style={{width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57'}} />
          <div style={{width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e'}} />
          <div style={{width: '12px', height: '12px', borderRadius: '50%', background: '#28ca42'}} />
        </div>
        <span
          style={{
            marginLeft: '12px',
            fontSize: '12px',
            color: colors.textMuted,
            fontFamily: typography.fontFamilies.mono,
            textTransform: 'lowercase',
          }}
        >
          {language}
        </span>
        <div
          style={{
            marginLeft: 'auto',
            padding: '2px 8px',
            background: withOpacity(langColor, 0.15),
            borderRadius: '4px',
            fontSize: '10px',
            color: langColor,
            fontWeight: 600,
            letterSpacing: '0.5px',
          }}
        >
          {language.toUpperCase()}
        </div>
      </div>

      {/* Code content */}
      <pre
        style={{
          margin: 0,
          padding: '16px',
          overflow: autoScroll ? 'hidden' : 'auto',
          background: 'transparent',
          color: colors.textPrimary,
          tabSize: 2,
          transform: autoScroll ? `translateY(-${scrollOffset}px)` : 'none',
          transition: 'transform 0.1s linear',
        }}
      >
        {lines.map((line, index) => {
          const lineNumber = index + 1;
          const isHighlighted = highlightLines.includes(lineNumber);

          return (
            <div
              key={lineNumber}
              style={{
                display: 'flex',
                minHeight: '24px',
                background: isHighlighted
                  ? withOpacity(colors.primary, 0.1)
                  : 'transparent',
                borderLeft: isHighlighted
                  ? `3px solid ${colors.primary}`
                  : 'none',
                paddingLeft: '12px',
                marginLeft: '-12px',
                transition: 'background 0.2s ease',
              }}
            >
              {showLineNumbers && (
                <span
                  style={{
                    color: isHighlighted ? colors.primary : colors.textMuted,
                    marginRight: '16px',
                    minWidth: '40px',
                    textAlign: 'right',
                    userSelect: 'none',
                    fontSize: '12px',
                    lineHeight: '24px',
                    opacity: isHighlighted ? 1 : 0.5,
                  }}
                >
                  {lineNumber}
                </span>
              )}
              <code
                style={{
                  color: colors.textPrimary,
                  whiteSpace: 'pre',
                  wordBreak: 'break-all',
                }}
              >
                {line}
              </code>
            </div>
          );
        })}
      </pre>

      {/* Bottom accent line */}
      <div
        style={{
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
          opacity: 0.5,
        }}
      />
    </div>
  );
};

function withOpacity(color: string, opacity: number): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Animated typing code block
export const TypingCodeBlock = ({
  code,
  language = 'typescript',
  startFrame = 0,
  charsPerFrame = 3,
  showCursor = true,
  fontSize = '13px',
}: {
  code: string;
  language?: string;
  startFrame?: number;
  charsPerFrame?: number;
  showCursor?: boolean;
  fontSize?: string;
}) => {
  const frame = useCurrentFrame();
  const visibleChars = Math.max(0, Math.floor((frame - startFrame) * charsPerFrame));
  const displayCode = code.slice(0, visibleChars);
  const showCursorBlink = showCursor && Math.floor(frame / 15) % 2 === 0;

  const lines = code.trim().split('\n');
  const langColor = languageColors[language.toLowerCase()] || colors.primary;

  return (
    <div
      style={{
        background: colors.bgCard,
        border: `1px solid ${colors.borderSubtle}`,
        borderRadius: '12px',
        overflow: 'hidden',
        fontFamily: typography.fontFamilies.mono,
        fontSize,
        lineHeight: '24px',
        maxWidth: '100%',
        boxShadow: colors.shadows.lg,
      }}
    >
      <div
        style={{
          background: colors.bgSecondary,
          borderBottom: `1px solid ${colors.borderSubtle}`,
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div style={{display: 'flex', gap: '6px'}}>
          <div style={{width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57'}} />
          <div style={{width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e'}} />
          <div style={{width: '12px', height: '12px', borderRadius: '50%', background: '#28ca42'}} />
        </div>
        <span
          style={{
            marginLeft: '12px',
            fontSize: '12px',
            color: colors.textMuted,
            fontFamily: typography.fontFamilies.mono,
          }}
        >
          {language}
        </span>
      </div>

      <pre style={{margin: 0, padding: '16px', overflow: 'auto'}}>
        <code style={{color: colors.textPrimary, whiteSpace: 'pre-wrap'}}>
          {displayCode}
          {showCursorBlink && <span style={{animation: 'blink 1s infinite'}}>|</span>}
          <style jsx>{`
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
          `}</style>
        </code>
      </pre>
    </div>
  );
};