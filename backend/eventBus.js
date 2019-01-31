var WorkflowGraphUtils = require("./WorkflowGraphUtils");
var client = require("./redisclient");
var graphlib = require("@dagrejs/graphlib");
var redis = require("redis");

var subClient = redis.createClient();
var serviceDict = {
  step_1_channel: require("./step1Service").start
};
var eventBus = {
  workflow_start: function(identifier, socketCallback) {
    var self = this;
    // Find the workflowinstance using the workflow identifier provided in arguments
    // Find the fist node in the graph using graph.sources()
    subClient.on("message", (channel, msg) => {
      // console.log("channel in message", serviceDict[channel]);
      console.log("msg in message", msg);
      if (serviceDict[channel]) {
        serviceDict[channel]()
          .then(function(response) {
            console.log("response from start", response);
            // Do the same cycle
            if (response.emit) {
              socketCallback(response.data);
            }
            // self.decidenodes();
          })
          .catch(err => {
            console.log("err", err);
          });
      }
    });
    client.get(identifier, (err, res) => {
      var graphFromredis = graphlib.json.read(JSON.parse(res));
      self.workflow_instance = new WorkflowGraphUtils(graphFromredis);
      self.decidenodes();
    });
  },
  decidenodes: function() {
    var graph = this.workflow_instance.graph;
    var nextNode = graph.node(this.workflow_instance.next);
    if (this.workflow_instance.next) {
      subClient.subscribe(nextNode.publish);
    }
    this.workflow_instance.setCurrent(this.workflow_instance.next);
    var currentNode = graph.node(this.workflow_instance.current);
    console.log("currentNode", currentNode);
    var pubclient = redis.createClient();
    pubclient.publish(currentNode.publish, "wow");
  }
};
module.exports = eventBus;
