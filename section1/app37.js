// NOTE: http is a core module
// global module
const http = require("http");
// non global module
const routes = require('./routes')

console.log(routes.someText)
const server = http.createServer(routes.handler);

server.listen(3000);
