(function () {
  test('Test Core Inheritance', testSuite({
    setUp: function() {
      w3d.deleteClass('A', 'B', 'C', 'D');
    },

    afterTearDown: function() {
      w3d.deleteClass('A', 'B', 'C', 'D');
    },

    testCreateClass: function() {
    var A = w3d.createClass(),
        B = w3d.createClass();

    ok(A != B);
    ok(typeof A === 'function');
    ok(typeof B === 'function');
    },

    testCreateClassWithInheritance: function() {
      w3d.registerClass('A');

      var A = w3d.createClass(),
          B = w3d.createClass(),
          C = w3d.createClass('A'),
          D = w3d.createClass(B);

      var b = new B(),
          c = new C(),
          d = new D();

      ok(c instanceof C);
      ok(c instanceof w3d.classes.A);
      ok(!(c instanceof B));
      ok(!(b instanceof C));

      ok(d instanceof D);
      ok(d instanceof B);
      ok(!(c instanceof A));
      ok(!(d instanceof C));
    },

    testRegisterClassAndCreate: function() {
      w3d.registerClass('A');
      w3d.registerClass('B');

      var a = w3d.create('A'),
          b = w3d.create('B');

      ok(a instanceof w3d.classes.A);
      ok(b instanceof w3d.classes.B);
      ok(!(a instanceof w3d.classes.B));
      ok(!(b instanceof w3d.classes.A));
    },

    testRegisterClassWithInheritance: function() {
      w3d.registerClass('A');
      w3d.registerClass('B');
      w3d.registerClass('C', 'A');
      w3d.registerClass('D', w3d.classes.B);

      var b = w3d.create('B'),
          c = w3d.create('C'),
          d = w3d.create('D');

      ok(c instanceof w3d.classes.C);
      ok(c instanceof w3d.classes.A);
      ok(!(c instanceof w3d.classes.B));
      ok(!(b instanceof w3d.classes.C));

      ok(d instanceof w3d.classes.D);
      ok(d instanceof w3d.classes.B);
      ok(!(d instanceof w3d.classes.A));
      ok(!(d instanceof w3d.classes.C));
    }
  }));
})();