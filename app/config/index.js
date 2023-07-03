const config = {
  app: {
    port: process.env.PORT || 8080,
  },
  db: {
    uri:
      process.env.MONGODB_URI ||
      // "mongodb://127.0.0.1:27017/akide"
      "mongodb+srv://tanghuynh09:5BtQp0eXByeX97Zw@cluster.4b1jlzb.mongodb.net/akide",
  },
};
// 5BtQp0eXByeX97Zw
module.exports = config;
