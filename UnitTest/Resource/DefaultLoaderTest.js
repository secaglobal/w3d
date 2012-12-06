Space.require('Space.Resource.DefaultLoader');

(function () {
  test('Default Resource Loader', TestCase({
    testLoad: function() {
      var loader = new Space.Resource.DefaultLoader();
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
    }
  }));
})();