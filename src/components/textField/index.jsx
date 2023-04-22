import React from "react";

import styles from "./style.module.css";
import propTypes from "prop-types";

export default function TextField(props) {
  return (
    <div className={styles.textField}>
      <input className={styles.input} id={"input-" + props.id} type={props.type} onChange={props.onChange} required />
      <label className={styles.label} id={"label-" + props.id}>
        {props.label}
      </label>
    </div>
  );
}

TextField.propTypes = {
  id: propTypes.string,
  label: propTypes.string,
  type: propTypes.string,
  onChange: propTypes.func,
};
