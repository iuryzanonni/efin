import React from "react";

import styles from "./style.module.css";
import propTypes from "prop-types";

export default function Button(props) {
  const COLOR_DEFAULT = "#FFF";
  const BACKGROUND_COLOR_DEFAULT = "#000";

  return (
    <button
      className={styles.button}
      onClick={props.onclick}
      style={{
        color: props.color ? props.color : COLOR_DEFAULT,
        backgroundColor: props.backgroundColor ? props.backgroundColor : BACKGROUND_COLOR_DEFAULT,
      }}
    >
      {props.text}
    </button>
  );
}

Button.propTypes = {
  text: propTypes.string,
  onclick: propTypes.func,
  color: propTypes.string,
  backgroundColor: propTypes.string,
};
