(function () {
  var socket = io.connect(window.document.location.origin + '/logs');
  var npmModules = {};

  socket.on('logs', function (data) {
    var div = document.createElement('div');
    div.className = 'logEntry';

    var message = document.createElement('span');
    message.innerHTML = '$ ' + data.message;

    div.appendChild(createMetaDataElement('timestamp', '', data.date + ' ' + data.time));

    var logLevel = createMetaDataElement('log-level', data.logLevel, data.logLevel.toUpperCase());
    logLevel.setAttribute('data-filter', data.logLevel);
    div.appendChild(logLevel);

    var npmModule = createMetaDataElement('npm-module', 'location-information', data.origin.npmModule);
    npmModule.setAttribute('data-npm-module-name', data.origin.npmModule);
    div.appendChild(npmModule);

    div.appendChild(createMetaDataElement('javascript-file', 'location-information', data.origin.filename));
    div.appendChild(createMetaDataElement('function', 'location-information', data.origin.fn));
    div.appendChild(createMetaDataElement('line-number', 'location-information', data.origin.lineNumnber));
    div.appendChild(message);

    if (!npmModules[data.origin.npmModule]) {
      npmModules[data.origin.npmModule] = true;
      var npmModuleToggle = document.createElement('div');
      npmModuleToggle.innerHTML = data.origin.npmModule;
      npmModuleToggle.className = 'check';

      $(npmModuleToggle).on('click', function () {
        $('[data-npm-module-name="' + data.origin.npmModule + '"]').parent().toggle();
        $(this).toggleClass('check');
      });

      $('.npm-module').append(npmModuleToggle);
    }

    document.getElementById('logs').appendChild(div);
  });

  $('.metadata div').on('click', function () {
    $('[data-meta="' + $(this).data('toggle-meta') + '"]').toggle();
    $(this).toggleClass('check');
  });

  $('.logging-level div').on('click', function() {
    $('.logs [data-filter="' + $(this).data('filter') + '"]').parent().toggle();
    $(this).toggleClass('check');
  });

  function createMetaDataElement(metaDataName, cssClass, content) {
    var element = document.createElement('span');
    element.innerHTML = '[' + content + ']';
    element.className = cssClass;
    element.setAttribute('data-meta', metaDataName);
    element.style.display = $('[data-toggle-meta="' + metaDataName + '"]').hasClass('check')
      ? 'inline'
      : 'none';

    return element;
  }

})();
