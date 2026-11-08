// Scene1 Hook code - terminal lines for Terminal component

export const SCENE1_HOOK_CODE_TERMINAL = [
  {type: 'output' as const, content: '// Your idea', delay: 0},
  {type: 'output' as const, content: 'const concept = "AI video tutorial";', delay: 10},
  {type: 'output' as const, content: '', delay: 10},
  {type: 'output' as const, content: '// Ask Claude', delay: 10},
  {type: 'output' as const, content: 'const storyboard = await claude.generate(concept);', delay: 10},
  {type: 'output' as const, content: '', delay: 10},
  {type: 'output' as const, content: '// Generate Remotion code', delay: 10},
  {type: 'output' as const, content: 'const components = await claude.toRemotion(storyboard);', delay: 10},
];