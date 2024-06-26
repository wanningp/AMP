const db = require("../Models");
const bcrypt = require("bcrypt");
const config = require("../config.js");
const jwt = require("jsonwebtoken");
const Op = db.Sequelize.Op;

class userJournalController {
  static async createJournalEntry(req, res) {
    try {
      const token = await req.headers.authorization.split("Bearer ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      if (!user) {
        return res.send({ status: "Forbidden", data: error });
      }

      const { content, user_id, title } = req.body;
      const newEntry = await db.journalEntries.create({
        content: content,
        user_id: user_id,
        title: title,
      });
      return res.json({status:"201",entry:newEntry});
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to create new entry", error: error.message });
    }
  }
  static async seeAllJournalEntries(req,res){
    try{
      const token =await req.headers.authorization.split("Bearer ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      if(!user){
        res.send({status:"Forbidden",data:error});
      }

      const allJournalEntries=await db.journalEntries.findAll({
        include:[
          {
            model:db.user,
            as:'user'
          }
        ]
      });
      return res.json({status:"201",entry:allJournalEntries});



    }catch(error){
      return res.status(500).json({message:"Failed to retrieve",error:error.message});
    }
  }
}
module.exports = userJournalController;
