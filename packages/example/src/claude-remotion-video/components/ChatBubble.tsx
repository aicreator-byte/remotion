import React from 'react';
import {colors} from '../utils/colors';
import {typography} from '../utils/typography';
import {fadeIn, slideUp, slideRight} from '../utils/animations';
import {useCurrentFrame} from 'remotion';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  delay?: number;
  isCode?: boolean;
}

interface ChatBubbleProps {
  messages: ChatMessage[];
  startFrame?: number;
  duration?: number;
  showAvatar?: boolean;
  fontSize?: string;
  maxWidth?: string;
}

export const ChatBubble = ({
  messages,
  startFrame = 0,
  duration = 30,
  showAvatar = true,
  fontSize = '14px',
  maxWidth = '500px',
}: ChatBubbleProps) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth,
        width: '100%',
      }}
    >
      {messages.map((message, index) => {
        const msgStartFrame = startFrame + (message.delay || 0) + index * 20;
        const opacity = fadeIn(frame, msgStartFrame, duration);
        const slide = message.role === 'user'
          ? slideRight(frame, msgStartFrame, duration, 50)
          : slideUp(frame, msgStartFrame, duration, 30);

        const isUser = message.role === 'user';

        return (
          <div
            key={index}
            style={{
              opacity,
              transform: `translateX(${slide}px)`,
              display: 'flex',
              flexDirection: isUser ? 'row-reverse' : 'row',
              alignItems: 'flex-start',
              gap: '10px',
              maxWidth: '100%',
            }}
          >
            {showAvatar && (
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  background: isUser
                    ? colors.gradients.accent
                    : colors.gradients.primary,
                  boxShadow: isUser ? colors.shadows.glowSecondary : colors.shadows.glow,
                }}
              >
                <span style={{fontSize: '16px', color: colors.textOnPrimary}}>
                  {isUser ? '👤' : '🤖'}
                </span>
              </div>
            )}

            <div
              style={{
                maxWidth: '85%',
                background: isUser
                  ? colors.gradients.accent
                  : colors.bgCard,
                border: isUser ? 'none' : `1px solid ${colors.borderPrimary}`,
                borderRadius: isUser
                  ? '18px 18px 4px 18px'
                  : '18px 18px 18px 4px',
                padding: '14px 18px',
                boxShadow: isUser
                  ? colors.shadows.glowSecondary
                  : colors.shadows.md,
                position: 'relative' as const,
              }}
            >
              {!isUser && (
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '10px',
                    fontSize: '10px',
                    color: colors.primary,
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    padding: '2px 6px',
                    background: withOpacity(colors.primary, 0.1),
                    borderRadius: '4px',
                  }}
                >
                  CLAUDE
                </div>
              )}

              {message.isCode ? (
                <pre style={{margin: 0, fontFamily: typography.fontFamilies.mono, fontSize: '12px', lineHeight: '1.6'}}>
                  <code style={{color: isUser ? colors.textOnPrimary : colors.textPrimary, whiteSpace: 'pre-wrap'}}>
                    {message.content}
                  </code>
                </pre>
              ) : (
                <div
                  style={{
                    fontSize,
                    lineHeight: '1.6',
                    color: isUser ? colors.textOnPrimary : colors.textPrimary,
                    fontFamily: typography.fontFamilies.sans,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {message.content}
                </div>
              )}
            </div>
          </div>
        );
      })}
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

// Streaming chat bubble that types out character by character
export const StreamingChatBubble = ({
  messages,
  startFrame = 0,
  charsPerFrame = 3,
  showAvatar = true,
  fontSize = '14px',
  maxWidth = '500px',
}: {
  messages: Array<Omit<ChatMessage, 'delay'>>;
  startFrame?: number;
  charsPerFrame?: number;
  showAvatar?: boolean;
  fontSize?: string;
  maxWidth?: string;
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth,
        width: '100%',
      }}
    >
      {messages.map((message, msgIndex) => {
        const isUser = message.role === 'user';
        const messageStartFrame = startFrame + msgIndex * 120;

        return (
          <div
            key={msgIndex}
            style={{
              display: 'flex',
              flexDirection: isUser ? 'row-reverse' : 'row',
              alignItems: 'flex-start',
              gap: '10px',
              maxWidth: '100%',
            }}
          >
            {showAvatar && (
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  background: isUser
                    ? colors.gradients.accent
                    : colors.gradients.primary,
                  boxShadow: isUser ? colors.shadows.glowSecondary : colors.shadows.glow,
                }}
              >
                <span style={{fontSize: '16px', color: colors.textOnPrimary}}>
                  {isUser ? '👤' : '🤖'}
                </span>
              </div>
            )}

            <div
              style={{
                maxWidth: '85%',
                background: isUser
                  ? colors.gradients.accent
                  : colors.bgCard,
                border: isUser ? 'none' : `1px solid ${colors.borderPrimary}`,
                borderRadius: isUser
                  ? '18px 18px 4px 18px'
                  : '18px 18px 18px 4px',
                padding: '14px 18px',
                boxShadow: isUser
                  ? colors.shadows.glowSecondary
                  : colors.shadows.md,
              }}
            >
              {!isUser && (
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '10px',
                    fontSize: '10px',
                    color: colors.primary,
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    padding: '2px 6px',
                    background: withOpacity(colors.primary, 0.1),
                    borderRadius: '4px',
                  }}
                >
                  CLAUDE
                </div>
              )}

              <div
                style={{
                  fontSize,
                  lineHeight: '1.6',
                  color: isUser ? colors.textOnPrimary : colors.textPrimary,
                  fontFamily: typography.fontFamilies.sans,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {(() => {
                  const visibleChars = Math.max(0, Math.floor((frame - messageStartFrame) * charsPerFrame));
                  return message.content.slice(0, visibleChars);
                })()}
                {Math.floor((frame - messageStartFrame) / 15) % 2 === 0 && frame > messageStartFrame && (
                  <span style={{animation: 'blink 1s infinite', color: colors.primary}}>|</span>
                )}
                <style jsx>{`
                  @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                  }
                `}</style>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};