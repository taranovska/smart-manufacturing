import React, { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./NewFactoryForm.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import back from "../img/back.png";

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
  // const {
  //   country: prevCountry,
  //   city: prevCity,
  //   street: prevStreet,
  //   zipCode: prevZipCode,
  // } = currentFactory.address;
  const { address: prevAddress } = currentFactory;

  const [validated, setValidated] = useState(false);

  const [name, setName] = useState(prevName);
  const [description, setDescription] = useState(prevDescription);
  const [latitude, setLatitude] = useState(prevLatitude);
  const [longitude, setLongitude] = useState(prevLongitude);
  const [address, setAddress] = useState(prevAddress);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(prevStatus);
  // const [country, setCountry] = useState(prevCountry);
  // const [city, setCity] = useState(prevCity);
  // const [street, setStreet] = useState(prevStreet);
  // const [zipCode, setZipCode] = useState(prevZipCode);
  const [query, setQuery] = useState("");
  //const [latNotValid, setLatNotValid] = useState("");
  //const [longNotValid, setLongNotValid] = useState("");

  // const regexExpLat = /^((\-?|\+?)?\d+(\.\d+)?)$/gi;
  // const regexExpLong = /^((\-?|\+?)?\d+(\.\d+)?)$/gi;

  // const createFactory = async () => {
  //   await addDoc(factoriesCollectionRef, {
  //     name,
  //     description,
  //     latitude,
  //     longitude,
  //     status,
  //     address: {
  //       country,
  //       city,
  //       street,
  //       zipCode,
  //     },
  //   });
  // };
  let history = useNavigate();

  const updateFactoryData = async (
    id
    // name,
    // description,
    // latitude,
    // longitude,
    // status,
    // country,
    // city,
    // street,
    // zipCode
  ) => {
    const factoryDoc = doc(db, "factories", id);
    // const updateName = { name };
    // const updateDescription = { description };
    // const updateLatitude = { latitude };
    // const updateLongitude = { longitude };
    // const updateStatus = { status };
    // const updateAddress = { address: { country, city, street, zipCode } };
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
      updateFactoryData(params.id);
      // setName("");
      // setDescription("");
      // setLatitude("");
      // setLongitude("");
      // setStatus("operative");
      // const clearAddress = [
      //   ...address.map((item) => {
      //     for (const key in item) {
      //       console.log((item[key] = ""));
      //     }
      //   }),
      // ];

      //setAddress([...address.map((item) => console.log(item))]);
      setValidated(false);
      setSending(true);
      setTimeout(() => {
        history("/");
      }, 1000);
      console.log("validated form edit");
    }
  };

  // const updateAddress = (e, field, index) => {
  //   const newAddress = [...address];
  //   console.log(newAddress);
  //   newAddress[index].field = e.target.value;
  //   setAddress(newAddress);
  // };

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

          {address.map((item, index) => {
            const newAddress = [...address];
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
      )}
    </>
  );
};

export default EditFactoryForm;
