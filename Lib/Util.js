Space.ns('Space.Util');

Space.Util.queryEncode = function(params, prefix) {
  var res = [];
  var keyPattern = typeof prefix === 'undefined' ? '<key>' : prefix + '[<key>]';

  for (var el in params) {
    var key;

    key = keyPattern.replace('<key>', encodeURIComponent(el));

    if (typeof params[el] ==  'object') {
      res.push(Space.Util.queryEncode(params[el], key));
    } else {
      res.push(key + '=' + encodeURIComponent(params[el]));
    }

  }

  return res.join('&');
};

/**
 * Prepare callback function
 * Create function that execute fn with appropriate scope
 * @param  {Function} fn    handler
 * @param  {[type]}   scope scope of handler. Default: {}
 * @return {function}       Callback function
 */
Space.Util.callback = function(fn, scope, parameters) {
  scope = scope || {};
  parameters = parameters || [];
  return function(){
    return fn.apply(scope, parameters.concat.apply(parameters, arguments));
  };
};