class WorkflowList {
  constructor() {}
  add(workflows) {
    // Takes a workflow list object an adds it to the existing workflow list
    if (!this.list) this.list = {};
    this.list = Object.assign({}, this.list, workflows);
  }
}

module.exports = WorkflowList;