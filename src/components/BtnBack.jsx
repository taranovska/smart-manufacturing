import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import back from "../img/back.png";
import styles from "./BtnBack.module.css";

export default function BtnBack() {
  return (
    <Button variant="info">
      <Link to="/" className={styles.back}>
        <div className={styles.flex}>
          <img
            src={back}
            alt="Return back"
            style={{ width: "1rem", height: "1rem", marginRight: "10px" }}
          />
          <div>Back</div>
        </div>
      </Link>
    </Button>
  );
}
