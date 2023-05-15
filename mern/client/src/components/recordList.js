import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Record = (props) => (
  <tr>
    <td>{props.record._id}</td>
    <td>{[props.record.first_name, " ", props.record.last_name]}</td>
    <td>{props.record.region}</td>
    <td>{props.record.fee}</td>
    <td>{props.record.rating}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return; 
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
    <Card>
      <Card.Header as="h5">Agents</Card.Header>
      <Card.Body>
        <Card.Text>
          Page with all the infos of our agents
        </Card.Text>
        <a href="/main">
            <Button variant="danger">Go to agents</Button>
        </a>
      </Card.Body>
    </Card>
    <br />


    <Card>
      <Card.Header as="h5">Transactions</Card.Header>
      <Card.Body>
        <Card.Text>
          List of our transactions and create a new one
        </Card.Text>
        <a href="/transaction">
            <Button  variant="danger">Go to transactions</Button>
        </a>
      </Card.Body>
    </Card>

    </div>
  );
}
