import { SyntheticEvent } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (ev: SyntheticEvent<HTMLButtonElement>) => void;
};

export const Button = ({ children, onClick }: ButtonProps) => (
  <button className={styles.button} onClick={onClick}>
    {children}
  </button>
);
