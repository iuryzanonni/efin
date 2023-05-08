import React, { useState } from "react";
import styles from "./style.module.css";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import propTypes from "prop-types";
import { messages } from "./messages";
import Button from "../button";

export default function ModalPayment(props) {
  return (
    <div className={styles.modalPayment}>
      <div className={styles.modalCheckIcon}>
        <CheckCircleOutlineIcon color="success" fontSize="large" style={{ fontSize: "70" }} />
      </div>
      <div className={styles.modalMessage}>{messages.titleModalPayment(props.type, props.value)}</div>
      <div className={styles.modalButtons}>
        <div className={styles.modalButton}>
          <Button text="Não" backgroundColor="#a62323" onclick={props.noFunc} />
        </div>
        <div className={styles.modalButton}>
          <Button text="Sim" backgroundColor="#2e7d32" onclick={props.yesFunc} />
        </div>
      </div>
    </div>
  );
}

ModalPayment.propTypes = {
  type: propTypes.string,
  value: propTypes.number,
  yesFunc: propTypes.func,
  noFunc: propTypes.func,
};
