import React, { useState } from "react";
import {
  Button,
  Col,
  FloatingLabel,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./NewFactoryForm.module.css";
import Latlng from "react-input-latlng";
import { Link } from "react-router-dom";
import back from "../img/back.png";

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
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    try {
      let res = await fetch("https://httpbin", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          latitude: latitude,
          longitude: longitude,
          status: status,
          country: country,
          city: city,
          street: street,
          zipCode: zipCode,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setName("");
        setDescription("");
        setLatitude("");
        setLongitude("");
        setStatus("");
        setCountry("");
        setCity("");
        setStreet("");
        setZipCode("");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
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
          required
        />
        <Form.Control.Feedback type="invalid">
          Please add description.
        </Form.Control.Feedback>
      </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="validationCustom03">
          {/* TODO add validation */}
          <Form.Label>Latitude</Form.Label>

          <Latlng
            style={{
              outline: "none",
              display: "block",
              width: "100%",
              fontSize: "1rem",
              fontWeight: "400",
              lineHeight: "1.5",
              borderColor: "none",
              backgroundColor: "#fff",
              backgroundClip: "paddingBox",
              border: "1px solid #ced4da",
              appearance: "none",
              borderRadius: "0.25rem",
              transition:
                "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
            }}
            decimal={true}
            onChange={(e) => setLatitude(e.target.value)}
            // lat={this.state.lat}
            // lng={this.state.lng}
            // onChange={(lat, lng) => this.updatePoint(lat, lng)}
          />

          <Form.Control.Feedback type="invalid">
            Please provide latitude.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="validationCustom04">
          <Form.Label>Longitude</Form.Label>
          <Form.Control
            type="bigint "
            required
            onChange={(e) => setLongitude(e.target.value)}
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
