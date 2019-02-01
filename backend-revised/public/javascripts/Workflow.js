// Create a single workflow with the given config
// structure -
/**
 * {
 *  "workflow_name": {
 *      "actor_1": {
 *          "resolver": fn
 *      }
 *  }
 * }
 */
class Workflow {
  constructor(name) {
    this.name = name;
    this[name] = {};
  }

  addSteps(steps) {
    this[this.name].steps = steps;
  }

  startAt(step_name) {
    this[this.name].start = step_name;
  }
}

module.exports = Workflow;
