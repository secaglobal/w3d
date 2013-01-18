Space.Class('Space.Resource.DefaultLoader', {
  construct: function() {
    this._sequance = [
      [/^Space\.UnitTest/, 'UnitTest'],
      [/^Space/, 'Lib'],
      [/\./g, '/']
    ];
  },

  load: function(path, opt_fn) {
    for (var i = 0, action; action = this._sequance[i]; ++i) {
      path = path.replace(action[0], action[1]);
    }

    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.setAttribute('src', path + '.js');
    script.setAttribute('language', 'javascript');
    script.setAttribute('type', 'text/javascript');
    script.onload = script.onreadystatechange =  function() {
      var ready = !this.readyState ||
                  this.readyState == 'loaded' ||
                  this.readyState == 'complete';

      if (!this._space_loaded && ready) {
        this._space_loaded = true;
        opt_fn();
      }
    };
    head.appendChild(script);
  }
});