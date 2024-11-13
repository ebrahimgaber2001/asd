const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
var cors = require("cors");

const DatabaseConnection = require("./config/DatabaseConnection");
// routing links
const governorateRoute = require("./routes/governorateRoute");
const cityRoute = require("./routes/cityRoute");
const tableRoute = require("./routes/tableRoute");
const authRoute = require("./routes/authRoute");


const AppError = require("./utils/AppError");
const globalError = require("./middleware/ErrorMiddleware");

// server
const app = express();
const port = process.env.PORT;

// cors
app.use(cors());

// connect to DB
DatabaseConnection();

//asdsd
// middleware for make request as json
app.use(express.json());



// middleware for api in dev mode
if (process.env.MODE === "dev") {
  app.use(morgan("dev"));
}



// routing
app.use("/api/v1/governorate", governorateRoute);
app.use("/api/v1/city", cityRoute);
app.use("/api/v1/table", tableRoute);
app.use("/api/v1/auth", authRoute);



// middleware for wrong routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find this route: ${req.originalUrl}`, 404));
});

// global middleware for error
app.use(globalError);

app.listen(port, () => console.log(`server running on port ${port}`));
