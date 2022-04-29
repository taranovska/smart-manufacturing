import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { CLEAR_SEARCH_QUERY, SEARCH_QUERY } from "../actionsType";

const SearchFactoryForm = () => {
  const dispatch = useDispatch();
  return (
    <Form
      onChange={(e) => {
        if (e.target.value === "") {
          dispatch({ type: CLEAR_SEARCH_QUERY });
        } else {
          dispatch({ type: SEARCH_QUERY, payload: e.target.value });
        }
      }}
    >
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Search factory:</Form.Label>
        <Form.Control type="text" placeholder="Enter factory name" />
      </Form.Group>
    </Form>
  );
};

export default SearchFactoryForm;
