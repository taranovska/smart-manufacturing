import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./AddNewFactoryButton.module.css";

const AddNewFactoryButton = () => {
  return (
    <Button variant="info">
      <Link to="/newFactory" className={styles.addFactory}>
        Add new factory
      </Link>
    </Button>
  );
};

export default AddNewFactoryButton;
