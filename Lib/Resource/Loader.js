Space.require('Space.Resource.DefaultLoader');

Space.Class('Space.Resource.Loader', {
  _loader: null,
  _defaultLoader: null,
  construct: function(loader) {
    this._defaultLoader = loader ? loader : new Space.Resource.DefaultLoader();
  },

  load: function(path, opt_fn) {
    var loader = this._loader ? this._loader : this._defaultLoader;
    loader.load(path, opt_fn);
  },

  setLoader: function(loader) {
    this._loader = loader;
    return this;
  }
});