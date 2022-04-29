import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./NewFactoryForm.module.css";

import back from "../img/back.png";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NewFactoryForm = () => {
  const [validated, setValidated] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [status, setStatus] = useState("operative");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");
  //const [latNotValid, setLatNotValid] = useState("");
  //const [longNotValid, setLongNotValid] = useState("");

  // const regexExpLat = /^((\-?|\+?)?\d+(\.\d+)?)$/gi;
  // const regexExpLong = /^((\-?|\+?)?\d+(\.\d+)?)$/gi;

  const factoriesCollectionRef = collection(db, "factories");
  let history = useNavigate();

  const createFactory = async () => {
    await addDoc(factoriesCollectionRef, {
      name,
      description,
      latitude,
      longitude,
      status,
      address: {
        country,
        city,
        street,
        zipCode,
      },
    });
    console.log("create factory firebase");
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      console.log("dont validate new factory form")
    }
    if (form.checkValidity() === true) {
      createFactory();
      setName("");
      setDescription("");
      setLatitude("");
      setLongitude("");
      setStatus("operative");
      setCountry("");
      setCity("");
      setStreet("");
      setZipCode("");
      setValidated(false);
      setTimeout(() => {
        history("/");
      }, 1000);
      console.log("validate new factory form")
    }
  };

  return (
    <Form
      className={styles.formNewFactory}
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3" controlId="validationCustom01">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid name.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="validationCustom02">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Description..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please add description.
        </Form.Control.Feedback>
      </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="validationCustom03">
          <Form.Label>Latitude</Form.Label>

          <Form.Control
            type="number"
            required
            onChange={(e) => {
              setLatitude(e.target.value);
            }}
            value={latitude}
          />

          <Form.Control.Feedback type="invalid">
            Please provide latitude.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="validationCustom04">
          <Form.Label>Longitude</Form.Label>
          <Form.Control
            type="number"
            required
            onChange={(e) => {
              setLongitude(e.target.value);
            }}
            value={longitude}
          />
          <Form.Control.Feedback type="invalid">
            Please provide longitude.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="validationCustom05">
        <Form.Label>Status</Form.Label>
        <Form.Select
          aria-label="Select status"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
          required
        >
          <option value="operative">Operative</option>
          <option value="idle">Idle</option>
          <option value="dismissed">Dismissed</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Please select a status.
        </Form.Control.Feedback>
      </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please provide country.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            onChange={(e) => setCity(e.target.value)}
            value={city}
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please provide city.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridStreet">
          <Form.Label>Street</Form.Label>
          <Form.Control
            onChange={(e) => setStreet(e.target.value)}
            value={street}
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please provide street.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            onChange={(e) => setZipCode(e.target.value)}
            value={zipCode}
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please provide zip code.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <div className={styles.buttons}>
        <Button variant="info">
          <Link to="/" className={styles.addFactory}>
            <img
              src={back}
              alt="Return back"
              style={{ width: "1rem", height: "1rem" }}
            />
            Return back
          </Link>
        </Button>
        <Button variant="primary" type="submit" className={styles.submit}>
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default NewFactoryForm;
