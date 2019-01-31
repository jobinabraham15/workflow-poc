var redis = require("redis");
var client = "";
client = redis.createClient();
var WorkflowGraph = require("./GraphModel");
var graphlib = require("@dagrejs/graphlib");

client.once("ready", function() {
    // Flush Redis DB
    // client.flushdb();

    // console.log("got from redis", client.get("sample_graph"));
  });
  module.exports = client;

// fs.readFile("redis-creds.json", "utf-8", function(err, data) {
//     if (err) throw err;
//     creds = JSON.parse(data);
//     client = redis.createClient();
//     // Redis Client Ready
//     client.once("ready", function() {
//       // Flush Redis DB
//       // client.flushdb();
//       let newWorkflowGraph = new WorkflowGraph();
//       newWorkflowGraph.make();
//       client.set("worklflow_graph", JSON.stringify(newWorkflowGraph.getGraph()), redis.print);
//       client.get("worklflow_graph", (err, res) => {
//         var graphFromredis = graphlib.json.read(JSON.parse(res));
//         console.log("graph after deserialize", graphFromredis.nodes());
//       });
//       // console.log("got from redis", client.get("sample_graph"));
//     });
//   });