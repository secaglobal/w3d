Space.require('Space.DataProvider.Proxy');

(function () {
  test('Test Proxy Data Provider', TestCase({
    setUp: function() {
      this.request = new Space.Ajax.Request({
          url: '/UnitTest/DataProvider/fixtures/RequestParserTest/listener.php'
      });

      this.provider = new Space.DataProvider.Proxy({
        request: this.request
      });
    },

    testFind: function() {
      var request = this.request,
          loaded = false;

      stop();

      this.provider.find(7, function(result) {
        var expectedParams = {
          action: 'list',
          filter: {where: {id: 7}}
        };

        var expectedResult = {id: 7};

        loaded = true;

        start();

        deepEqual(request.getParams(), expectedParams,
          'ActiveRecord.find : incorrect param set for request with single id');

        deepEqual(result, expectedResult,
          'ActiveRecord.find : incorrect result for request with single id');
      });

      window.setTimeout(function(){
        if (!loaded) {
          start();
          ok(false, 'ActiveRecord.find: does not execute callback');
        }
      }, 1000);

    },

    testFindWhenPassedManyIds: function() {
      var expected = {
        action: 'list',
        filter: {where: {id: [7, 12]}}
      };

      this.provider.find(7, 12);

      deepEqual(this.request.getParams(), expected,
        'ActiveRecord.find : incorrect param set for request with many ids');
    },


    testFindWhenPassedManyIds: function() {
      Space.DataProvider.Proxy
    }
  }));
})();
