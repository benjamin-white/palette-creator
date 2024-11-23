import { useEffect, useRef } from 'react';
import p5 from 'p5';

type CanvasProps = {
  sketchScript: (p5instance: p5) => void;
};

export const Canvas = ({ sketchScript }: CanvasProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p5Instance = new p5(sketchScript, ref.current!);
    return p5Instance.remove;
  }, [sketchScript]);

  return <div ref={ref} />;
};
