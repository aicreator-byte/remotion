import React from 'react';
import {colors} from '../utils/colors';
import {typography} from '../utils/typography';
import {fadeIn, slideUp} from '../utils/animations';
import {useCurrentFrame} from 'remotion';

interface TerminalProps {
  lines: Array<{
    type: 'prompt' | 'output' | 'command' | 'error' | 'success';
    content: string;
    delay?: number;
  }>;
  startFrame?: number;
  duration?: number;
  prompt?: string;
  showCursor?: boolean;
  fontSize?: string;
}

export const Terminal = ({
  lines,
  startFrame = 0,
  duration = 40,
  prompt = 'claude@remotion:~$',
  showCursor = true,
  fontSize = '13px',
}: TerminalProps) => {
  const frame = useCurrentFrame();
  const containerOpacity = fadeIn(frame, startFrame, duration);

  return (
    <div
      style={{
        opacity: containerOpacity,
        background: colors.bgCard,
        border: `1px solid ${colors.borderSubtle}`,
        borderRadius: '12px',
        overflow: 'hidden',
        fontFamily: typography.fontFamilies.mono,
        fontSize,
        lineHeight: '22px',
        maxWidth: '100%',
        boxShadow: colors.shadows.lg,
        minWidth: '600px',
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
          terminal
        </span>
      </div>

      {/* Terminal content */}
      <div style={{padding: '16px', minHeight: '200px'}}>
        {lines.map((line, index) => {
          const lineStartFrame = startFrame + (line.delay || 0) + index * 8;
          const lineOpacity = fadeIn(frame, lineStartFrame, 15);
          const lineSlide = slideUp(frame, lineStartFrame, 15, 20);

          let prefix = '';
          let contentColor = colors.textPrimary;
          let prefixColor = colors.primary;

          switch (line.type) {
            case 'prompt':
              prefix = `${prompt} `;
              contentColor = colors.textSecondary;
              break;
            case 'command':
              prefix = `${prompt} `;
              contentColor = colors.primary;
              break;
            case 'output':
              contentColor = colors.textPrimary;
              break;
            case 'error':
              prefix = '✗ ';
              contentColor = colors.error;
              prefixColor = colors.error;
              break;
            case 'success':
              prefix = '✓ ';
              contentColor = colors.primary;
              prefixColor = colors.primary;
              break;
          }

          return (
            <div
              key={index}
              style={{
                opacity: lineOpacity,
                transform: `translateY(${lineSlide}px)`,
                display: 'flex',
                minHeight: '22px',
                marginBottom: '4px',
              }}
            >
              <span
                style={{
                  color: prefixColor,
                  marginRight: '8px',
                  whiteSpace: 'pre',
                  opacity: 0.9,
                }}
              >
                {prefix}
              </span>
              <span style={{color: contentColor, whiteSpace: 'pre-wrap'}}>{line.content}</span>
            </div>
          );
        })}

        {/* Cursor */}
        {showCursor && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              minHeight: '22px',
              marginTop: '4px',
            }}
          >
            <span
              style={{
                color: colors.primary,
                marginRight: '8px',
                whiteSpace: 'pre',
              }}
            >
              {prompt}
            </span>
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '20px',
                background: colors.primary,
                animation: 'blink 1s infinite',
              }}
            />
            <style jsx>{`
              @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
};

// Animated terminal that types out commands
export const AnimatedTerminal = ({
  commands,
  startFrame = 0,
  typingSpeed = 2,
  prompt = 'claude@remotion:~$',
  fontSize = '13px',
}: {
  commands: Array<{
    command: string;
    output?: string[];
    delayAfter?: number;
  }>;
  startFrame?: number;
  typingSpeed?: number;
  prompt?: string;
  fontSize?: string;
}) => {
  const frame = useCurrentFrame();

  // Build all lines with timing
  const allLines: Array<{
    type: 'prompt' | 'command' | 'output';
    content: string;
    frame: number;
  }> = [];

  let currentFrame = startFrame;

  commands.forEach((cmd) => {
    // Prompt
    allLines.push({
      type: 'prompt',
      content: '',
      frame: currentFrame,
    });

    // Command being typed
    for (let i = 0; i <= cmd.command.length; i++) {
      allLines.push({
        type: 'command',
        content: cmd.command.slice(0, i),
        frame: currentFrame + i / typingSpeed,
      });
    }

    currentFrame += cmd.command.length / typingSpeed + 10;

    // Output lines
    if (cmd.output) {
      cmd.output.forEach((out, idx) => {
        allLines.push({
          type: 'output',
          content: out,
          frame: currentFrame + idx * 8,
        });
      });
      currentFrame += (cmd.output.length + 1) * 8;
    }

    currentFrame += cmd.delayAfter || 20;
  });

  return (
    <div
      style={{
        background: colors.bgCard,
        border: `1px solid ${colors.borderSubtle}`,
        borderRadius: '12px',
        overflow: 'hidden',
        fontFamily: typography.fontFamilies.mono,
        fontSize,
        lineHeight: '22px',
        maxWidth: '100%',
        boxShadow: colors.shadows.lg,
        minWidth: '600px',
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
          terminal
        </span>
      </div>

      <div style={{padding: '16px', minHeight: '200px'}}>
        {allLines.map((line, index) => {
          const lineOpacity = fadeIn(frame, line.frame, 10);
          const lineSlide = slideUp(frame, line.frame, 10, 15);

          let prefix = '';
          let contentColor = colors.textPrimary;
          let prefixColor = colors.primary;

          switch (line.type) {
            case 'prompt':
              prefix = `${prompt} `;
              contentColor = colors.textSecondary;
              break;
            case 'command':
              prefix = `${prompt} `;
              contentColor = colors.primary;
              break;
            case 'output':
              contentColor = colors.textPrimary;
              break;
          }

          return lineOpacity > 0 ? (
            <div
              key={index}
              style={{
                opacity: lineOpacity,
                transform: `translateY(${lineSlide}px)`,
                display: 'flex',
                minHeight: '22px',
                marginBottom: '4px',
              }}
            >
              <span
                style={{
                  color: prefixColor,
                  marginRight: '8px',
                  whiteSpace: 'pre',
                  opacity: 0.9,
                }}
              >
                {prefix}
              </span>
              <span style={{color: contentColor, whiteSpace: 'pre-wrap'}}>{line.content}</span>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};