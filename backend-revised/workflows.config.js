const Workflow = require("./public/javascripts/Workflow");
const WorkflowList = require("./public/javascripts/WorkflowList");
let workflow_1 = new Workflow("workflow_1");
let steps = {
  step_1: {
    type: "emitter",
    resolver: function(data) {
      // Do something with data
      console.log("resolver for step_1", data);
      return data;
    }
  },
  step_2: {
    type: "publisher"
  }
};
workflow_1.addSteps(steps);
workflow_1.startAt("step_1");
let list = new WorkflowList();
list.add(workflow_1);
module.exports = list;
