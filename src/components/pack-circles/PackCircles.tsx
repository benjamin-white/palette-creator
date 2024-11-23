import { useEffect, useMemo } from 'react';
import { Canvas } from '../canvas';
import { packCircles } from './lib/pack';

type PackCircleProps = {
  pointCount: number;
  palette: string[];
};

export const PackCircles = ({ pointCount, palette }: PackCircleProps) => {
  const { update, script } = useMemo(packCircles, [packCircles]);

  useEffect(() => {
    update({ density: pointCount, palette });
  }, [pointCount, palette]);

  return <Canvas sketchScript={script} />;
};
