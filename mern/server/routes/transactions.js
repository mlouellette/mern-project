const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const transactionRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
transactionRoutes.route("/").get(function (req, res) {
  let db_connect = dbo.getDb("rocketelevators");
  db_connect
    .collection("transactions")
    .find({})
    .sort({ _id: -1 })
    .limit(10)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
transactionRoutes.route("/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("transactions")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
transactionRoutes.route("/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    agent_id: req.body.agent_id,
    amount: req.body.amount,

  };
  db_connect.collection("transactions").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
transactionRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      region: req.body.region,
      fee: req.body.fee,
      rating: req.body.rating
    },
  };
  db_connect
    .collection("transactions")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
transactionRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("transactions").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = transactionRoutes;
