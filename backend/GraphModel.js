var graphlib = require("@dagrejs/graphlib");
var Graph = graphlib.Graph;

const nodes = [
  {
    name: "step_1",
    value: {
      publish: "step_1_channel"
    },
    edgesTo: {
      step_2: {
        rules: {}
      }
    }
  },
  {
    name: "step_2",
    value: {
      publish: "step_2_channel"
    },
    edgesTo: {
      step_3: {
        rules: {}
      },
      step_4: {
        rules: {}
      }
    }
  },
  {
    name: "step_3",
    value: {
      publish: "step_3_channel"
    }
  },
  {
    name: "step_4",
    value: {
      publish: "step_4_channel"
    }
  }
];

class WorkflowGraph extends Graph {
  constructor(workflow_name, graph) {
    super({ directed: true });
    this.workflow_name = workflow_name;
  }

  make(graphschema) {
    // construct a graphschema for this instance
    // mock schema
    for (let i = 0, len = nodes.length; i < len; i++) {
      let node = nodes[i];
      this.setNode(node.name, node.value);
    }
    for (let i = 0, len = nodes.length; i < len; i++) {
      let node = nodes[i];
      for (let target in node.edgesTo) {
        this.setEdge(node.name, target, node.edgesTo[target]);
      }
    }
  }

  getGraph() {
    // get the entire graph
    return graphlib.json.write(this);
  }

  setNextNode(currentNode, NextNode) {
    // set the given NextNode's next proprerty to true
    // set the given currentNode's next property to false
  }

  setCurrent(previousNode, currentNode) {
    //set the given currentNode's current property to true
    //set the previousNode's current property to false
  }
}

module.exports = WorkflowGraph;
