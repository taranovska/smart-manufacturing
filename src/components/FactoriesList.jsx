import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner, Table } from "react-bootstrap";
import styles from "./FactoriesList.module.css";
import edit from "../img/edit.png";
import remove from "../img/remove.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../fetchData";
import { DISMISS_FACTORY_DATA, EDIT_FACTORY_DATA } from "../actionsType";
import EditFactoryForm from "./EditFactoryForm";
import { db } from "../firebase-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { fetchDataSuccess } from "../actions";
import { Link } from "react-router-dom";

const FactoriesList = () => {
  const headers = [
    "#",
    "name",
    "description",
    "latitude/longitude",
    "status",
    "address",
  ];

  const factoriesCollectionRef = collection(db, "factories");

  useEffect(() => {
    const getFactories = async () => {
      const dataFirebase = await getDocs(factoriesCollectionRef);
      const data = dataFirebase.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(fetchDataSuccess(data));
    };
    getFactories();
  }, [factoriesCollectionRef]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const deleteHandler = async (id) => {
    const factoryDoc = doc(db, "factories", id);
    await deleteDoc(factoryDoc);
  };

  const data = useSelector((state) => state.data);

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
            {data.map((factory, index) => {
              const { id, name, description, latitude, longitude, status } =
                factory;
              const { country, city, street, zipCode } = factory.address;
              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{name}</td>
                  <td>{description}</td>
                  <td key={id}>{`${latitude} / ${longitude}`}</td>
                  <td>{status}</td>
                  <td>{`${country}, ${city}, ${street}, ${
                    zipCode === null ? "-" : zipCode
                  }`}</td>
                  <td>
                    <Button variant="info" href="#">
                      <Link to={`/${id}`}>
                        <img
                          src={edit}
                          alt="Details"
                          style={{ width: "1rem", height: "1rem" }}
                        />
                      </Link>
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="link"
                      href="#"
                      onClick={() => {
                        deleteHandler(id);
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
