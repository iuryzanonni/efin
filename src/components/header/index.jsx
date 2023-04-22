import React from "react";

import styles from "./style.module.css";
import propTypes from "prop-types";

import MenuIcon from "@mui/icons-material/Menu";

export default function Header(props) {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>efin</div>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.menu}>
        <MenuIcon />
      </div>
    </div>
  );
}

Header.propTypes = {
  title: propTypes.string.isRequired,
};
