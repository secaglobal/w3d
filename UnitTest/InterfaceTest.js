Space.require('UnitTest.Fake.Autoloaded.Autoloaded');
Space.require('UnitTest.Fake.Autoloaded');

(function () {
  test('Test Interface', TestCase({
    testInterface: function() {
      var I1 = Space.Interface({
        method1: function() {},
        method2: function() {}
      });

      var I2 = Space.Interface({
        method1: function() {},
        method3: function() {}
      });

      var A = Space.Class({
        implement: [I1, I2]

        method1: function() {},
        method2: function() {},
        method3: function() {}

        construct: function(param) {
          this.id = param;
          this.inited = true;
          this.prop2 = 'PropA2';
        }
      });

      var B = Space.Class({
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

      var C = Space.Class({
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

    testClassWhenClassNameSpecified: function() {
      if (typeof FakeNamespace != 'undefined') {
        delete window.FakeNamespace;
      }

      Space.Class('FakeNamespace.FakeNamespace.FakeClass');

      equal(typeof FakeNamespace, 'object',
        'Space.Class : must create class in according with namespace');
      equal(typeof FakeNamespace.FakeNamespace, 'object',
        'Space.Class : must create class in according with namespace');
      equal(typeof FakeNamespace.FakeNamespace.FakeClass, 'function',
        'Space.Class : must create class in according with namespace');

    }
  }));
})();