var redis = require("redis");
var client = "";
client = redis.createClient();

client.once("ready", function() {
  console.log("redis ready...");
});
module.exports = client;
