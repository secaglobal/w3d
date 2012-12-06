Space.ns('Space.Resource');
Space.require('Space.Resource.DefaultLoader');

Space.Resource.Loader = Space.createClass({
  _loader: null,
  _defaultLoader: null,
  construct: function(loader) {
    this._defaultLoader = loader ? loader : new Space.Resource.DefaultLoader();
  },

  load: function(path, opt_fn) {
    var loader = this._loader ? this._loader : this._defaultLoader;
    console.log(loader);
    loader.load(path, opt_fn);
  },

  setLoader: function(loader) {
    this._loader = loader;
    return this;
  }
});