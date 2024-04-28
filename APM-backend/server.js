const dotenv = require("dotenv");
dotenv.config();
const express = require("express")
const https = require('https')
var http = require('http');

const fs = require('fs')

const path = require("path");
const certPath = path.join(__dirname, '../certifications', 'server.crt');
const certKeyPath = path.join(__dirname, '../certifications', 'server.key');

const app = express();

const PORT = 8001;
const port = process.env.PORT||PORT;//Save the port number where your server will be listening
 
https.createServer({
  key: fs.readFileSync(certKeyPath),
  cert: fs.readFileSync(certPath)
}, app).listen(port);



//import the express dependency

const bodyParser = require("body-parser");
const cors = require("cors");
const Sequelize = require("sequelize");
const userController = require("./Controllers/userController");
const userJournalController = require("./Controllers/userJournalController");
const db = require("./Models");
const userJournalModel = require("./Models/userJournal.model");
const BudgetModel = require("./Models/budget.model");


 //Instantiate an expresss app, the main work horse of this server

app.use(cors(['http://localhost:3000']));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

