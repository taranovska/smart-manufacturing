import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Spinner, Table } from "react-bootstrap";
import styles from "./FactoriesList.module.css";
import edit from "../img/edit.png";
import remove from "../img/remove.png";

const FactoriesList = () => {
  const headers = [
    "#",
    "name",
    "description",
    "latitude/longitude",
    "status",
    "address",
  ];
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "https://my.api.mockaroo.com/smart_manufacturing.json?key=a252b490"
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);
  console.log(data[0]?.id);

  return (
    <div>
      {loading && (
        <div className={styles.spinner}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {data && !loading && (
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
                    <Button variant="info" href="#">
                      <img
                        src={edit}
                        alt="Details"
                        style={{ width: "1rem", height: "1rem" }}
                      />
                    </Button>
                  </td>
                  <td>
                    <Button variant="link" href="#">
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
    </div>
  );
};

export default FactoriesList;
