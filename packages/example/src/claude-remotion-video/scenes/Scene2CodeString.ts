// Scene2 composition code - replaced with terminal output to avoid bundler parsing issues

export const SCENE2_COMPOSITION_TERMINAL_LINES = [
  {type: 'output' as const, content: '// Remotion Composition Structure', delay: 0},
  {type: 'output' as const, content: 'import { Composition, Sequence } from', delay: 10},
  {type: 'output' as const, content: "'remotion';", delay: 10},
  {type: 'output' as const, content: '', delay: 10},
  {type: 'output' as const, content: 'export const MyVideo = () => (', delay: 20},
  {type: 'output' as const, content: '  <>', delay: 20},
  {type: 'output' as const, content: '    <Composition', delay: 20},
  {type: 'output' as const, content: '      id="intro"', delay: 20},
  {type: 'output' as const, content: '      component={IntroScene}', delay: 20},
  {type: 'output' as const, content: '      durationInFrames={180}', delay: 20},
  {type: 'output' as const, content: '      fps={30}', delay: 20},
  {type: 'output' as const, content: '      width={1920}', delay: 20},
  {type: 'output' as const, content: '      height={1080}', delay: 20},
  {type: 'output' as const, content: '    />', delay: 20},
  {type: 'output' as const, content: '    <Composition', delay: 20},
  {type: 'output' as const, content: '      id="main"', delay: 20},
  {type: 'output' as const, content: '      component={MainScene}', delay: 20},
  {type: 'output' as const, content: '      durationInFrames={540}', delay: 20},
  {type: 'output' as const, content: '      fps={30}', delay: 20},
  {type: 'output' as const, content: '      width={1920}', delay: 20},
  {type: 'output' as const, content: '      height={1080}', delay: 20},
  {type: 'output' as const, content: '    />', delay: 20},
  {type: 'output' as const, content: '    <Composition', delay: 20},
  {type: 'output' as const, content: '      id="outro"', delay: 20},
  {type: 'output' as const, content: '      component={OutroScene}', delay: 20},
  {type: 'output' as const, content: '      durationInFrames={120}', delay: 20},
  {type: 'output' as const, content: '      fps={30}', delay: 20},
  {type: 'output' as const, content: '      width={1920}', delay: 20},
  {type: 'output' as const, content: '      height={1080}', delay: 20},
  {type: 'output' as const, content: '    />', delay: 20},
  {type: 'output' as const, content: '  </>', delay: 20},
  {type: 'output' as const, content: ');', delay: 20},
];

// React component code example for visual demo
export const SCENE2_REACT_COMPONENT_LINES = [
  {type: 'output' as const, content: '// React Component to Video Frame', delay: 0},
  {type: 'output' as const, content: 'export const Title = () => (', delay: 10},
  {type: 'output' as const, content: '  <div className="title">', delay: 10},
  {type: 'output' as const, content: '    Hello Remotion!', delay: 10},
  {type: 'output' as const, content: '  </div>', delay: 10},
  {type: 'output' as const, content: ');', delay: 10},
];

export const SCENE2_DISPLAY_CODE = `import { Composition, Sequence } from 'remotion';

export const MyVideo = () => (
  <>
    <Composition
      id="intro"
      component={IntroScene}
      durationInFrames={180}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="main"
      component={MainScene}
      durationInFrames={540}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="outro"
      component={OutroScene}
      durationInFrames={120}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);`;