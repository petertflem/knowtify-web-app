var loggingStream = require('../services/loging-stream');

module.exports = function (app) {

  /*
   * POST: /api/logs
   */
  app.post('/api/logs', function (req, res) {
    loggingStream.sendLogs(req.body.data);
    res.sendStatus(200);
  });

};
