Space.require('Space.Ajax');

(function () {
  test('Test Ajax', TestCase({
    setUp: function() {
      Space.Ajax.setRequestFactory(null);
    },

    afterTearDown: function() {
      Space.Ajax.setRequestFactory(null);
    },

    testGetRequestFactory: function() {
      var creator = Space.Ajax.getRequestFactory();

      ok(typeof creator === 'function',
        'Space.Ajax.getRequestFactory have to return a function');

      equal(
        creator().constructor,
        (window.XMLHttpRequest ? XMLHttpRequest : ActiveXObject),
        'Default ajax handler have to be XMLHttpRequest or ActiveXObject'
      );
    },

    testSetRequestFactory: function() {
      function RequestMock() {}

      Space.Ajax.setRequestFactory(function() {
        return new RequestMock();
      });

      equal(Space.Ajax.getRequestFactory()().constructor, RequestMock,
        'setRequestFactory does not set appropriate handler.');
    },
  }));
})();