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

    testFindWhenPassedSingleId: function() {
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

    testFindWhenPassedManyId: function() {
      var request = this.request,
          loaded = false;

      stop();

      this.provider.find(7, 14, function(result) {
        var expectedParams = {
          action: 'list',
          filter: {where: {id: [7, 14]}}
        };

        var expectedResult = [{id: 7}, {id: 14}];

        loaded = true;

        start();

        deepEqual(request.getParams(), expectedParams,
          'ActiveRecord.find : incorrect param set for request with many ids');

        deepEqual(result, expectedResult,
          'ActiveRecord.find : incorrect result for request with many ids');
      });

      window.setTimeout(function(){
        if (!loaded) {
          start();
          ok(false, 'ActiveRecord.find: does not execute callback');
        }
      }, 1000);
    },

    testFindWhenPassedManyIdWithOptionsAndWhereClouse: function() {
      var request = this.request,
          loaded = false,
          params = [7, 14, {state: ['>', 10], 'name': 'Bond'}, {orderby: 'name desc, state', limit: 10}];

      stop();

      this.provider.find.apply(this.provider, params.concat(function(result) {
        var expectedParams = {
          action: 'list',
          filter: {
            where: {id: [7, 14], state: ['>', 10], 'name': 'Bond'},
            order: [['name', 1], ['state', 0]],
            limit: 10
          }
        };

        var expectedResult = [{id: 14}];

        loaded = true;

        start();

        deepEqual(request.getParams(), expectedParams,
          'ActiveRecord.find : incorrect param set for request with many ids');

        deepEqual(result, expectedResult,
          'ActiveRecord.find : incorrect result for request with many ids');
      }));

      window.setTimeout(function(){
        if (!loaded) {
          start();
          ok(false, 'ActiveRecord.find: does not execute callback');
        }
      }, 1000);
    }
  }));
})();
