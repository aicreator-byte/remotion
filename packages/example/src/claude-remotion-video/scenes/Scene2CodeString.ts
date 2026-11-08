// Pre-escaped code string for Scene2 CodeBlock display

export const SCENE2_COMPOSITION_CODE = `import { Composition, Sequence } from 'remotion';

export const MyVideo = () => (
  \u003C\u003E
    \u003CComposition
      id="intro"
      component={IntroScene}
      durationInFrames={180}
      fps={30}
      width={1920}
      height={1080}
    /\u003E
    \u003CComposition
      id="main"
      component={MainScene}
      durationInFrames={540}
      fps={30}
      width={1920}
      height={1080}
    /\u003E
    \u003CComposition
      id="outro"
      component={OutroScene}
      durationInFrames={120}
      fps={30}
      width={1920}
      height={1080}
    /\u003E
  \u003C/\u003E
);`;