Space.require('Space.ActiveRecord');

(function () {
  test('Test Active Record', TestCase({
    setUp: function() {
      this.model = Space.Class({
        extend: Space.ActiveRecord,
        table: 'Person',
        validators: [
          ['length', {max: 10, min: 3}, 'name']
          ['numeric', 'age', 'childs']
        ],
        dataProvider:['Local', {
          data: [
            {id: 1, name: 'Max', age: 30, childs: 3},
            {id: 2, name: 'Mike', age: 20, childs: 0},
            {id: 7, name: 'Nina', age: 70, childs: 1},
          ]
        }]
      });
    },

    afterTearDown: function() {
    },

    testFind: function() {
      var max = this.model.find(1),
          nina = this.model.find(7);

      equal('Max', max.name, 'ActiveRecord.find must return item by id');
      equal('Nina', nina.name, 'ActiveRecord.find must return item by id');
    }
  }));
})();