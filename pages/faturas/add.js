import React, { useEffect, useState } from "react";

import styles from "./style.module.css";
import Header from "../../src/components/header";
import Button from "../../src/components/button";
import TextField from "../../src/components/textField";
import { Alert, Checkbox } from "@mui/material";
import { decodeToken } from "../../src/utils/decodeToken";
import { getCookie } from "../../src/service/cookieService";

import { COOKIE_EFIN_JWT } from "../../public/constants";
import api from "../../src/config/axiosConfig";
import { useRouter } from "next/router";
import { messages } from "../../public/messages";

export default function AddInvoice() {
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [installments, setInstallments] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      closeAlerts();
    }, 10000);

    return () => clearTimeout(timer);
  }, [showSuccess, showFailure]);

  const saveInvoice = async () => {
    const token = getCookie(COOKIE_EFIN_JWT);
    const user = await decodeToken(token);
    const headers = { "x-access-token": token };

    const invoice = {
      type,
      installments,
      value,
      dueDate: new Date(dueDate.split("-")[0], dueDate.split("-")[1] - 1, dueDate.split("-")[2]),
      isMonthly,
    };

    api
      .post(`invoices/${user.id}`, invoice, { headers: headers })
      .then((response) => {
        closeAlerts();
        setShowSuccess(true);
      })
      .catch((error) => {
        closeAlerts();
        setShowFailure(true);
      });
  };

  const goInvoiceList = () => {
    router.back();
  };

  const closeAlerts = () => {
    setShowSuccess(false);
    setShowFailure(false);
  };

  return (
    <div>
      <Header title="Adicionar fatura" />
      <div className={styles.container}>
        <div className={styles.title}>Nova fatura</div>
        <div className={styles.addPaper}>
          <TextField label="Fatura" value={type} onChange={(event) => setType(event.target.value)} />
          <TextField label="Valor" value={value} onChange={(event) => setValue(event.target.value)} />
          <TextField label="Parcelas" value={installments} onChange={(event) => setInstallments(event.target.value)} />
          <TextField label="Vencimento" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
          <div className={styles.checkbox}>
            <Checkbox style={{ color: "white" }} checked={isMonthly} onChange={() => setIsMonthly(!isMonthly)} />
            <div>Mensal</div>
          </div>
        </div>
        <div className={styles.addButton}>
          <Button text="Adicionar fatura" onclick={() => saveInvoice()} />
        </div>
        <div className={styles.addButton}>
          <Button text="Lista de faturas" backgroundColor="#FFF" color="#000" onclick={() => goInvoiceList()} />
        </div>
        <div className={styles.alert}>
          {showSuccess && (
            <Alert variant="filled" severity="success" onClose={() => closeAlerts()}>
              {messages.invoiceSuccess}
            </Alert>
          )}
          {showFailure && (
            <Alert variant="filled" severity="error" onClose={() => closeAlerts()}>
              {messages.invoiceFailure}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
