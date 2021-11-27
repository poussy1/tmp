const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const userRoute = require("./routes/user");
const authentificationRoute = require("./routes/authentification");

dotenv.config();

mongoose
    .connect(process.env.MONGO_LINK)
    .then(()=>console.log("DB SUCCESSULL"))
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use("/api/users",userRoute);
app.use("/api/authentification",authentificationRoute);


app.listen(process.env.PORT || 6000, () => {
    console.log('backend server running')
});