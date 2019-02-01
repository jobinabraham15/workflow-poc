const EventBus = require("./EventBus");
class SocketBus extends EventBus {
    constructor(workflow_name, callback){
        super(workflow_name, callback);
    }
}