import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./style.module.css";
import TextField from "../../components/textField";
import Button from "../../components/button";
import { API_URL } from "../../public/constants";
import axios from "axios";
import md5 from "md5";

export default function HomePage(props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (data) => {
    const user = await axios
      .post("/api/accounts/auth", { ...data })
      .then((resposnse) => resposnse.data)
      .catch((ex) => console.log(ex));
    router.push("/faturas");
  };

  return (
    <form className={styles.container}>
      <div className={styles.logo}>efin</div>
      <div className={styles.inputBlock}>
        <div className={styles.textField}>
          <TextField
            id="login-email"
            label="e-mail"
            fullWidth
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className={styles.textField}>
          <TextField
            id="login-password"
            label="password"
            type="password"
            fullWidth
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div className={styles.button}>
          <Button text="Login" color="#000" backgroundColor="#FFF" onclick={() => handleLogin({ email, password })} />
        </div>
        <div className={styles.button}>
          <Button text="Forgot my password" backgroundColor="transparent" />
        </div>
      </div>
    </form>
  );
}
