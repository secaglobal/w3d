w3d.require('w3d.ajax');

(function () {
  test('Test Ajax', TestCase({
    setUp: function() {
      w3d.ajax.setRequestFactory(null);
    },

    afterTearDown: function() {
      w3d.ajax.setRequestFactory(null);
    },

    testGetRequestFactory: function() {
      var creator = w3d.ajax.getRequestFactory();

      ok(typeof creator === 'function',
        'w3d.ajax.getRequestFactory have to return a function');

      equal(
        creator().constructor,
        (window.XMLHttpRequest ? XMLHttpRequest : ActiveXObject),
        'Default ajax handler have to be XMLHttpRequest or ActiveXObject'
      );
    },

    testSetRequestFactory: function() {
      function RequestMock() {}

      w3d.ajax.setRequestFactory(function() {
        return new RequestMock();
      });

      equal(w3d.ajax.getRequestFactory()().constructor, RequestMock,
        'setRequestFactory does not set appropriate handler.');
    },
  }));
})();