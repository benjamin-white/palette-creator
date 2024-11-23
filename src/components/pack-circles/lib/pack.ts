import p5, { type Vector } from 'p5';
import { Circle } from './Circle';

const CONFIG = {
  dimensions: {
    width: 700,
    height: 700,
  },
  boundsPadding: 60,
  debug: false,
};

/**
 * Potentially scatter based on Noise or Poisson Sampling later
 */
const scatterPoints = (radius: number, count = 1000) =>
  Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const dist = radius * Math.sqrt(Math.random()) - CONFIG.boundsPadding;

    return new Circle(
      radius + dist * Math.cos(angle),
      radius + dist * Math.sin(angle),
      4
    );
  });

type BBox = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};
/**
 * uses a square box, could update to circular
 */
const boundsCheck = (bounds: BBox, object: BBox): boolean =>
  [
    object.top <= bounds.top,
    object.right >= bounds.right,
    object.bottom >= bounds.bottom,
    object.left <= bounds.left,
  ].some(Boolean);

const neightboursCheck = (
  p5: p5,
  points: Circle[],
  current: Circle,
  currentindex: number
): boolean => {
  for (let j = 0; j < points.length; j++) {
    if (j === currentindex) continue;

    const { x, y } = current.getPosition();
    const neighbour = points[j];
    const { x: neighbourX, y: neightbourY } = neighbour.getPosition();
    const distance = p5.dist(x, y, neighbourX, neightbourY) - 1;
    const radiiSum = current.getRadius() + neighbour.getRadius();

    if (distance < radiiSum) return true;
  }

  return false;
};

export const packCircles = () => {
  let palette = ['#000000'];
  let points = scatterPoints(CONFIG.dimensions.width * 0.5);
  const bounds = {
    top: CONFIG.boundsPadding,
    right: CONFIG.dimensions.width - CONFIG.boundsPadding,
    bottom: CONFIG.dimensions.height - CONFIG.boundsPadding,
    left: CONFIG.boundsPadding,
  };

  const update = ({
    palette: _palette,
    density,
  }: {
    palette?: string[];
    density?: number;
  }) => {
    if (_palette) palette = _palette;
    if (density) points = scatterPoints(CONFIG.dimensions.width * 0.5, density);
  };

  const script = (p5: p5) => {
    p5.setup = () => {
      p5.createCanvas(
        CONFIG.dimensions.width,
        CONFIG.dimensions.height,
        p5.P2D
      );
      p5.noStroke();
    };

    p5.draw = () => {
      p5.background('#fff');

      for (let i = 0; i < points.length; i++) {
        // using position to sample the palette, but could use noise, etc.
        const point = points[i];
        const { x, y } = point.getPosition();
        const r = point.getRadius();
        p5.fill(palette[~~((x + y) % palette.length)]);
        p5.circle(x, y, r * 2);

        if (
          point.alive &&
          (boundsCheck(bounds, {
            top: y - r,
            right: x + r,
            bottom: y + r,
            left: x - r,
          }) ||
            neightboursCheck(p5, points, point, i))
        ) {
          point.alive = false;
        }

        point.dilate();
      }
    };
  };

  return {
    update,
    script,
  };
};
