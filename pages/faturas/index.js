import React from "react";

import styles from "./style.module.css";
import propTypes from "prop-types";
import Header from "../../components/header";
import CardInvoice from "../../components/cardInvoice";
import Button from "../../components/button";

export default function Faturas(props) {
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const tests = [
    { name: "Fatura 1", value: 123.45 },
    { name: "Fatura 2", value: 235.11 },
  ];

  const date = props.date ? props.date : new Date();

  return (
    <div>
      <Header title="Lista de faturas" />
      <div className={styles.container}>
        <div className={styles.title}>
          {monthNames[date.getMonth()]} - {date.getFullYear()}
        </div>
        <div className={styles.invoices}>
          {tests.map((invoice, index) => {
            return <CardInvoice key={index} name={invoice.name} value={invoice.value} />;
          })}
        </div>
        <div className={styles.button}>
          <Button text="Adicionar fatura" />
        </div>
      </div>
    </div>
  );
}

Faturas.propTypes = {
  date: propTypes.object,
};
