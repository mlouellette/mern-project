import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Modal from 'react-bootstrap/Modal';

import Button from 'react-bootstrap/Button';

export default function RecordList() {
  
  const [show, setShow] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [records, setRecords] = useState([]);

  const handleClose = () => {
    setShow(false);
    setRecordToDelete(null);
  };

  const handleShow = (recordId) => {
    setShow(true);
    setRecordToDelete(recordId);
  };

  const Record = (props) => (
    <tr>
      <td>{props.record._id}</td>
      <td>{[props.record.first_name, " ", props.record.last_name]}</td>
      <td>{props.record.region}</td>
      <td>{props.record.fee}</td>
      <td>{props.record.rating}</td>
      <td>
        <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
          Edit
        </Link>{" "}
        |
        <button
          className="btn btn-link"
          onClick={() => handleShow(props.record._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
  
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          key={record._id}
          handleShowDeleteModal={handleShow}
        />
      );
    });
  }

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

    getRecords(); // call getRecords function
  }, []);

  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
    handleClose();
  }
  

  return (

    <div>
    
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning !</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Back
          </Button>
          <Button variant="danger" onClick={() => deleteRecord(recordToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <center>
        <h3>Agent List</h3>
      </center>
      <br />
      <a href="/create">
        <Button variant="danger" size="lg">
          Create New
        </Button>
      </a>

      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Region</th>
            <th>Fee</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
