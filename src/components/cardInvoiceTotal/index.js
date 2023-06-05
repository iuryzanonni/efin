import React from "react";
import propTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const CardBox = styled(Box)({
  backgroundColor: "#616161",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  padding: 15,
  borderRadius: 5,
  width: "90%",
});

export default function CardInvoiceTotal(props) {
  const calculateTotal = (invoices) => {
    let total = 0;
    invoices &&
      invoices.map((invoice) => {
        total += parseFloat(invoice.value);
      });

    return total;
  };

  return (
    <CardBox mb={2}>
      <Box>
        <Typography>R$ {calculateTotal(props.invoices).toFixed(2)}</Typography>
      </Box>
    </CardBox>
  );
}

CardInvoiceTotal.propTypes = {
  invoices: propTypes.object,
};
