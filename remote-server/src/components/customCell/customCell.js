import React, { useState, useEffect } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import styles from './cusomcell.module.css'

// A custom cell component that renders a truncated value and a tooltip
const CustomCell = ({ value,}) => {
  // A state variable to store the truncated value
  const [truncated, setTruncated] = useState("");

  // A function to truncate a value to a given length
  const truncate = (value, length) => {
    if (value.length > length) {
      return value.substring(0, length) + "...";
    } else {
      return value;
    }
  };

  // A useEffect hook to update the truncated value when the value prop changes
  useEffect(() => {
    setTruncated(truncate(value, 8));
  }, [value]);

  return (
    <Tippy content={value}>
      <div className={styles.customCell}>{truncated}</div> 
    </Tippy>
  );
};

export default CustomCell
