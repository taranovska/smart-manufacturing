import React from "react";
import { Form } from "react-bootstrap";

const SearchFactoryForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Search factory</Form.Label>
        <Form.Control type="text" placeholder="Enter factory name" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
    </Form>
  );
};

export default SearchFactoryForm;
