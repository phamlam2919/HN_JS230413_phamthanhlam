const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

// import routes
const userRoutes = require("./routes/users.routes");

// Sử dụng các packages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

// set up routes
app.use("/api/v1/users", userRoutes);

// Server listen on port
app.listen(3000, () => {
    console.log("Server listen on http://localhost:3000/");
});
