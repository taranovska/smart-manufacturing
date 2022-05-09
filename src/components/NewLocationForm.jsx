import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./NewFactoryForm.module.css";
import BtnBack from "./BtnBack";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SpinnerComponent from "./SpinnerComponent";
import { ADD_NEW_LOCATION } from "../actionsType";

const NewLocationForm = () => {
  const params = useParams();
  const data = useSelector((state) => state.data);
  const error = useSelector((state) => state.error);
  const currentFactory = data.find((factory) => factory.id === params.id);
  const dispatch = useDispatch();
  const history = useNavigate();

  const [validated, setValidated] = useState(false);
  const [sending, setSending] = useState(false);
  const [newCountry, setNewCountry] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [newZipCode, setNewZipCode] = useState("");

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
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setSending(false);
      setValidated(true);
    }
    if (form.checkValidity() === true) {
      dispatch({
        type: ADD_NEW_LOCATION,
        payload: {
          id: params.id,
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
        },
      });
      setValidated(false);
      setSending(true);
      setTimeout(() => {
        history("/");
      }, 1000);
      !error && addNewAddress(params.id);
    }
  };

  return (
    <>
      {sending && <SpinnerComponent />}
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
                placeholder="Enter country"
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
                placeholder="Enter city"
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
                placeholder="Enter street"
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide street.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridZip">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setNewZipCode(e.target.value)}
                value={newZipCode}
                placeholder="Enter zip code"
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide zip code.
              </Form.Control.Feedback>
            </Form.Group>
            <div className={styles.buttons}>
              <BtnBack />
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
