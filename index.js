const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const userRoute = require("./routes/user");
const authentificationRoute = require("./routes/authentification");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const cors = require("cors")
dotenv.config();

mongoose
    .connect(process.env.MONGO_LINK)
    .then(()=>console.log("DB SUCCESSULL"))
    .catch((err) => {
        console.log(err);
    });


app.use(cors());

app.use(express.json());
app.use("/api/users",userRoute);
app.use("/api/authentification",authentificationRoute);
app.use("/api/products",productRoute);
app.use("/api/cart",cartRoute);
app.use("/api/orders",orderRoute);

app.listen(process.env.PORT || 6000, () => {
    console.log('backend server running');

});