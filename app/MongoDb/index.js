// const MongoClient = require("mongodb").MongoClient;
const mongoose  = require("mongoose")
class MongoDb {
  static connect = async (uri) => {
    if (this.client) return this.client;
    else {
      this.client = await mongoose.connect(uri);
      return this.client;
    }
  };
}
module.exports = MongoDb;
