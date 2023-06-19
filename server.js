const app = require("./app");
const MongoDB = require("./app/MongoDb");
const config = require("./app/config");

startServer = async () => {
  try {
    await MongoDB.connect(config.db.uri);
    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log("listening port :", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
