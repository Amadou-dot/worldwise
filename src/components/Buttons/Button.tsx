import styles from './Button.module.css';
interface IButton {
  children: React.ReactNode;
  onClick: () => void;
  type: 'primary' | 'back' | 'position';
}
export default function Button( { children, onClick, type }: IButton): JSX.Element {
  return (
    <button onClick={e => {
      e.preventDefault();
      onClick();
    }} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}
