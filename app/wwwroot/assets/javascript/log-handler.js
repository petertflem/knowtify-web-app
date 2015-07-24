(function ($) {

  var host = window.document.location.host.replace(/:.*/, '');
  var socket = io.connect('http://' + host + ':5000/logs');

  socket.on('logs', function (data) {
    var parsedMessage = '[' + data.timestamp + '][' + data.level + '][' + data.origin.npm_module + '][' + data.origin.filename + '][' + data.origin.function + '][' + data.origin.lineNumnber + ']: ' + data.message;
    var div = document.createElement('div');
    div.innerHTML = parsedMessage;
    $('#logs').append(div);
  });

})(jQuery);
