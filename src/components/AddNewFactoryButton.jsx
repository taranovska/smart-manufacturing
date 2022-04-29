import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./AddNewFactoryButton.module.css";

const AddNewFactoryButton = () => {
  return (
    <div className={styles.wrapper}>
      <Button variant="primary">
        <Link to="/newFactory" className={styles.addFactory}>
          Add new factory
        </Link>
      </Button>
    </div>
  );
};

export default AddNewFactoryButton;
