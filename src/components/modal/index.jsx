import React, { useState } from "react";
import styles from "./style.module.css";

import propTypes from "prop-types";

export default function ModalEfin(props) {
  return (
    <div>
      {props.isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>{props.children}</div>
        </div>
      )}
    </div>
  );
}

ModalEfin.propTypes = {
  isOpen: propTypes.bool,
};
