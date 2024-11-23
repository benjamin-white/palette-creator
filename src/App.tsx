import { SyntheticEvent, useRef, useState } from 'react';
import { InputRange } from './components/input-range';
import { PackCircles } from './components/pack-circles';
import { ColorField } from './components/color-field';
import { Button } from './components/button';

import styles from './App.module.css';

const INITIAL_POINTS_COUNT = 1000;

const App = () => {
  const [pointCount, setPointCount] = useState(INITIAL_POINTS_COUNT);
  const [palette, setPalette] = useState<string[]>(['#000000']);

  const handleSliderChange = (value: number) => setPointCount(value); // maybe debounce

  const handleColorAdd = (_ev: SyntheticEvent<HTMLButtonElement>) =>
    setPalette((palette) => [...palette, '#000000']);

  const handleColorupdate = (color: string, indexToUpdate: number) =>
    setPalette((palette) => {
      const clone = [...palette];
      clone[indexToUpdate] = color;
      return clone;
    });

  const handleColorRemove = (indexToRemove: number) =>
    setPalette((palette) => [
      ...palette.slice(0, indexToRemove),
      ...palette.slice(indexToRemove + 1),
    ]);

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.colors}>
          {palette.map((c, i) => (
            <ColorField
              key={i}
              value={c}
              onChange={(color) => handleColorupdate(color, i)}
              onClear={i > 0 ? () => handleColorRemove(i) : undefined}
            />
          ))}
          <Button onClick={handleColorAdd}>+</Button>
        </div>

        <div className={styles.circles}>
          <PackCircles pointCount={pointCount} palette={palette} />
        </div>

        <InputRange
          id="points"
          label="Point count"
          value={pointCount}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  );
};

export default App;
