import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_SEARCH_QUERY, SEARCH_QUERY } from "../actionsType";
import styles from "./SearchFactoryForm";

const SearchFactoryForm = () => {
  const loading = useSelector((state) => state.loading);
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();
  return (
    <>
      {data.length > 0 && !loading && (
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
            <Form.Label>
              <div style={{ textTransform: "uppercase" }}>
                searching for a factory:
              </div>
            </Form.Label>
            <Form.Control type="text" placeholder="Enter factory name" />
          </Form.Group>
        </Form>
      )}
    </>
  );
};

export default SearchFactoryForm;
