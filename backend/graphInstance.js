var RedisGraph = require("./node_modules/redisgraph.js/src/redisGraph");
let graph = new RedisGraph('workflow');
module.exports = graph;