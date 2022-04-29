import React, { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./NewFactoryForm.module.css";

import back from "../img/back.png";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NewLocationForm = () => {
  const params = useParams();
  const data = useSelector((state) => state.data);
  const currentFactory = data.find((factory) => factory.id === params.id);
  console.log(currentFactory.address);

  const [validated, setValidated] = useState(false);
  const [sending, setSending] = useState(false);
  const [newCountry, setNewCountry] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [newZipCode, setNewZipCode] = useState("");
  //const [latNotValid, setLatNotValid] = useState("");
  //const [longNotValid, setLongNotValid] = useState("");

  // const regexExpLat = /^((\-?|\+?)?\d+(\.\d+)?)$/gi;
  // const regexExpLong = /^((\-?|\+?)?\d+(\.\d+)?)$/gi;

  let history = useNavigate();

  const addNewAddress = async (id) => {
    const factoryDoc = doc(db, "factories", id);

    await updateDoc(factoryDoc, {
      address: [
        ...[
          ...currentFactory.address,
          {
            country: newCountry,
            city: newCity,
            street: newStreet,
            zipCode: newZipCode,
          },
        ],
      ],
    });
    console.log("edit factory firebase");
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setSending(false);
      setValidated(true);
      console.log("dont validate add new address");
    }
    if (form.checkValidity() === true) {
      //   createFactory();
      //   setName("");
      //   setDescription("");
      //   setLatitude("");
      //   setLongitude("");
      //   setStatus("operative");
      //   setCountry("");
      //   setCity("");
      //   setStreet("");
      //   setZipCode("");
      setValidated(false);
      setSending(true);
      setTimeout(() => {
        history("/");
      }, 1000);
      addNewAddress(params.id);
      // console.log([
      //   ...currentFactory.address,
      //   { newCountry, newCity, newStreet, newZipCode },
      // ]);
      console.log("validate new address");
    }
  };

  return (
    <>
      {sending && (
        <div className={styles.spinner}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {!sending && (
        <>
          <h1 className={styles.title}>
            Add new location for {currentFactory.name}
          </h1>
          <Form
            className={styles.formNewFactory}
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3" controlId="formGridCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                onChange={(e) => setNewCountry(e.target.value)}
                value={newCountry}
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide country.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                onChange={(e) => setNewCity(e.target.value)}
                value={newCity}
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide city.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridStreet">
              <Form.Label>Street</Form.Label>
              <Form.Control
                onChange={(e) => setNewStreet(e.target.value)}
                value={newStreet}
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide street.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridZip">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                onChange={(e) => setNewZipCode(e.target.value)}
                value={newZipCode}
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide zip code.
              </Form.Control.Feedback>
            </Form.Group>

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
        </>
      )}
    </>
  );
};

export default NewLocationForm;
