import { Button } from '../button';
import styles from './ColorField.module.css';

type ColorFieldProps = {
  value: string;
  onChange: (colorValue: string) => void;
  onClear?: () => void;
};

export const ColorField = ({ value, onChange, onClear }: ColorFieldProps) => {
  return (
    <div className={styles.colorField} style={{ '--field-color': value }}>
      <label className={styles.label}>
        <input
          value={value}
          type="color"
          onChange={({ target: { value } }) => onChange(value)}
          className="sr-only"
          style={{ top: 'unset', bottom: 0 }}
        />
        <span className={styles.value} aria-hidden="true" />
        {value}
      </label>
      {onClear && (
        <Button
          onClick={onClear}
          // style={{ marginLeft: 'auto' }}
          aria-label="Remove color"
        >
          &times;
        </Button>
      )}
    </div>
  );
};
