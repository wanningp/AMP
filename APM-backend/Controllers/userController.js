const db = require("../Models");
const bcrypt = require("bcrypt");
const config = require("../config.js");
const jwt = require("jsonwebtoken");
const Op = db.Sequelize.Op;

class userController {
  static async checkUserExist(req, res) {
    try {
      const { email } = req.params;
      const user = await db.user.findOne({ where: { email: email } });

      res.json({ exists: !!user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  static async createUser(req, res) {
    try {
      const oldUser = await db.user.findOne({
        where: { email: req.body.email },
      });
      if (oldUser) {
        return res.send({ error: "User exists" });
      }
      const { name, email, password } = req.body;

      // Hash the password using bcrypt
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      const newUser = await db.user.create({
        name: name,
        email: email,
        password: hash,
      });
      res.status(201).json(newUser);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to create user", error: error.message });
    }
  }

  static async loginUser(req, res) {
    try {
      const User = db.user;
      const user = await User.findOne({ where: { email: req.body.email } });
      
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          //   algorithm: "HS256",
          //   allowInsecureKeySizes: true,
          expiresIn: "24h", // 24 hours
        }
      );

      if (res.status(201)) {
        return res.json({
          status: "ok",
          data: token,
          email: user.email,
          user: user.id,
        });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to login", error: error.message });
    }
  }

  static async userDashboard(req, res) {
    try {
      const token = await req.headers.authorization.split("Bearer ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      const useremail = user.email;
      console.log("User Email:", useremail);
      const data = await db.user
        .findOne({ where: { email: useremail } })
        .then((data) => {
          res.send({ status: "ok", data: data });
        })
        .catch((error) => {
          res.send({ status: "error", data: error });
        });
      console.log("User data:", data);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Cannot access page", error: error.message });
    }
  }
}

module.exports = userController;
