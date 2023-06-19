const route = require("./app/route");
const cors = require("cors");
const express = require("express");
const ApiError = require("./app/api.error");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", route);

app.use((req, res, next) => {
  return next(res.send(new ApiError(404, "Not Found")));
});
module.exports = app;
