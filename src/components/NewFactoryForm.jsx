import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./NewFactoryForm.module.css";
import { nanoid } from "nanoid";
import BtnBack from "./BtnBack";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_FACTORY_DATA } from "../actionsType";

const NewFactoryForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  let history = useNavigate();
  const coordinatesPattern = /^(-?[0-9]{1,2}(?:\.[0-9]{1,10})?)$/gi;
  const factoriesCollection = collection(db, "factories");

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
  const [latIsValid, setLatIsValid] = useState(true);
  const [longIsValid, setLongIsValid] = useState(true);

  const createFactory = async () => {
    await addDoc(factoriesCollection, {
      name,
      description,
      latitude,
      longitude,
      status,
      address: [{ country, city, street, zipCode }],
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else if (form.checkValidity() === true) {
      !error && createFactory();
      dispatch({
        type: CREATE_FACTORY_DATA,
        payload: {
          name,
          id: nanoid(12),
          description,
          latitude,
          longitude,
          status,
          address: [{ country, city, street, zipCode }],
        },
      });
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
    }
  };

  return (
    <>
      <h1 className={styles.title}>Create new factory data</h1>
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
              placeholder="Enter latitude"
              onChange={(e) => {
                if (coordinatesPattern.test(e.target.value)) {
                  setLatitude(e.target.value);
                  setLatIsValid(true);
                } else {
                  setLatIsValid(false);
                  setLatitude("");
                }
              }}
              value={latitude}
            />
            {!latIsValid && (
              <span style={{ color: "#dc3545" }}>
                Not valid latitude format
              </span>
            )}
            <Form.Control.Feedback type="invalid">
              Please provide latitude.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="validationCustom04">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="number"
              required
              placeholder="Enter longitude"
              onChange={(e) => {
                if (coordinatesPattern.test(e.target.value)) {
                  setLongitude(e.target.value);
                  setLongIsValid(true);
                } else {
                  setLongIsValid(false);
                  setLongitude("");
                }
              }}
              value={longitude}
            />
            {!longIsValid && (
              <span style={{ color: "#dc3545" }}>
                Not valid longitude format
              </span>
            )}
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
            <option value="operative">operative</option>
            <option value="idle">idle</option>
            <option value="dismissed">dismissed</option>
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
              placeholder="Enter country"
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
              placeholder="Enter city"
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
              placeholder="Enter street"
              required
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Please provide street.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter zip code"
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
          <BtnBack />
          <Button variant="primary" type="submit" className={styles.submit}>
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default NewFactoryForm;
