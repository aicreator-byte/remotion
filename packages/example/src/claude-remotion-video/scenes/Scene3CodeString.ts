// Scene3 Role of Claude - terminal lines for Terminal component

export const SCENE3_CLAUDE_CODE_TERMINAL = [
  {type: 'output' as const, content: '// Scene 1: Hook Component', delay: 0},
  {type: 'output' as const, content: "import { useCurrentFrame, interpolate } from 'remotion';", delay: 10},
  {type: 'output' as const, content: '', delay: 10},
  {type: 'output' as const, content: 'export const Scene1_Hook = () => {', delay: 20},
  {type: 'output' as const, content: '  const frame = useCurrentFrame();', delay: 20},
  {type: 'output' as const, content: '', delay: 20},
  {type: 'output' as const, content: '  const titleOpacity = interpolate(frame, [30, 80], [0, 1]);', delay: 20},
  {type: 'output' as const, content: '  const titleSlide = interpolate(frame, [30, 80], [50, 0]);', delay: 20},
  {type: 'output' as const, content: '', delay: 20},
  {type: 'output' as const, content: '  return (', delay: 20},
  {type: 'output' as const, content: '    <div style={{opacity: titleOpacity, transform: `translateY(${titleSlide}px)`}}>', delay: 20},
  {type: 'output' as const, content: '      <h1>CREATE VIDEOS WITH AI</h1>', delay: 20},
  {type: 'output' as const, content: '    </div>', delay: 20},
  {type: 'output' as const, content: '  );', delay: 20},
  {type: 'output' as const, content: '};', delay: 20},
];