const io = require("./socketio");
const uniqueId = require("short-uuid");
const SocketBus = require("./public/javascripts/SocketBus");
io.on("connection", function(socket) {
  socket.on("workflow", (workflow_name, data, callback) => {
    let id = uniqueId.generate();
    if (workflow_name) {
      let uniqueWorkflowName = "worklflow_" + id;
      callback(uniqueWorkflowName);
      const bus = new SocketBus(
        workflow_name,
        socket.emit(uniqueWorkflowName, actionData, nextEvent)
      );
      socket.on(uniqueWorkflowName, function(data, nextEvent) {
        bus.publish(data, event);
      });
      bus.start();
      // socket.emit(uniqueWorkflowName, {something:"some"});
      // Create a unique id for this workflow
      // Send the workflow name to the eventbus
      // callback acknowledgement with workflow_id
    }
  });
});
