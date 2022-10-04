const express = require("express")
const app = express()

const cors = require("cors")
const {default : mongoose} = require("mongoose")

app.use(cors({origin : true }))

app.get("/", (req, res) => {
    return res.json("Hiii")
})

// user authentication

const userRoute = require("./routes/auth");
// app.use("/api/users/", userRoute)
app.use("/api/users/", userRoute);

mongoose.connect("mongodb+srv://admin:admin@music.vyvvrmu.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser : true});
mongoose.connection
.once("open", () => console.log("Connected"))
.on("error", (error) => {
    console.log(`ERROR : ${error}`)
})

app.listen(4000, () => {console.log("Listening to port 4000.........")})

