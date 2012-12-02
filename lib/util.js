w3d.ns('w3d.util');

w3d.util.queryEncode = function(params, prefix) {
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
      res.push(w3d.util.queryEncode(params[el], key));
    } else {
      res.push(key + '=' + encodeURIComponent(params[el]));
    }

  }
    
  return res.join('&');
}