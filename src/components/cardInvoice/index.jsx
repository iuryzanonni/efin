import React from "react";
import styles from "./style.module.css";

import propTypes from "prop-types";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

export default function CardInvoice(props) {
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className={styles.card}>
      <div className={styles.description}>
        <div className={styles.invoice}>{props.type}</div>
        <div className={styles.invoiceValue}>R$ {props.value}</div>
        <div className={styles.invoiceDueDate}>Vencimento: {formatDate(props.dueDate)}</div>
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
  value: propTypes.string,
  dueDate: propTypes.object,
  onClickCheck: propTypes.func,
  onClickDelete: propTypes.func,
};
