var io = require('socket.io');
var ioLogs;

module.exports.init = function (server) {
  ioLogs = io(server).of('/logs');
};

module.exports.sendLogs = function (data) {
  ioLogs.emit('logs', data);
};
