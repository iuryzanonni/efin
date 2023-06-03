import React from "react";
import propTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  backgroudCard: {
    backgroundColor: "#616161",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    padding: 15,
    borderRadius: 5,
    width: "90%",
  },
}));

export default function CardInvoiceTotal(props) {
  const styles = useStyles();

  const calculateTotal = (invoices) => {
    let total = 0;
    invoices &&
      invoices.map((invoice) => {
        total += parseFloat(invoice.value);
      });

    return total;
  };

  return (
    <Box className={styles.backgroudCard} mb={2}>
      <Box>
        <Typography>R$ {calculateTotal(props.invoices).toFixed(2)}</Typography>
      </Box>
    </Box>
  );
}

CardInvoiceTotal.propTypes = {
  invoices: propTypes.object,
};
