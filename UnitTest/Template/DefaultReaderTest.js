Space.require('Space.Template.DefaultReader');

(function () {
  test('Default Template Reader', TestCase({
    aspects: {
      testRead: {
        dataProvider: 'readDataProvider'
      }

    },

    readDataProvider: function() {
      return [
        ['', {template: '', widgets: []}],
        ['<div style="color: \'red\'"></div>', {'template' : '<div style="color: \'red\'"></div>', widgets: []}],
        [
          '<div style="color: \'red\'"><space:widget name="DefaultReaderTestWidget"></space:widget></div>',
          {'template' : '<div style="color: \'red\'"><div id="widget.DefaultReaderTestWidget#0"></div></div>', widgets: []}
        ]
      ];
    },

    testRead: function(req, res) {
      var reader = new Space.Template.DefaultReader();
      deepEqual(reader.read(req), res);
    }
  }));
})();