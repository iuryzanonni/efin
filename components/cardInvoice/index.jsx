import React from "react";
import styles from "./style.module.css";

import propTypes from "prop-types";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

export default function CardInvoice(props) {
  return (
    <div className={styles.card}>
      <div className={styles.description}>
        <div className={styles.invoice}>{props.name}</div>
        <div className={styles.invoiceValue}>R$ {props.value}</div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={props.onClickCheck}>
          <CheckIcon sx={{ fontSize: 30 }} style={{ backgroundColor: "inherit" }} />
        </button>
        <button className={styles.button} onClick={props.onClickDelete}>
          <ClearIcon sx={{ fontSize: 30 }} style={{ backgroundColor: "inherit" }} />
        </button>
      </div>
    </div>
  );
}

CardInvoice.propTypes = {
  name: propTypes.string,
  value: propTypes.number,
  onClickCheck: propTypes.func,
  onClickDelete: propTypes.func,
};
