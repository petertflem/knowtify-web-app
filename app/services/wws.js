var WebSocketServer = require("ws").Server;
var connections = {
  subscriptions: {},
  noSubscription: {}
};
var connectionIdCounter = 0;

module.exports.init = function(server) {
  var wss = new WebSocketServer({ server: server });

  wss.on('connection', function (ws) {
    var connectionId = connectionIdCounter++;
    var connectionSubscription = '';

    connections.noSubscription[connectionId] = ws;

    ws.on('close', function () {
      console.log('CLOSED');
    });

    ws.on('message', function (data, flags) {
      data = JSON.parse(data);

      if (!data.subscribe)
        return;

      connectionSubscription = data.subscribe;
      var currentWebSocket = connections.noSubscription[connectionId];

      if (typeof connections.subscriptions[connectionSubscription] !== 'object')
        connections.subscriptions[connectionSubscription] = {};

      connections.subscriptions[connectionSubscription][connectionId] = currentWebSocket;
      delete connections.noSubscription[connectionId];
    });

    ws.on('close', function () {
      if (connectionSubscription) {
        delete connections.subscriptions[connectionSubscription][connectionId];
      } else {
        delete connections.noSubscription[connectionId];
      }
    });
  });
};

module.exports.publish = function (targetSubscription, message) {
  if (typeof connections.subscriptions[targetSubscription] !== 'object')
    return;

  loopObejctProperties(connections.subscriptions[targetSubscription], function (ws) {
    ws.send(message);
  });
};

function loopObejctProperties(obj, callback) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      callback(obj[key]);
    }
  }
}

/*function printKeys(obj) {
  for (var key in obj)
    if(obj.hasOwnProperty(key))
      console.log(key);
}*/
