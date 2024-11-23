import styles from './InputRange.module.css';

type InputRangeProps = {
  id: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (pointsCount: number) => void;
};

export const InputRange = ({
  id,
  label,
  value = 1000,
  min = 100,
  max = 2000,
  onChange,
}: InputRangeProps) => (
  <div className={styles.inputRange}>
    <label htmlFor={id}>
      {label}: {value}
    </label>

    <input
      id={id}
      type="range"
      onChange={({ nativeEvent: { target } }) =>
        onChange(+(target as unknown as { value: string }).value)
      }
      value={value}
      min={min}
      max={max}
      step={100}
      list="markers"
    />

    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ width: '100px', textAlign: 'left' }}>{min}</span>
      <span style={{ width: '100px', textAlign: 'right' }}>{max}</span>
    </div>
  </div>
);
