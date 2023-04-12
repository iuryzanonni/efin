import React, { useState } from "react";

import styles from "./style.module.css";
import propTypes from "prop-types";
import Header from "../../components/header";
import Button from "../../components/button";
import TextField from "../../components/textField";
import { Checkbox } from "@mui/material";

export default function AddInvoice(props) {
  const [invoice, setInvoice] = useState("");
  const [value, setValue] = useState("");
  const [installments, setInstallments] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [monthly, setMonthly] = useState(false);

  const saveInvoice = () => {
    console.log({ invoice, value, installments, dueDate, monthly });
  };

  return (
    <div>
      <Header title="Adicionar fatura" />
      <div className={styles.container}>
        <div className={styles.title}>Nova fatura</div>
        <div className={styles.addPaper}>
          <TextField label="Fatura" value={invoice} onChange={(event) => setInvoice(event.target.value)} />
          <TextField label="Valor" value={value} onChange={(event) => setValue(event.target.value)} />
          <TextField label="Parcelas" value={installments} onChange={(event) => setInstallments(event.target.value)} />
          <TextField label="Vencimento" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
          <div className={styles.checkbox}>
            <Checkbox style={{ color: "white" }} checked={monthly} onChange={() => setMonthly(!monthly)} />
            <div>Mensal</div>
          </div>
        </div>
        <div className={styles.addButton}>
          <Button text="Adicionar fatura" onclick={() => saveInvoice()} />
        </div>
      </div>
    </div>
  );
}

AddInvoice.propTypes = {};
