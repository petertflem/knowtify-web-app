var wws = require('../services/wws');

module.exports = function (app) {

  /*
   * POST: /api/logs
   */
  app.post('/api/logs', function (req, res) {
    wws.publish(req.body.publishTargets, JSON.stringify(req.body.data));
    res.sendStatus(200);
  });

};
