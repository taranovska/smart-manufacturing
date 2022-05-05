import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import styles from "./FactoriesList.module.css";
import edit from "../img/edit.png";
import remove from "../img/remove.png";
import { useDispatch, useSelector } from "react-redux";
import add from "../img/add.png";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { fetchDataError, fetchDataRequest, fetchDataSuccess } from "../actions";
import { Link } from "react-router-dom";
import SpinnerCust from "./SpinnerCust";
import {
  DISMISS_FACTORY_DATA,
  DEACTIVATE_EXISTING_LOCATION,
} from "../actionsType";

const FactoriesList = () => {
  const headers = [
    "#",
    "name",
    "description",
    "latitude / longitude",
    "status",
    "address",
    "edit",
    "delete",
  ];

  const factoriesCollectionRef = collection(db, "factories");

  const updateFactoryLocation = async (id, updateAddress) => {
    const factoryDoc = doc(db, "factories", id);

    await updateDoc(factoryDoc, {
      address: [...updateAddress],
    });
    console.log("edit factory address firebase");
  };

  const deleteLocation = (id, index, address, item) => {
    const updateAddress = address.filter((obj) => obj !== item);
    console.log(id, index, address, item);
    updateFactoryLocation(id, updateAddress);
    dispatch({
      type: DEACTIVATE_EXISTING_LOCATION,
      payload: { id, updateAddress, index, item },
    });
  };

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

  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    const factoryDoc = doc(db, "factories", id);
    await deleteDoc(factoryDoc);

    console.log("delete data from firebase");
    dispatch({ type: DISMISS_FACTORY_DATA, payload: id });
  };

  const { data, error, query, loading } = useSelector((state) => state);

  useEffect(() => {
    getFactories();
  }, []);

  return (
    <div>
      {loading && <SpinnerCust />}
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
                const { address } = factory;

                return (
                  <tr key={id}>
                    <td className={styles.centered}>{index + 1}</td>
                    <td>{name}</td>
                    <td>{description}</td>
                    <td>{`${latitude} / ${longitude}`}</td>
                    <td>{status}</td>
                    <td>
                      {address.map((item, index) => {
                        return (
                          <div key={index} className={styles.addressWrapper}>
                            <div className={styles.address}>{`${
                              item.country
                            }, ${item.city}, ${item.street}, ${
                              item.zipCode === null ? "-" : item.zipCode
                            }`}</div>

                            {address.length > 1 && (
                              <Button
                                variant="link"
                                onClick={() => {
                                  deleteLocation(id, index, address, item);
                                }}
                              >
                                <img
                                  src={remove}
                                  alt="Dismiss"
                                  style={{
                                    width: "0.8rem",
                                    height: "0.8rem",
                                  }}
                                />
                              </Button>
                            )}
                          </div>
                        );
                      })}{" "}
                      <div className={styles.addLocationWrapper}>
                        <Button
                          variant="primary"
                          className={styles.btnAddLocation}
                        >
                          <Link
                            to={`/newLocation/${id}`}
                            className={styles.addLocation}
                          >
                            <img
                              src={add}
                              alt="add location"
                              style={{ width: "0.9rem", height: "0.9rem" }}
                            ></img>
                            <div className={styles.addTitle}>add location</div>
                          </Link>
                        </Button>
                      </div>
                    </td>

                    <td className={styles.centered}>
                      <Link to={`/${id}`}>
                        <Button variant="info">
                          <img
                            src={edit}
                            alt="Details"
                            style={{ width: "1rem", height: "1rem" }}
                          />
                        </Button>
                      </Link>
                    </td>

                    <td className={styles.centered}>
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
      {error && (
        <div>Can't get data from Firebase. Try to create a new factory.</div>
      )}
    </div>
  );
};

export default FactoriesList;
