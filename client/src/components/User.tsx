import { useAuth } from "../context/AuthContext";
import styles from "./User.module.css";
import { useNavigate } from "react-router-dom";

function User() {
  const navigate = useNavigate();
  const {logout, user} = useAuth();
  if (!user) return null;

  function handleClick() {
    logout();
    navigate('/worldwise');
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;