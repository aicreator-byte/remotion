// Scene6 tips terminal lines - pre-formatted for Terminal component

export const SCENE6_TIP_TERMINAL_LINES = [
  // Tip 1
  {type: 'output' as const, content: '// Tip 1: clamp() untuk Typography Responsive', delay: 0},
  {type: 'output' as const, content: `fontSize: 'clamp(1.5rem, 4vw, 3rem)'`, delay: 10},
  {type: 'output' as const, content: '', delay: 10},
  // Tip 2
  {type: 'output' as const, content: '// Tip 2: Interpolate untuk Animasi Smooth', delay: 0},
  {type: 'output' as const, content: 'const opacity = interpolate(frame, [0, 30], [0, 1])', delay: 10},
  {type: 'output' as const, content: '', delay: 10},
  // Tip 3
  {type: 'output' as const, content: '// Tip 3: Sequence untuk Timeline Complex', delay: 0},
  {type: 'output' as const, content: '<Sequence from={0} duration={180}><SceneA /></Sequence>', delay: 10},
  {type: 'output' as const, content: '', delay: 10},
  // Tip 4
  {type: 'output' as const, content: '// Tip 4: Lazy Load Scene dengan Dynamic Import', delay: 0},
  {type: 'output' as const, content: "lazyComponent={() => import('./HeavyScene')}", delay: 10},
  {type: 'output' as const, content: '', delay: 10},
  // Tip 5
  {type: 'output' as const, content: '// Tip 5: Debug dengan console.log di calculateMetadata', delay: 0},
  {type: 'output' as const, content: 'calculateMetadata: () => { console.log(props); return {...} }', delay: 10},
  {type: 'output' as const, content: '', delay: 10},
  // Tip 6
  {type: 'output' as const, content: '// Tip 6: GitHub Actions untuk Render Gratis', delay: 0},
  {type: 'output' as const, content: 'uses: actions/checkout@v4', delay: 10},
  {type: 'output' as const, content: 'run: npx remotion render ...', delay: 10},
];

export const SCENE6_TIPS = [
  {number: 1, title: 'Gunakan clamp() untuk Typography Responsive', icon: '📐', color: '#00d4aa'},
  {number: 2, title: 'Interpolate untuk Animasi Smooth', icon: '📈', color: '#74b9ff'},
  {number: 3, title: 'Sequence untuk Timeline Complex', icon: '🎬', color: '#fd79a8'},
  {number: 4, title: 'Lazy Load Scene dengan Dynamic Import', icon: '⚡', color: '#fdcb6e'},
  {number: 5, title: 'Debug dengan console.log di calculateMetadata', icon: '🔍', color: '#00d4aa'},
  {number: 6, title: 'GitHub Actions untuk Render Gratis', icon: '☁️', color: '#74b9ff'},
];