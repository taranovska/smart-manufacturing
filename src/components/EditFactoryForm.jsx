import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./NewFactoryForm.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

import { EDIT_FACTORY_DATA } from "../actionsType";
import SpinnerCust from "./SpinnerCust";
import BtnBack from "./BtnBack";

const EditFactoryForm = () => {
  const params = useParams();
  const data = useSelector((state) => state.data);
  const currentFactory = data.find((factory) => factory.id === params.id);

  const {
    name: prevName,
    description: prevDescription,
    latitude: prevLatitude,
    longitude: prevLongitude,
    status: prevStatus,
  } = currentFactory;
  const { address: prevAddress } = currentFactory;
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);

  const [sending, setSending] = useState(false);
  const [latValid, setLatValid] = useState(true);
  const [longValid, setLongValid] = useState(true);
  const [name, setName] = useState(prevName);
  const [description, setDescription] = useState(prevDescription);
  const [latitude, setLatitude] = useState(prevLatitude);
  const [longitude, setLongitude] = useState(prevLongitude);
  const [address, setAddress] = useState(prevAddress);

  const [status, setStatus] = useState(prevStatus);

  let history = useNavigate();
  const regexExt = /^(-?[0-9]{1,2}(?:\.[0-9]{1,10})?)$/gi;

  const updateFactoryData = async (id) => {
    const factoryDoc = doc(db, "factories", id);

    await updateDoc(factoryDoc, {
      name,
      description,
      latitude,
      longitude,
      status,
      address: [...address],
    });
    console.log("edit factory firebase");
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      setSending(false);
      console.log("not validated form edit");
    }
    if (form.checkValidity() === true) {
      dispatch({
        type: EDIT_FACTORY_DATA,
        payload: {
          id: params.id,
          updatedFactoryObj: {
            name,
            description,
            latitude,
            longitude,
            status,
            address: [...address],
          },
        },
      });
      updateFactoryData(params.id);
      setValidated(false);
      setSending(true);
      setTimeout(() => {
        history("/");
      }, 1000);
      console.log("validated form edit");
    }
  };

  return (
    <>
      {sending && <SpinnerCust />}
      {!sending && (
        <Form
          className={styles.formNewFactory}
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label>Name </Form.Label>
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
                  if (regexExt.test(e.target.value)) {
                    setLatitude(e.target.value);
                    setLatValid(true);
                  } else {
                    setLatValid(false);
                    setLatitude("");
                  }
                }}
                value={latitude}
              />
              {latValid === false && (
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
                onChange={(e) => {
                  if (regexExt.test(e.target.value)) {
                    setLongitude(e.target.value);
                    setLongValid(true);
                  } else {
                    setLongValid(false);
                    setLongitude("");
                  }
                }}
                value={longitude}
              />
              {longValid === false && (
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

          {address.map((item, index) => {
            const newAddress = JSON.parse(JSON.stringify(address));
            const { country, city, street, zipCode } = item;
            return (
              <Row className="mb-3" key={index}>
                <Form.Group as={Col} controlId="formGridCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      newAddress[index].country = e.target.value;
                      setAddress(newAddress);
                    }}
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
                    onChange={(e) => {
                      newAddress[index].city = e.target.value;
                      setAddress(newAddress);
                    }}
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
                    onChange={(e) => {
                      newAddress[index].street = e.target.value;
                      setAddress(newAddress);
                    }}
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
                    type="number"
                    onChange={(e) => {
                      newAddress[index].zipCode = e.target.value;
                      setAddress(newAddress);
                    }}
                    value={`${zipCode === null ? "-" : zipCode}`}
                    required
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please provide zip code.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            );
          })}

          <div className={styles.buttons}>
            <BtnBack />
            <Button variant="primary" type="submit" className={styles.submit}>
              Submit
            </Button>
          </div>
        </Form>
      )}
    </>
  );
};

export default EditFactoryForm;
