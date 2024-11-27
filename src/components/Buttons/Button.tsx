import styles from './Button.module.css';
interface IButton {
  children: React.ReactNode;
  onClick?: () => void;
  style: 'primary' | 'back' | 'position';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
export default function Button({
  children,
  onClick = () => {},
  style,
  disabled,
  type = 'button',
}: IButton): JSX.Element {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={e => {
        if (type !== 'submit') e.preventDefault();
        onClick();
      }}
      className={`${styles.btn} ${styles[style]}`}>
      {children}
    </button>
  );
}
