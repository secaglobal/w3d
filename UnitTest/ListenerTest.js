Space.require('Space.Listener');
Space.require('Space.EventType');

(function () {
  test('Test Listener', TestCase({

    testHasEvent: function() {
      var listener = new Space.Listener(Space.EventType.RENDER);
      ok(listener.hasEvent(Space.EventType.RENDER), 'Listener.hasEvent : Not found event');
      ok(!listener.hasEvent(Space.EventType.RENDERED), 'Listener.hasEvent : Found illegal event');
    }

  }));
})();