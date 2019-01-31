var io = require("./socketio");
var redisClient = require("./redisclient");
var WorkflowGraph = require("./GraphModel");
var uniqueId = require("short-uuid");
var redis = require("redis");
const jsonXml = {
  declaration: { attributes: { version: "1.0", encoding: "utf-8" } },
  elements: [
    {
      type: "element",
      name: "a",
      attributes: { x: "1.234", y: "It's" }
    }
  ]
};

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="cdcatalog.xsl"?>
<catalog>
  <cd>
    <title>Empire Burlesque</title>
    <artist>Bob Dylan</artist>
    <country>USA</country>
    <company>Columbia</company>
    <price>10.90</price>
    <year>1985</year>
  </cd>
</catalog>`;

io.on("connection", function(socket) {
  // Fire 'send' event for updating Message list in UI
  //   socket.on("message", function(data) {
  //     io.emit("send", data);
  //   });
  //   // Fire 'count_chatters' for updating Chatter Count in UI
  //   socket.on("update_chatter_count", function(data) {
  //     io.emit("count_chatters", data);
  //   });
  socket.on("workflow", (data, callback) => {
    if (data && data.workflow_name) {
      let newWorkflowGraph = new WorkflowGraph();
      newWorkflowGraph.make();
      redisClient.set(
        "worklflow_graph",
        JSON.stringify(newWorkflowGraph.getGraph())
        // redis.print
      );

      redisClient.get(data.workflow_name, (err, res) => {
        // Create a workflow for this instance
        let newWorkflowGraph = new WorkflowGraph();
        newWorkflowGraph.make();
        let id = uniqueId.generate();
        redisClient.set(
          "worklflow_graph_" + id,
          JSON.stringify(newWorkflowGraph.getGraph()),
          (err, res) => {
            require("./eventBus").workflow_start(
              "worklflow_graph_" + id,
              function(data) {
                console.log("workflow step", data);
                socket.emit("workflow_step_" + id, xml);
              }
            );
          }
        );
        callback("workflow_step_" + id);
        // socket.emit("workflow_step_" + id, xml);
      });
    }
  });
});
