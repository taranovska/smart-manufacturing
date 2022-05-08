import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./AddNewFactoryBtn.module.css";

const AddNewFactoryBtn = () => {
  return (
    <div className={styles.wrapper}>
      <Link to="/newFactory" className={styles.addFactory}>
        <Button variant="primary" className={styles.title}>
          Add new factory
        </Button>
      </Link>
    </div>
  );
};

export default AddNewFactoryBtn;
