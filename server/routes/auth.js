const router = require("express").Router();

router.get("/login",(req, res) => {
    return res.json("Login")
})

module.exports = router