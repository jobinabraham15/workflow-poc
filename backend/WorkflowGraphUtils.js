var graphlib = require("@dagrejs/graphlib");
class WorkflowGraphUtils {
  constructor(graph) {
    this.graph = graph;
    this.next = this.graph.sources()[0];
    this.current = null;
  }

  getGraph() {
    // get the entire graph
    return graphlib.json.write(this);
  }

  setNextNode(node) {
    // set the given NextNode's next proprerty to true
    // set the given currentNode's next property to false
  }

  setCurrent(node) {
    //set the given currentNode's current property to true
    //set the previousNode's current property to false
    this.current = node;
  }
}

module.exports = WorkflowGraphUtils;
