require('dotenv').config()
const User = require(`./model`)
const { connect } = require(`mongoose`)
const { hash , compare } = require(`bcryptjs`)
const { sign } = require(`jsonwebtoken`)

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {

    await connect(process.env.MONGO_URL)
    // console.log("db connected")

    const checkexist = await User.exists({ email: email })

    if (checkexist) {
      res.json({
        message: "user already exists"
      })
    }
    else {
      await User.create({ username, email, password : await hash(password , 12)})
      console.log("success")
      res.json({
        message: "done"
      })
    }



  } catch (error) {

    res.json({
      message: "ERROR"
    })

  }


}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    await connect(process.env.MONGO_URL)

    const checkexistuser = await User.findOne({ email: email })

    if (!checkexistuser) {
      
      res.json({
        message: "user not found"
      })
    } 
    else {

      const decryptpass = await compare(password , checkexistuser.password )
      console.log(decryptpass)

      if(email==checkexistuser.email && decryptpass){

        const token = sign(
          {
            username : checkexistuser.username,
            id : checkexistuser._id,
            email : checkexistuser.email
          }
          ,
          process.env.JWT_SECRET
        )
          
        res.status(200).json({
          message : "successfully signed in",
          token : token
        })
      }
      else 
      {
        res.json({
          message : "invalid crednatials"
        })
      }

      res.status(200).json({
        user: checkexistuser
      })
    }

  } 
  catch (error) {
    
  }
  
}

module.exports = { signup, login }