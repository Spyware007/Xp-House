const express = require("express");
const expressValidator = require("express-validator");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
// const categoryRoutes = require("./routes/category");
// const productRoutes = require("./routes/product");
// const braintreeRoutes = require("./routes/braintree");
const cors = require("cors");

// app
const app = express();
const port = process.env.PORT || 8001;

mongoose.connect(process.env.DATABASE).then(() => {
  console.log("DB Connected");
});

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// Routes middlerware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
// app.use("/api", categoryRoutes);
// app.use("/api", productRoutes);
// app.use("/api", braintreeRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
