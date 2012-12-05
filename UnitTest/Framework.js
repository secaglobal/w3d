function TestCase(handlers) {
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
        if (scope.aspects && scope.aspects[el]) {
          if (scope.aspects[el].dataProvider) {
            var paramSets = scope[scope.aspects[el].dataProvider]();

            for (var i = 0, paramSet; paramSet = paramSets[i]; ++i) {
              scope[el].apply(scope, paramSet);
            }
          } else {
            scope[el].apply(scope, []);  
          }
        } else {
          scope[el].apply(scope, []);
        }
        scope.tearDown();
      }
    }
    scope.afterTearDown();
  }

  return fn;
}

function TestSuite(bundles) {
  function load(bundle) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.setAttribute('src', '/UnitTest/' + bundle.replace(/\./g, '/') + '.js');
    script.setAttribute('language', 'javascript');
    script.setAttribute('type', 'text/javascript');
    head.appendChild(script);
  }

  for (var i = 0, bundle; bundle = bundles[i]; ++i) {
    load(bundle);
  }
}