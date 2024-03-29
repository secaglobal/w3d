w3d.require('w3d.ajax');
w3d.require('w3d.ajax.request');

(function () {
  test('Test Ajax.Request', TestCase({
    setUp: function() {
      w3d.ajax.setRequestFactory(null);
    },

    afterTearDown: function() {
      w3d.ajax.setRequestFactory(null);
    },

    testSend: function() {
      var args, sent;
      var mockedHandler = {
        open: function() { args = arguments; },
        send: function() { sent = true; }
      };

      w3d.ajax.setRequestFactory(function () {return mockedHandler;});

      var req = new w3d.ajax.Request({
        url: '/test/fake/req/simple.php',
        get: {test1: 1, test2: 2},
        isAsync: false,
      });

      req.send();

      deepEqual(
        args,
        {0: 'GET', 1: '/test/fake/req/simple.php?test1=1&test2=2', 2: false},
        'Request should pass correct params into XMLHttpRequest.open'
      );
      ok(sent, 'Request should be sent');
    }
  }));
})();