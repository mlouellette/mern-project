import React, { useState } from "react";
import { useNavigate } from "react-router";

//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Modal from 'react-bootstrap/Modal';

import Button from 'react-bootstrap/Button';

export default function Create() {

  const [show, setShow] = useState(false);
  const [recordToCreate, setRecordToCreate] = useState(null);
  const [records, setRecords] = useState([]);

  // modal 
  const handleClose = () => {
    setShow(false);
    setRecordToCreate(null);
  };

  const handleShow = (recordId) => {
    setShow(true);
    setRecordToCreate(recordId);
  };

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    region: "",
    fee: "",
    rating: ""
  });
  
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
  e.preventDefault();

  // When a post request is sent to the create url, we'll add a new record to the database.
  const newPerson = { ...form };

  await fetch("http://localhost:5000/record/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPerson),
  })
  .catch(error => {
    window.alert(error);
    return;
  });
  
  toast.success('Sent Successfully', {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });

  setForm({ first_name: "", last_name: "", region: "", fee: "", rating: "" });
  setTimeout(() => {
    window.location = "/"
    }, 3000);
  }


  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <center><h3>Create New Record</h3></center>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            value={form.first_name}
            onChange={(e) => updateForm({ first_name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.last_name}
            onChange={(e) => updateForm({ last_name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Fee</label>
          <input
            type="number"
            className="form-control"
            id="fee"
            value={form.fee}
            onChange={(e) => updateForm({ fee: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Rating</label>
          <input
            type="number"
            className="form-control"
            id="fee"
            value={form.rating}
            onChange={(e) => updateForm({ rating: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="regionOptions"
              id="regionNorth"
              value="North"
              checked={form.region === "North"}
              onChange={(e) => updateForm({ region: e.target.value })}
              defaultChecked
            />
            <label htmlFor="regionNorth" className="form-check-label">North</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="regionOptions"
              id="regionSouth"
              value="South"
              checked={form.region === "South"}
              onChange={(e) => updateForm({ region: e.target.value })}
            />
            <label htmlFor="regionSouth" className="form-check-label">South</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="regionOptions"
              id="regionEast"
              value="East"
              checked={form.region === "East"}
              onChange={(e) => updateForm({ region: e.target.value })}
              
            />
            <label htmlFor="regionEast" className="form-check-label">East</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="regionOptions"
              id="regionWest"
              value="West"
              checked={form.region === "West"}
              onChange={(e) => updateForm({ region: e.target.value })}
            />
            <label htmlFor="regionWest" className="form-check-label">West</label>
          </div>
        </div>

        <Button variant="danger" onClick={handleShow}>
            Submit
          </Button>

        <div className="form-group">


        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>All done !</Modal.Title>
                </Modal.Header>
                <Modal.Body>Confirm new agent ?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Back
                  </Button>
                <input
                  type="submit"
                  value="Create person"
                  className="btn btn-danger"
                  onClick={onSubmit}

                />
                </Modal.Footer>
              </Modal>

            <ToastContainer
							position="bottom-center"
							autoClose={3000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="colored"
							/>
        </div>
      </form>
    </div>
  );
}
