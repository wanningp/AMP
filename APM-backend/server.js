const express = require("express"); //import the express dependency
const bodyParser = require("body-parser");
const cors = require("cors");
const Sequelize = require("sequelize");
const userController = require("./Controllers/userController");
const userJournalController = require("./Controllers/userJournalController");
const db = require("./Models");
const userJournalModel = require("./Models/userJournal.model");
const BudgetModel = require("./Models/budget.model");

const app = express(); //Instantiate an express app, the main work horse of this server
const port = process.env.PORT || 8000; //Save the port number where your server will be listening
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

const Budget = BudgetModel(db.sequelize, Sequelize.DataTypes);
const userJournal = userJournalModel(db.sequelize, Sequelize.DataTypes);

db.sequelize.sync();

//Idiomatic expression in express to route and respond to a client reques
app.get("/", function (req, res) {
  //get request to the root("/"") will route here
  res.sendFile("index.html", { root: __dirname }); //server responds by sending the index.html file to the client's browser
}); // the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile
app.post("/api/auth/signin", userController.loginUser);
//route to handle user registration
app.post("/api/users", userController.createUser);
app.get("/api/checkUserExist/:email", userController.checkUserExist);

app.post("/auth/userDashboard", userController.userDashboard);
app.post("/auth/userCreateJournal", userJournalController.createJournalEntry);

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port:{port}
  console.log(`Now listening on port ${port}`);
});
