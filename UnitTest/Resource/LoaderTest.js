Space.require('Space.Resource.Loader');
Space.require('Space.Resource.DefaultLoader');

(function () {
  test('Resource Loader', TestCase({
    testLoad: function() {
      var loader = new Space.Resource.Loader();
      var loaded = 0,
          file = 'Space.UnitTest.Fake.DefaultResourceLoaderFile';
      stop();

      loader.load('Space.UnitTest.Fake.DefaultResourceLoaderFile', function() {
        start();
        loaded += 1;
        equal(loaded, 1,
          'Default resource loader must be load only once.');
        equal(Space.UnitTest.Fake.DefaultResourceLoaderFile, 1,
          'Default resource loader must load ' + file);
      });

      window.setTimeout(function(){
        if (!loaded) {
          start();
          ok(false, 'Test loading failed: ' + file);
        }
      }, 1000);
    },

    xtestSetLoader: function() {
      var path = 'Space.UnitTest.Fake.DefaultResourceLoaderFile';
      var fn = function() {};
      var loader = new Space.Resource.Loader();
      var handler = new Space.createClass({
        extend: Space.Resource.DefaultLoader,
        loaded: 0,
        load: function() {
          this.loaded += 1;
          equal(arguments[0], path, 'Path must be received to custom loader');
          ok(arguments[1], fn, 'Callback must be received to custom loader');
        }
      });

      loader.setLoader(handler).load(path, fn);
      equal(handler.loaded, 1, 'Custom loader must be executed just once');
    }
  }));
})();