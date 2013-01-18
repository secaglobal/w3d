Space.require('UnitTest.Fake.Autoloaded.Autoloaded');
Space.require('UnitTest.Fake.Autoloaded');

(function () {
  test('Test Core Inheritance', TestCase({
    setUp: function() {
      Space.unregisterClass('A', 'B', 'C', 'D');
    },

    afterTearDown: function() {
      Space.unregisterClass('A', 'B', 'C', 'D');
    },

    testDeleteClass: function() {
      Space.registerClass('A');
      Space.registerClass('B');
      Space.unregisterClass('A', 'B');
      Space.registerClass('A');
      Space.registerClass('B');
    },

    testRegisterClassAndCreate: function() {
      Space.registerClass('A');
      Space.registerClass('B');

      var a = Space.create('A'),
          b = Space.create('B');

      ok(a instanceof Space.A);
      ok(b instanceof Space.B);
      ok(!(a instanceof Space.B));
      ok(!(b instanceof Space.A));
    },

    testRegisterClassWithInheritance: function() {
      Space.registerClass('A');
      Space.registerClass('B');
      Space.registerClass('C', {extend: 'A'});
      Space.registerClass('D', {extend: Space.B});

      var b = Space.create('B'),
          c = Space.create('C'),
          d = Space.create('D');

      ok(c instanceof Space.C);
      ok(c instanceof Space.A);
      ok(!(c instanceof Space.B));
      ok(!(b instanceof Space.C));

      ok(d instanceof Space.D);
      ok(d instanceof Space.B);
      ok(!(d instanceof Space.A));
      ok(!(d instanceof Space.C));
    },

    testRegisterAvailableClass: function() {
      Space.registerClass('A');
      throws(function() {Space.registerClass('A');}, Space.ClassExistsException,
        'Should throw Space.ClassExistsException when trying to create registered class');
    }
  }));
})();

(function () {
  test('Test autoloading', TestCase({
    setUp: function() {
      Space.unregisterClass('A', 'B', 'C', 'D');
    },

    afterTearDown: function() {
      Space.unregisterClass('A', 'B', 'C', 'D');
    },

    testRequire: function() {
      ok(UnitTest.Fake.Autoloaded,
        'UnitTest.Fake.Autoloaded library should be autoloaded');

      ok(UnitTest.Fake.Autoloaded.Autoloaded,
        'UnitTest.Fake.Autoloaded.Autoloaded library should be autoloaded');

      ok(UnitTest.Fake.Autoloaded.test,
        'UnitTest.Fake.Autoloaded library should be autoloaded (property checking)');

      ok(UnitTest.Fake.Autoloaded.Autoloaded.test,
        'UnitTest.Fake.Autoloaded.Autoloaded library should be autoloaded  (property checking)');
    }

  }));
})();

(function () {
  test('Test namespacing', TestCase({
    setUp: function() {
      delete Space.testNamespace;
    },

    afterTearDown: function() {
      delete Space.testNamespace;
    },

    testRequire: function() {
      Space.ns('Space.testNamespace.subnamespace');
      ok(Space.testNamespace,
        'Space.ns should create full namespace path: Space.testNamespace');

      ok(Space.testNamespace.subnamespace,
        'Space.ns should create full namespace path: Space.testNamespace.subnamespace');
    }

  }));
})();