/**
 * Given a workflow name, coordinate events across that workflow
 */
let workflowList = require("../../workflows.config");
class EventBus {
  constructor(name, socket) {
    // if (workflowList[workflow]) {
    //   this.workflow = workflowList[workflow];
    // } else {
    //   throw new Error("No workflow with the given name exists");
    // }
    this.workflow_name = name;
    this.emit = socketCallback;
  }

  start(data) {
    if (workflowList.list[this.name]) {
      const workflowStart = workflowList.list[this.name].start;
      const startingStep = workflowList.list[this.name].steps[workflowStart];
      const returnedData = startingStep.resolver(data);
      setTimeout(() => {
        this.emit(data);
      }, Math.random() * (10000 - 1000) + 1000);
    }
  }
  publish() {
    // Redis client 
  }
}

module.exports = EventBus;
