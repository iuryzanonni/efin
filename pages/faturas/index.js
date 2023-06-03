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
import api from "../../src/config/axiosConfig";
import CardInvoiceTotal from "../../src/components/cardInvoiceTotal";

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

  const date = props.date ? props.date : new Date();

  const handlerInvoices = async () => {
    const token = getCookie(COOKIE_EFIN_JWT);
    const headers = { "x-access-token": token };

    const user = await decodeToken(token);

    await axios
      .get(`api/invoices/${user.id}`, { headers: headers })
      .then((response) => setInvoices(response.data))
      .catch((error) => console.log(error));
  };

  const handleAddInvoice = () => {
    router.push(router.route + "/add");
  };

  const decodeToken = async (token) => {
    const data = await axios
      .get("api/accounts/decode", { params: { token } })
      .then((response) => response.data)
      .then((data) => data.data)
      .catch((error) => console.log(error));

    return data;
  };

  const updateInvoice = async (invoice) => {
    const token = getCookie(COOKIE_EFIN_JWT);
    const headers = { "x-access-token": token };
    invoice.payment = new Date();

    const response = api
      .put(`invoices/${invoice.userId}`, invoice, { headers: headers })
      .then((response) => {
        response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    return response;
  };

  const paymentInvoice = async (invoice) => {
    invoice.payment = new Date();
    await saveInvoice(invoice);
    console.log(invoice);
  };

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
                  key={invoice.id}
                  type={invoice.type}
                  value={invoice.value}
                  dueDate={new Date(invoice.dueDate)}
                  onClickCheck={() => updateInvoice(invoice)}
                />
              );
            })}
        </div>
        <CardInvoiceTotal invoices={invoices} />
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
