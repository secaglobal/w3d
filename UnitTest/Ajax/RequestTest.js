Space.require('Space.Ajax');
Space.require('Space.Ajax.Request');

(function () {
  test('Test Ajax.Request', TestCase({
    setUp: function() {
      Space.Ajax.setRequestFactory(null);
    },

    afterTearDown: function() {
      Space.Ajax.setRequestFactory(null);
    },

    testSend: function() {
      var args, sent;
      var mockedHandler = {
        open: function() { args = arguments; },
        send: function() { sent = true; }
      };

      Space.Ajax.setRequestFactory(function () {return mockedHandler;});

      var req = new Space.Ajax.Request({
        url: '/test/fake/req/simple.php',
        get: {test1: 1, test2: 2},
        isAsync: false
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