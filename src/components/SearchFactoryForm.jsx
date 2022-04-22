import React from "react";
import { Form } from "react-bootstrap";

const SearchFactoryForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Search factory:</Form.Label>
        <Form.Control type="text" placeholder="Enter factory name" />
      </Form.Group>
    </Form>
  );
};

export default SearchFactoryForm;
