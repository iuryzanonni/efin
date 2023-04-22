import React, { useState } from "react";
import { useRouter } from "next/router";
import { messages } from "../../public/messages";
import styles from "./style.module.css";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import TextField from "../../src/components/textField";
import Button from "../../src/components/button";
import cookiesService from "../../src/service/cookieService";

export default function Login(props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inProgress, setInProgress] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = async (data) => {
    setInProgress(true);

    try {
      const user = await axios.post("/api/accounts/auth", { ...data });
      generateAuthCookie(user.data);
      router.push("/faturas");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setInProgress(false);
        setShowAlert(true);
      } else {
        console.log(error);
      }
    }
  };

  const generateAuthCookie = (user) => {
    const userCookie = {};

    userCookie["name"] = "EFIN_JWT";
    userCookie["value"] = user.token;
    userCookie["expires"] = 7;

    cookiesService.createCookie(userCookie);
    return userCookie;
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
        {inProgress && (
          <div className={styles.progress}>
            <CircularProgress style={{ color: "white" }} />
            <div>Carregando</div>
          </div>
        )}
        {showAlert && <Alert severity="warning">{messages.errorForbidden}</Alert>}
      </div>
    </div>
  );
}
