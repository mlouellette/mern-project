import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// We import all the components we need in our app
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Main from "./components/welcome/main";
import Transaction from "./components/welcome/transaction";
import CreateTransaction from "./components/createTransaction";

const App = () => {
  // Check if there is a user token in the local storage
  const user = localStorage.getItem("token");
  return (
    <div>
      {/* Show the navbar only if there is a user */}
      {user && <Navbar />}
      <div style={{ margin: 20 }}>
        <Routes>
          {/* If there is a user, display the RecordList component at the root route */}
          {user && <Route path="/" exact element={<RecordList />} />}
          {/* Display the Signup component at /signup */} 
          <Route path="/signup" exact element={<Signup />} />
          {/* Display the Login component at /login */}
          <Route path="/login" exact element={<Login />} />
          {/* If no valid route is found, redirect to /login */}
          <Route path="/" element={<Navigate replace to="/login" />} />
          {/* Display the Edit component at /edit/:id */}
          <Route path="/edit/:id" element={<Edit />} />
          {/* Display the Create component at /create */} 
          <Route path="/create" element={<Create />} />
          <Route path="/main" element={<Main />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/createTransaction" element={<CreateTransaction />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
