var app = require("./app");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var http = require("http");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// var http = require('http').Server(app);
var fs = require("fs");


var port = normalizePort(process.env.PORT || "3000");
var debug = require("debug")("backend:server");
app.set("port", port);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

indexRouter.post("/add_workflow_node", (req, response) => {
  let { node_name } = req.body;
  let graph = require("./graphInstance");
  graph
    .query(`CREATE (:actor{name:'${node_name}'})`)
    .then(res => {
      return graph.query(
        `MATCH (a:actor) WHERE a.name = '${node_name}' RETURN a`
      );
    })
    .then(res => {
      while (res.hasNext()) {
        let record = res.next();
        // console.log(record.getString("a.name"));
      }
      response.send({ workflow_added: true });
    })
    .catch(e => {
      console.log("error in adding to redis", e);
      // response.error(e);
    });
});
// // API - Get Chatters
// indexRouter.get("/get_chatters", function(req, res) {

//     // let graph = new RedisGraph('social');
//     // graph
//     // .query("CREATE (:person{name:'roi',age:32})")
//     // .then( () => {
//     //     return graph.query("CREATE (:person{name:'amit',age:30})");
//     // })
//     // .then( () => {
//     //     return graph.query("MATCH (a:person), (b:person) WHERE (a.name = 'roi' AND b.name='amit') CREATE (a)-[:knows]->(a)")
//     // })
//     // .then( () => {
//     //     return graph.query("MATCH (a:person)-[:knows]->(:person) RETURN a")
//     // })
//     // .then( (res) => {
//     //     while(res.hasNext()){
//     //         let record = res.next();
//     //         console.log(record.getString('a.name'));
//     //     }
//     //     console.log(res.getStatistics().queryExecutionTime());
//     // });
//     let graph = new RedisGraph('workflow');
//     graph.query("CREATE(:start{})")
//   res.send(chatters);
// });

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Store people in chatroom
var chatters = [];
// Store messages in chatroom
var chat_messages = [];

// Read credentials from JSON
// fs.readFile("redis-creds.json", "utf-8", function(err, data) {
//   if (err) throw err;
//   creds = JSON.parse(data);
//   client = redis.createClient();
//   // Redis Client Ready
//   client.once("ready", function() {
//     // Flush Redis DB
//     // client.flushdb();
//     let newWorkflowGraph = new WorkflowGraph();
//     newWorkflowGraph.make();
//     client.set("worklflow_graph", JSON.stringify(newWorkflowGraph.getGraph()), redis.print);
//     client.get("worklflow_graph", (err, res) => {
//       var graphFromredis = graphlib.json.read(JSON.parse(res));
//       console.log("graph after deserialize", graphFromredis.nodes());
//     });
//     // console.log("got from redis", client.get("sample_graph"));
//   });
// });

var server = http.createServer(app);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.on("error", onError);
server.on("listening", onListening);
module.exports = server.listen(port);
