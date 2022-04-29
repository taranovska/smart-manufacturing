import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import styles from "./FactoriesList.module.css";
import edit from "../img/edit.png";
import remove from "../img/remove.png";
import { useDispatch, useSelector } from "react-redux";
import add from "../img/add.png";
import { db } from "../firebase-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { fetchDataError, fetchDataRequest, fetchDataSuccess } from "../actions";
import { Link } from "react-router-dom";

const FactoriesList = () => {
  //const [query, setQuery] = "";
  const headers = [
    "#",
    "name",
    "description",
    "latitude / longitude",
    "status",
    "address",
  ];

  const factoriesCollectionRef = collection(db, "factories");

  const getFactories = async () => {
    dispatch(fetchDataRequest());
    console.log("send request getting data from firebase");
    try {
      const dataFirebase = await getDocs(factoriesCollectionRef);
      const data = dataFirebase.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(fetchDataSuccess(data));
      console.log("get data from firebase");
    } catch (error) {
      dispatch(fetchDataError(error));
      console.log(error);
      console.log("error getting data from firebase");
    }
  };

  useEffect(() => {
    getFactories();
  }, []);

  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    const factoryDoc = doc(db, "factories", id);
    await deleteDoc(factoryDoc);
    getFactories();
    console.log("delete data from firebase");
  };

  const data = useSelector((state) => state.data);
  const error = useSelector((state) => state.error);

  const query = useSelector((state) => state.query);
  //setQuery(queryRedux);

  const loading = useSelector((state) => state.loading);

  const addNewLocation = () => {
    console.log("add new location");
  };

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
        <Table
          striped
          bordered
          hover
          variant="dark"
          responsive
          className={styles.table}
        >
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header.toUpperCase()}</th>
              ))}
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((val) => {
                if (query === "") {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(query.toLowerCase().trim())
                ) {
                  return val;
                }
              })
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((factory, index) => {
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
                    <td>
                      <div>
                        {`${country}, ${city}, ${street}, ${
                          zipCode === null ? "-" : zipCode
                        }`}
                      </div>
                      <div
                        className={styles.addLocation}
                        onClick={addNewLocation}
                      >
                        <img
                          src={add}
                          alt="add location"
                          style={{ width: "1rem", height: "1rem" }}
                        ></img>
                        <p className={styles.addTitle}>add location</p>
                      </div>
                    </td>

                    <td>
                      <Button variant="info">
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
      {error && <div>{error.name}</div>}
    </div>
  );
};

export default FactoriesList;
