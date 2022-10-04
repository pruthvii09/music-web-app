const router = require("express").Router();

const user = require("../models/user")

const admin = require("../config/firebase.config")

router.get("/login", async (req, res) => {
    if(!req.headers.authorization){
        return res.status(500).send({message : "Invaid Token"})
    }

    const token = req.headers.authorization.split(" ")[1]
    // return res.send(token)
    try {
        const decodeValue = await admin.auth().verifyIdToken(token)
        if(!decodeValue){
        return res.status(505).json({message : "Un Authorized"})
        }else{
            // Checking if user Exist or not
            const userExist = await user.findOne({"user_id" : decodeValue.user_id})
            if(!userExist){
                newUserData(decodeValue, req, res)
            }else{
                return res.send("Update user")
            }
        }
    } catch (error) {
        return res.status(505).json({message : "error"})
    }
})

const newUserData = async (decodeValue, req, res) => {
    const newUser = new user({
        name : decodeValue.name,
        email : decodeValue.email,
        imageURL : decodeValue.imageURL,
        user_id : decodeValue.user_id,
        email_verified : decodeValue.email_verified,
        role : "member",
        auth_time : decodeValue.auth_time
    })
    try {
        const savedUser = await newUser.save()
        res.status(200).send({user : savedUser})
    } catch (error) {
        res.status(400).send({success : false, msg : error})
    }
}

module.exports = router