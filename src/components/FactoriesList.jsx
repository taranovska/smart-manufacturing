import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner, Table } from "react-bootstrap";
import styles from "./FactoriesList.module.css";
import edit from "../img/edit.png";
import remove from "../img/remove.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../fetchData";
import { DISMISS_FACTORY_DATA, EDIT_FACTORY_DATA } from "../actionsType";
import EditFactoryForm from "./EditFactoryForm";

const FactoriesList = () => {
  const headers = [
    "#",
    "name",
    "description",
    "latitude/longitude",
    "status",
    "address",
  ];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    console.log(id);
    setShow(true);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
    console.log("fetch data");
  }, [dispatch]);

  const deleteHandler = (id) => {
    console.log(id);
    dispatch({ type: DISMISS_FACTORY_DATA, payload: id });
  };
  const editHandler = (id) => {
    console.log(id);
    dispatch({ type: EDIT_FACTORY_DATA, payload: id });
    setShow(false);
  };

  const data = useSelector((state) => state.data);
  console.log(data);

  const loading = useSelector((state) => state.loading);

  //const { error } = useSelector((state) => state.error);

  //const [loading, setLoading] = useState(true);
  //const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // setLoading(true);
  //     try {
  //       const { data: response } = await axios.get(
  //         "https://my.api.mockaroo.com/smart_manufacturing.json?key=a252b490"
  //       );
  //       setData(response);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //     setLoading(false);
  //   };

  //   fetchData();
  // }, []);
  // console.log(data[0]?.id);

  return (
    <div>
      {loading && (
        <div className={styles.spinner}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {data.length > 0 && !loading && (
        <Table striped bordered hover variant="dark" responsive>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((factory) => {
              return (
                <tr key={factory.id}>
                  <td>{factory.id}</td>
                  <td>{factory.name}</td>
                  <td>{factory.description}</td>
                  <td
                    key={factory.id}
                  >{`${factory.latitude} / ${factory.longitude}`}</td>
                  <td>{factory.status}</td>
                  <td>{`${factory.country}, ${factory.city}, ${
                    factory.street
                  }, ${factory.zipCode === null ? "-" : factory.zipCode}`}</td>
                  <td>
                    <Button
                      variant="info"
                      href="#"
                      onClick={() => handleShow(factory.id)}
                    >
                      <img
                        src={edit}
                        alt="Details"
                        style={{ width: "1rem", height: "1rem" }}
                      />
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit factory data</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <EditFactoryForm factory={factory} />
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => editHandler(factory.id)}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </td>
                  <td>
                    <Button
                      variant="link"
                      href="#"
                      onClick={() => {
                        deleteHandler(factory.id);
                      }}
                    >
                      <img
                        src={remove}
                        alt="Dismiss"
                        style={{ width: "1.5rem", height: "1.5rem" }}
                      />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      {data.length < 1 && <div>Can't get data</div>}
    </div>
  );
};

export default FactoriesList;
