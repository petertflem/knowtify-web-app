(function ($) {
  var host = window.document.location.host.replace(/:.*/, '');
  var ws = new WebSocket('ws://' + host + ':5000');
  var pingId;

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);
    var parsedMessage = '[' + data.timestamp + '][' + data.level + '][' + data.origin.npm_module + '][' + data.origin.filename + '][' + data.origin.function + '][' + data.origin.lineNumnber + ']: ' + data.message;
    var div = document.createElement('div');
    div.innerHTML = parsedMessage;
    $('#logs').append(div);
  };

  ws.onopen = function () {
    ws.send(JSON.stringify({subscribe: "logs"}));
    //pingId = setInterval(function () { ws.ping(); }, 20000);
  };

  ws.onclose = function () {
    consle.log('connection closed');
    //clearInterval(pingId);
  };

})(jQuery);
