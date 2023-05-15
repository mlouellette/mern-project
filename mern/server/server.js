require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// Importing route modules
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transactions");

// Importing middleware modules
app.use(cors());
app.use(express.json());

// Importing and invoking database connection function
const connection = require("./db/db");
connection();

// Registering route modules with the app
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/transaction", transactionRoutes);
app.use(require("./routes/record"));

// Importing and invoking function to get a database driver connection
const dbo = require("./db/conn");

// Starting the server and connecting to the database driver
app.listen(port, () => {
  // Connect to the database server when the server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});
