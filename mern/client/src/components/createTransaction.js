import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dropdown from 'react-bootstrap/Dropdown';

export default function Create() {

  const [form, setForm] = useState({
    agent_id: "",
    amount: "",

  });
 
  const [agent, setAgent] = useState("");
  const [agentList, setAgentList] = useState([{'_id':'','first_name':'', 'last_name':''}]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/record/`)
      const newData = await response.json();

      setAgentList(newData);
     
    };
    fetchData();
  }, [])

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

    await fetch("http://localhost:5000/api/transaction/add", {
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
    setAgent("");
    setForm({ agent_id: "", amount: "" });
      setTimeout(() => {
      window.location = "/"
      }, 3000);
  }

  const handleChange = (event) => {
    setAgent(event.target.value); 
    setForm({
      agent_id: event.target.value,
      amount:""
  
    })
    console.log(form)

  }


  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <center><h3>Create New Transaction</h3></center>
      <form onSubmit={onSubmit}>

      <div className="form-group">
        <label htmlFor="agent_id">Select Agent</label>

        <select className="form-control" value={agent} onChange={handleChange}>
          <option value="">Select Agent</option>
          {agentList.map(a => (
            <option value={a._id} key={a._id}>---- ID: {a._id} ---- NAME: {a.first_name} {a.last_name} ---- </option>

          ))

          }

        </select>
      </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            className="form-control"
            min="0"
            id="amount"
            value={form.amount}
            onChange={(e) => updateForm({ amount: e.target.value })}
            required
          />
        </div>


        <div className="form-group">
          <input
            type="submit"
            value="Create person"
            className="btn btn-danger"
            onClick={onSubmit}
          />

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
