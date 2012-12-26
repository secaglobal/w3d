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

    testCreateClass: function() {
      var A = Space.createClass({
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
      
      var B = Space.createClass({
        extend: A,
        prop1: 'PropB',

        construct: function() {
          B.superclass.construct.apply(this, arguments);
          this.prop2 = 'PropB2';
        } 
      });

      B.staticMethodAdd = function(){
        var self = this.self || B;
        return self.addProp = self.addProp ? self.addProp + 1 : 1;
      }

      var C = Space.createClass({
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

      //Checking static logic
      equal(typeof C.staticMethodAdd, 'function', 'C should inherit static property');
      equal(B.staticMethodAdd(), 1, 'B should work with own static property');
      equal(C.staticMethodAdd(), 1, 'C should work with own static property');
      equal(C.staticMethodAdd(), 2, 'C should work with own static property');
      equal(C.staticMethodAdd(), 3, 'C should work with own static property');
      equal(B.staticMethodAdd(), 2, 'B should work with own static property');
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
        'UnitTest.Fake.Autoloaded library shoud be autoloaded');

      ok(UnitTest.Fake.Autoloaded.Autoloaded,
        'UnitTest.Fake.Autoloaded.Autoloaded library shoud be autoloaded');

      ok(UnitTest.Fake.Autoloaded.test,
        'UnitTest.Fake.Autoloaded library shoud be autoloaded (property cheking)');

      ok(UnitTest.Fake.Autoloaded.Autoloaded.test,
        'UnitTest.Fake.Autoloaded.Autoloaded library shoud be autoloaded  (property cheking)');
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