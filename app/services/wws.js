var WebSocketServer = require("ws").Server;

module.exports.init = function(server) {
  var wss = new WebSocketServer({ server: server });
  console.log(server.address());
  wss.on('connection', function (ws) {
    console.log(ws.upgradeReq.headers.origin);
    ws.on('message', function (data, flags) {
      data = JSON.parse(data);
      console.log('[' + data.timestamp + '][' + data.level + '][' + data.origin.npm_module + '][' + data.origin.filename + '] ' + data.message);
    });
  });
}
