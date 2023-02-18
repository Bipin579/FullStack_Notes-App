const express = require("express");
const { connection } = require("./db");
const userRoute = require("./routes/userRoute");
const cors = require("cors");
const authorization = require("./middleware/authrization");
const notesRoute = require("./routes/notesRoute");
require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoute);
app.use("/notes", authorization, notesRoute);



app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("DB started");
    } catch (error) {
        console.log(error);
    }
    console.log(`Sever is is running at port ${process.env.PORT}`);
});