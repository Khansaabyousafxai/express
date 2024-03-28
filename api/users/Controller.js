require('dotenv').config()
const signup = async (req, res) => {
    const {username ,password ,email} = req.body;
    res.json({
        message : "done"
    })
  }

const login = async (req, res) =>{
    const {email, password} = req.body;
    res.json({
        message : "done"
    })
    }

  module.exports = {signup , login}