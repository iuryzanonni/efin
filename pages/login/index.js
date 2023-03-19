import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./style.module.css";
import TextField from "../../components/textField";
import Button from "../../components/button";
import axios from "axios";
import cookiesService from "../../service/cookieService";

export default function Login(props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (data) => {
    console.log(data);
    const user = await axios
      .post("/api/accounts/auth", { ...data })
      .then((resposnse) => resposnse.data)
      .catch((ex) => console.log(ex));
    console.log(user);
    generateAuthCookie(user);

    router.push("/faturas");
  };

  const generateAuthCookie = (user) => {
    const userCookie = {};
    console.log(user);
    userCookie["name"] = "EFIN_JWT";
    userCookie["value"] = user.token;
    userCookie["expires"] = 7;

    cookiesService.createCookie(userCookie);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>efin</div>
      <div className={styles.inputBlock}>
        <div className={styles.textField}>
          <TextField
            id="login-email"
            label="e-mail"
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
    </div>
  );
}
