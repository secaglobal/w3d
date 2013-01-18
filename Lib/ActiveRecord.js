
Space.Class('Space.ActiveRecord', {});

Space.Class('Space.ActiveRecord.IllegalModelException', {extend: Space.Exception});

Space.ActiveRecord.find = function(id) {
  if (!this.self) {
    //error
    return;
    throw new IllegalModelException('Cannot find');
  }

  var self = this.self;

  if (!self.dataProvider) {
    if (self.prototype.dataProvider) {
      var conf = self.prototype.dataProvider;
      self.dataProvider = new Space.DataProvider[conf[0]](conf[1]);
    } else {

    }
  }

  return self.dataProvider.find(id);
}


