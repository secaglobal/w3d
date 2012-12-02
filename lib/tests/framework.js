function testSuite(handlers) {
  var scope = {
    beforeSetUp: function() {},
    setUp: function() {},
    tearDown: function() {},
    afterTearDown: function() {}
  };

  for (var el in handlers) {
    scope[el] = handlers[el];
  }

  var fn = function(){
    scope.beforeSetUp();
    for (var el in scope) {
      if (typeof scope[el] == 'function' && /^test.+/.test(el)) {
        scope.setUp();
        scope[el]();
        scope.tearDown();
      }
    }
    scope.afterTearDown();
  }

  return fn;
}