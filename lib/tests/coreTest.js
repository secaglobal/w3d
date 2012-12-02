w3d.require('w3d.tests.fake.autoloaded.autoloaded');
w3d.require('w3d.tests.fake.autoloaded');

(function () {
  test('Test Core Inheritance', TestCase({
    setUp: function() {
      w3d.unregisterClass('A', 'B', 'C', 'D');
    },

    afterTearDown: function() {
      w3d.unregisterClass('A', 'B', 'C', 'D');
    },

    testDeleteClass: function() {
      w3d.registerClass('A');
      w3d.registerClass('B');
      w3d.unregisterClass('A', 'B');
      w3d.registerClass('A');
      w3d.registerClass('B');
    },

    testCreateClass: function() {
      var A = w3d.createClass({
        id: 0,
        prop1: 'PropA',
        inited: false,

        getProp1: function() {
          return this.prop1;
        },

        getProp2: function() {
          return this.prop2;
        },

        construct: function(param) {
          this.id = param;
          this.inited = true;
          this.prop2 = 'PropA2';
        } 
      });
      
      var B = w3d.createClass({
        extend: A,
        prop1: 'PropB',

        construct: function() {
          B.superclass.construct.apply(this, arguments);
          this.prop2 = 'PropB2';
        } 
      });

      var C = w3d.createClass({
        extend: B,
        prop1: 'PropC'
      });      

      var a = new A(11),
          b = new B(12),
          c = new C(13);

      ok(b instanceof A, 'B should inherit A');
      ok(c instanceof A, 'C should inherit A');
      ok(c instanceof B, 'C should inherit B');
      ok(a.inited, 'Initialization of A should call construct method');
      ok(b.inited, 'Initialization of B should call construct method');
      ok(c.inited, 'Initialization of C should call construct method');
      ok(b.getProp1, 'B should inherit methods of A');
      ok(c.getProp1, 'C should inherit methods of A');
      equal(a.getProp1(), 'PropA', 'A should return own property');
      equal(b.getProp1(), 'PropB', 'B should return own property');
      equal(c.getProp1(), 'PropC', 'C should return own property');
      equal(a.getProp2(), 'PropA2', 'A should return own property');
      equal(b.getProp2(), 'PropB2', 'B should return own property');
      equal(c.getProp2(),
        'PropB2', 'C should return property of A (if not found in local scope)');
    },

    testRegisterClassAndCreate: function() {
      w3d.registerClass('A');
      w3d.registerClass('B');

      var a = w3d.create('A'),
          b = w3d.create('B');

      ok(a instanceof w3d.A);
      ok(b instanceof w3d.B);
      ok(!(a instanceof w3d.B));
      ok(!(b instanceof w3d.A));
    },

    testRegisterClassWithInheritance: function() {
      w3d.registerClass('A');
      w3d.registerClass('B');
      w3d.registerClass('C', {extend: 'A'});
      w3d.registerClass('D', {extend: w3d.B});

      var b = w3d.create('B'),
          c = w3d.create('C'),
          d = w3d.create('D');

      ok(c instanceof w3d.C);
      ok(c instanceof w3d.A);
      ok(!(c instanceof w3d.B));
      ok(!(b instanceof w3d.C));

      ok(d instanceof w3d.D);
      ok(d instanceof w3d.B);
      ok(!(d instanceof w3d.A));
      ok(!(d instanceof w3d.C));
    },

    testRegisterAvailableClass: function() {
      w3d.registerClass('A');
      throws(function() {w3d.registerClass('A');}, w3d.ClassExistsException,
        'Should throw w3d.ClassExistsException when trying to create registered class');
    }
  }));
})();

(function () {
  test('Test autoloading', TestCase({
    setUp: function() {
      w3d.unregisterClass('A', 'B', 'C', 'D');
    },

    afterTearDown: function() {
      w3d.unregisterClass('A', 'B', 'C', 'D');
    },

    testRequire: function() {
      ok(w3d.tests.fake.autoloaded,
        'w3d.tests.fake.autoloaded library shoud be autoloaded');

      ok(w3d.tests.fake.autoloaded.autoloaded,
        'w3d.tests.fake.autoloaded.autoloaded library shoud be autoloaded');

      ok(w3d.tests.fake.autoloaded.test,
        'w3d.tests.fake.autoloaded library shoud be autoloaded (property cheking)');

      ok(w3d.tests.fake.autoloaded.autoloaded.test,
        'w3d.tests.fake.autoloaded.autoloaded library shoud be autoloaded  (property cheking)');
    }

  }));
})();

(function () {
  test('Test namespacing', TestCase({
    setUp: function() {
      delete w3d.testNamespace;
    },

    afterTearDown: function() {
      delete w3d.testNamespace;
    },

    testRequire: function() {
      w3d.ns('w3d.testNamespace.subnamespace');
      ok(w3d.testNamespace,
        'w3d.ns should create full namespace path: w3d.testNamespace');

      ok(w3d.testNamespace.subnamespace,
        'w3d.ns should create full namespace path: w3d.testNamespace.subnamespace');
    }

  }));
})();