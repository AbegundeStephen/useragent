import React from 'react'
import styles from "./Navbar.module.css"
import { HiRefresh } from "react-icons/hi";


const Navbar = ({onLogout,onRefresh}) => {
  return (
    <div className={styles.navbar}>
        <button className={styles.logoutButton} onClick={onLogout}>Logout</button>
        <button className={styles.refreshButton} onClick={onRefresh}>
            <span className={styles.refreshIcon}><HiRefresh/></span>
            Refresh
        </button>
    </div>
    );
};

export default Navbar