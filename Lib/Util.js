Space.ns('Space.Util');

Space.Util.queryEncode = function(params, prefix) {
  var res = [];
  var keyPattern = typeof prefix === 'undefined' ? '<key>' : prefix + '[<key>]';

  for (var el in params) {
    var key;

    if (params instanceof Array && typeof prefix !== 'undefined') {
      key = keyPattern.replace('<key>', '');  
    } else {
      key = keyPattern.replace('<key>', encodeURIComponent(el));
    }
    
    if (typeof params[el] ==  'object') {
      res.push(Space.Util.queryEncode(params[el], key));
    } else {
      res.push(key + '=' + encodeURIComponent(params[el]));
    }

  }
    
  return res.join('&');
}