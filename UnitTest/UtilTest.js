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
    },

    testCallbackWhenScopeIsPassed: function() {
      var expected = 4;
      var fn = Space.Util.callback(function() {return this.id;}, {id: expected});

      ok(typeof fn == 'function', 'Space.Util.callback:  must return function');
      equal(fn(), expected, 'Space.Util.callback: must set scope');
    },

    testCallbackWhenScopeIsAbsent: function() {
      var expected = {};
      var fn = Space.Util.callback(function() {return this;});

      ok(typeof fn == 'function', 'Space.Util.callback:  must return function');
      deepEqual(fn(), expected, 'Space.Util.callback: must set empty scope');
    },

    testCallbackWhenPassedScopeAndParameters: function() {
      var expected = {0: 5, 1:  3, 2: 7},
          args = null,
          fn = function(num1, num2, num3) {args = arguments; return this.num;},
          cl = Space.Util.callback(fn, {num: 4}, [5, 3]);

      var res = cl(7);

      ok(typeof cl == 'function', 'Space.Util.callback:  must return function');
      equal(res, 4, 'Space.Util.callback: must set scope');
      deepEqual(args, expected, 'Space.Util.callback: must correctly place parameters');
    },

  }));
})();