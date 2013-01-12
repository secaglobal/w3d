Space.require('Space.DataProvider.Local');

(function () {
  test('Test Local Data Provider', TestCase({
    setUp: function() {
      this.provider = new Space.DataProvider.Local({data: [
          {id: 1, name: 'Max', age: 30, childs: 3},
          {id: 2, name: 'Mike', age: 20, childs: 0},
          {id: 7, name: 'Nina', age: 70, childs: 1},
      ]});
    },

    afterTearDown: function() {
    },

    testFind: function() {
      var max = this.provider.find(1),
          nina = this.provider.find(7);

      equal('Max', max.name, 'DataProvider.Local.find must return item by id');
      equal('Nina', nina.name, 'DataProvider.Local.find must return item by id');
    },

    // testFindWhere: function() {
    //   var max = this.provider.find({name: 'Max'}),
    //       nina = this.provider.find({name: 'Nina'});

    //   equal('Max', max.name, 'ActiveRecord.find must recognize object as where clouse');
    //   equal('Nina', nina.name, 'ActiveRecord.find must recognize object as where clouse');
    // },

    testFindByManyIds: function() {
      var users = this.provider.find(1, 7);

      var expected = [
        this.provider.find(1),
        this.provider.find(7)
      ];

      ok(users instanceof Array, 'DataProvider.Local.find: Must return array if requested many users');
      equal(users.length, 2, 'DataProvider.Local.find: Must return array with all appropriate items');
      deepEqual(users, expected, 'DataProvider.Local.find must return all items by id if defined many');
    }
  }));
})();