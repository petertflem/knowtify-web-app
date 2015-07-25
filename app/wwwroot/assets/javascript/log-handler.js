(function () {
  var socket = io.connect(window.document.location.origin + '/logs');
  var enabledOptions = {
    'timestamp': true,
    'npm-module': true,
    'javascript-file': false,
    'function': false,
    'line-number': false,
    'log-level-debug': true,
    'log-level-info': true,
    'log-level-warning': true,
    'log-level-error': true,
    'log-level-fatal': true
  };

  socket.on('logs', function (data) {
    var div = document.createElement('div');
    div.className = 'logEntry';

    var message = document.createElement('span');
    message.innerHTML = ': ' + data.message;

    div.appendChild(createMetaDataElement('timestamp', 'timestamp', data.timestamp));
    div.appendChild(createMetaDataElement('log-level-' + data.level.toLowerCase(), data.level.toLowerCase(), data.level));
    div.appendChild(createMetaDataElement('npm-module', 'location-information npm-module', data.origin.npm_module));
    div.appendChild(createMetaDataElement('javascript-file', 'location-information javascript-file', data.origin.filename));
    div.appendChild(createMetaDataElement('function', 'location-information function', data.origin.function));
    div.appendChild(createMetaDataElement('line-number', 'location-information line-number', data.origin.lineNumnber));
    div.appendChild(message);

    document.getElementById('logs').appendChild(div);
  });

  $('.option').on('click', function () {
    toggleOption.call(this, $(this).data('option'));
  });

  function createMetaDataElement(metaDataName, cssClass, content) {
    var element = document.createElement('span');
    element.innerHTML = '[' + content + ']';
    element.className = cssClass + ' ' + metaDataName;
    element.style.display = enabledOptions[metaDataName]
      ? 'inline'
      : 'none';

    return element;
  }

  function toggleOption(optionName) {
    enabledOptions[optionName] = !enabledOptions[optionName];
    $(this).toggleClass('check');

    enabledOptions[optionName]
      ? $('.' + optionName).show()
      : $('.' + optionName).hide();
  }

  function toggleOptionCheckmarks() {
    loopObjectProperties(enabledOptions, function (optionEnabled, optionName) {
      optionEnabled
        ? $('[data-option="' + optionName + '"]').addClass('check')
        : $('[data-option="' + optionName + '"]').removeClass('check');
    });
  }

  function loopObjectProperties(obj, callback) {
    for (var key in obj) {
      callback(obj[key], key);
    }
  }

  toggleOptionCheckmarks();

})();
