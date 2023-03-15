import React from "react";
import Button from "../../components/button";

import styles from "./style.module.css";

export default function HomePage(props) {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>efin</div>
      <div className={styles.buttonLogin}>
        <Button text="Log in" color="#000" backgroundColor="#FFF" />
      </div>
      <div className={styles.buttonLogin}>
        <Button text="Sign up" color="#FFF" backgroundColor="transparent" />
      </div>
    </div>
  );
}
