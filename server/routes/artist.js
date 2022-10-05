const router = require("express").Router()

// our artist model
const artist = require("../models/artist")

router.post("/save", async (req, res) => {
    const newArtist = artist({
        name: req.body.name,
        imageURL: req.body.imageURL,
        twitter: req.body.twitter,
        instagram: req.body.instagram
    });

    try {
     const savedArtist = await newArtist.save()
     return res.status(200).send({success : true, artist: savedArtist})
    } catch (error) {
        return res.status(400).send({success : false, msg: error})
    }
})

router.get("/getOne/:getOne", async (req, res) => {
    return res.json(req.params.id)
})

module.exports = router