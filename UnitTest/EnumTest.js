Space.require('Space.Enum');

(function () {
  test('Test Enum', TestCase({

    testGetId: function() {
      var e = new Space.Enum('EVENT1', 'EVENT2');
      var t = new Space.Enum('TYPE1', 'TYPE2', 'TYPE3');

      equal(e.EVENT1.getId(), 1, 'Space.Enum : Every enum must have different id inside group');
      equal(e.EVENT2.getId(), 2, 'Space.Enum : Every enum must have different id inside group');
      equal(t.TYPE1.getId(), 1, 'Space.Enum : Every enum must have different id inside group');
      equal(t.TYPE2.getId(), 2, 'Space.Enum : Every enum must have different id inside group');
      equal(t.TYPE3.getId(), 3, 'Space.Enum : Every enum must have different id inside group');
    }

  }));
})();