/**
 * Enum
 * @class
 */
Space.Enum = Space.Class({
  /** @constructor */
  construct: function() {
    this._iter = 0;
    this._id = 0;
    this._cl = new Space.Class({extend: this.constructor, construct: function(){}});

    for (var i = 0, name; name = arguments[i]; ++i) {
      this[name] = new this._cl();
      this[name]._id = ++this._iter;
    }
  },

  getId: function() {
    return this._id;
  }
});