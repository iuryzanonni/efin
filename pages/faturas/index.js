import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./style.module.css";
import propTypes from "prop-types";
import axios from "axios";
import { getCookie } from "../../src/service/cookieService";
import Header from "../../src/components/header";
import CardInvoice from "../../src/components/cardInvoice";
import Button from "../../src/components/button";

import { COOKIE_EFIN_JWT } from "../../public/constants";

export default function Faturas(props) {
  const router = useRouter();
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

  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    handlerInvoices();
  }, []);

  const handlerInvoices = async () => {
    const cookie = getCookie(COOKIE_EFIN_JWT);
    const headers = { "x-access-token": cookie };

    await axios
      .get("api/invoices/1", { headers: headers })
      .then((response) => setInvoices(response.data))
      .catch((error) => console.log(error));
  };

  const handleAddInvoice = () => {
    router.push(router.route + "/add");
  };

  const date = props.date ? props.date : new Date();

  return (
    <div>
      <Header title="Lista de faturas" />
      <div className={styles.container}>
        <div className={styles.title}>
          {monthNames[date.getMonth()]} - {date.getFullYear()}
        </div>
        <div className={styles.invoices}>
          {invoices &&
            invoices.map((invoice, index) => {
              return (
                <CardInvoice
                  key={index}
                  type={invoice.type}
                  value={invoice.value}
                  dueDate={new Date(invoice.dueDate)}
                />
              );
            })}
        </div>
        <div className={styles.button}>
          <Button text="Adicionar fatura" onclick={() => handleAddInvoice()} />
        </div>
      </div>
    </div>
  );
}

Faturas.propTypes = {
  date: propTypes.object,
};
