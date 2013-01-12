Space.require('Space.DataProvider.RequestParser');

(function () {
  test('Test Space.DataProvider.RequestParser', TestCase({
    setUp: function() {
    },

    afterTearDown: function() {
    },

    testGetParamsWhenSentAnId: function() {
      var request = new Space.DataProvider.RequestParser([7]);
      deepEqual(request.getParams(), {where: {id: 7}}, 'getParams :incorrect respose when received one id');
    },

    testGetParamsWhenPassedCallbackFn: function() {
      var request = new Space.DataProvider.RequestParser([7, function() { return 1;}]);
      deepEqual(request.getParams(), {where: {id: 7}}, 'getParams :incorrect respose when received one id and callback function');
    },

    testGetParamsWhenSentManyIds: function() {
      var request = new Space.DataProvider.RequestParser([1, 7]);
      deepEqual(request.getParams(),  {where: {id: [1, 7]}}, 'getParams : incorrect respose when received many ids');
    },

    testGetParamsWhenSentWhereClouseWithSingleParameter: function() {
      var request = new Space.DataProvider.RequestParser([{id: 4}]);
      deepEqual(request.getParams(),  {where: {id: 4}}, 'getParams : incorrect respose when received single search parameter');
    },

    testGetParamsWhenSentWhereClouseWithManyParameter: function() {
      var request = new Space.DataProvider.RequestParser([{id: 4, age: ['>', 100]}]);
      deepEqual(request.getParams(),  {where: {id: 4, age: ['>', 100]}}, 'getParams : incorrect respose when received many search parameter');
    },

    testGetParamsWhenSentOptions: function() {
      var request = new Space.DataProvider.RequestParser([{limit: 100, orderby: 'id ASC, name DESC, age'}]);
      deepEqual(request.getParams(),  {limit: 100, order: [['id', 0], ['name', 1], ['age', 0]]}, 'getParams : incorrect respose when received many options');
    }
  }));
})();