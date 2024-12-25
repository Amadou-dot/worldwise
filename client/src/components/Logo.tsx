import styles from "./Logo.module.css";
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";
function Logo() {
  return <Link to="/worldwise" ><img src={logo} alt="WorldWise logo" className={styles.logo} /></Link>;
}

export default Logo;