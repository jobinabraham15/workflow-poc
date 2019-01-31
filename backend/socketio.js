var server = require('./server');
module.exports = require("socket.io")(server, {
    origins: "http://localhost:3001/"
  });