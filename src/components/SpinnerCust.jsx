import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "./Spinner.module.css";

export default function SpinnerCust() {
  return (
    <div className={styles.spinner}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
