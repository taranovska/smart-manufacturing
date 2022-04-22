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

const NewFactoryForm = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
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
        <Form.Control type="text" placeholder="Enter name" required />
        <Form.Control.Feedback type="invalid">
          Please provide a valid name.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="validationCustom02">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description..." required />
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
          <Form.Control type="bigint " required />
          <Form.Control.Feedback type="invalid">
            Please provide longitude.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="validationCustom05">
        <Form.Label>Status</Form.Label>
        <Form.Select aria-label="Select status" required>
          <option value="operative">Operative</option>
          <option value="idle">Idle</option>
          <option value="dismissed">Dismissed</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Please select a status.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="validationCustom06">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Enter address" required />
        <Form.Control.Feedback type="invalid">
          Please provide a valid address.
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default NewFactoryForm;
