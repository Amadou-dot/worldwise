import styles from './Button.module.css';
interface IButton {
  children: React.ReactNode;
  onClick: () => void;
  type: 'primary' | 'back' | 'position';
  disabled?: boolean;
}
export default function Button({
  children,
  onClick,
  type,
  disabled,
}: IButton): JSX.Element {
  return (
    <button
      disabled={disabled}
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
      className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}
