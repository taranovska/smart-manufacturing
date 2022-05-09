import React, { useEffect, useState } from "react";
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
import SpinnerComponent from "./SpinnerComponent";
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

  const dispatch = useDispatch();
  const { data, error, query, loading } = useSelector((state) => state);
  const [filteredData, setFilteredData] = useState([]);
  const factoriesCollection = collection(db, "factories");

  const updateFactoryLocation = async (id, updateAddress) => {
    const factoryDoc = doc(db, "factories", id);
    await updateDoc(factoryDoc, {
      address: [...updateAddress],
    });
  };

  const deleteLocation = (id, index, address, item) => {
    const updateAddress = address.filter((obj) => obj !== item);
    !error && updateFactoryLocation(id, updateAddress);
    dispatch({
      type: DEACTIVATE_EXISTING_LOCATION,
      payload: { id, updateAddress, index, item },
    });
  };

  const getFactories = async () => {
    dispatch(fetchDataRequest());
    try {
      const dataFromFirebase = await getDocs(factoriesCollection);
      const data = dataFromFirebase.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(fetchDataSuccess(data));
      setFilteredData(data);
    } catch (error) {
      dispatch(fetchDataError(error));
    }
  };

  const deleteFactory = async (id) => {
    const factoryDoc = doc(db, "factories", id);
    !error && (await deleteDoc(factoryDoc));
    dispatch({ type: DISMISS_FACTORY_DATA, payload: id });
  };
  useEffect(() => {
    getFactories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter(
        (val) =>
          query === "" ||
          val.name.toLowerCase().includes(query.toLowerCase().trim())
      )
    );
  }, [query]);

  return (
    <div>
      {loading && <SpinnerComponent />}
      {data.length > 0 && !loading && filteredData.length > 0 && (
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
              .filter(
                (val) =>
                  query === "" ||
                  val.name.toLowerCase().includes(query.toLowerCase().trim())
              )
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((factory, index) => {
                const {
                  id,
                  name,
                  description,
                  latitude,
                  longitude,
                  status,
                  address,
                } = factory;

                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{description}</td>
                    <td>{`${latitude} / ${longitude}`}</td>
                    <td>{status}</td>
                    <td>
                      {address.map((item, index) => {
                        return (
                          <div key={index} className={styles.addressWrapper}>
                            <div
                              className={styles.address}
                            >{`${item.country}, ${item.city}, ${item.street}, ${item.zipCode}`}</div>
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
                        <Link
                          to={`/newLocation/${id}`}
                          className={styles.addLocation}
                        >
                          <Button
                            variant="primary"
                            className={styles.btnAddLocation}
                          >
                            <img
                              src={add}
                              alt="add location"
                              style={{ width: "0.9rem", height: "0.9rem" }}
                            ></img>
                            <div className={styles.addTitle}>add location</div>
                          </Button>
                        </Link>
                      </div>
                    </td>
                    <td>
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
                    <td>
                      <Button
                        variant="link"
                        onClick={() => {
                          deleteFactory(id);
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
      {!loading && data.length > 0 && filteredData.length === 0 && query && (
        <div>No matched factories...</div>
      )}
      {error && (
        <div>Can't get data from Firebase. Try to create a new factory.</div>
      )}
    </div>
  );
};

export default FactoriesList;
