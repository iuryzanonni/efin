import React from "react";
import styles from "./style.module.css";
import { useRouter } from "next/router";
import Button from "../../components/button";

export default function HomePage(props) {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>efin</div>
      <div className={styles.buttonLogin}>
        <Button text="Login" color="#000" backgroundColor="#FFF" onclick={handleLogin} />
      </div>
      <div className={styles.buttonLogin}>
        <Button text="Sign up" color="#FFF" backgroundColor="transparent" />
      </div>
    </div>
  );
}
