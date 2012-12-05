Space.require('Space.Util');

(function () {
  test('Test Utils', TestCase({
    aspects: {
      testQueryEncode: {
          dataProvider: 'queryEncodeDataProvider'
        }   
    },

    queryEncodeDataProvider: function() {
      return [
        [{}, ''],
        [[], ''],
        [{a: 1, b: 2, c: 3}, 'a=1&b=2&c=3'],
        [['one','two three'], '0=one&1=two%20three'],
        [
          {a: 1, b: [5, 6, 7], c: {a: 1, c: [3, 3, 3]}},
          'a=1&b[]=5&b[]=6&b[]=7&c[a]=1&c[c][]=3&c[c][]=3&c[c][]=3'
        ],
      ];
    },

    testQueryEncode: function(req, res) {
      equal(Space.Util.queryEncode(req), res, 'queryEncode problem set: ' + res);
    }

  }));
})();