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
      var args, sent, calledback = false;
      var mockedHandler = {
        open: function() { args = arguments; },
        send: function() {
          sent = true;
          this.readyState = 4;
          this.status = 200;
          this.onreadystatechange();
        }
      };

      Space.Ajax.setRequestFactory(function () {return mockedHandler;});

      var req = new Space.Ajax.Request({
        url: '/test/fake/req/simple.php',
        params: {test1: 1, test2: 2},
        isAsync: false,
        success: function() {
          calledback = true;
        }
      });

      req.send();

      deepEqual(
        args,
        {0: 'GET', 1: '/test/fake/req/simple.php?test1=1&test2=2', 2: false},
        'Request should pass correct params into XMLHttpRequest.open'
      );
      ok(sent, 'Request should be sent');
      ok(calledback, ' Space.Ajax.send : does not execute callback function')
    },

    testSetParam: function() {
      var req = new Space.Ajax.Request({params: {test1: 1, test2: 2}});
      req.setParam('test', 'testValue');

      deepEqual(req.getParams(), {test1: 1, test2: 2, test: 'testValue'},
        'Request.setParam : Must add parameter to others');
    }
  }));
})();