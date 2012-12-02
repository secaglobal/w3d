
w3d.ns('w3d.ajax');

w3d.ajax._requestFactory = null;

w3d.ajax.getRequestFactory = function() {
  if (!w3d.ajax._requestFactory) {
    if (window.XMLHttpRequest) {
      w3d.ajax._requestFactory = function() { return new XMLHttpRequest(); };
    } else {
      w3d.ajax._requestFactory = function() { 
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }
  }
  
  return w3d.ajax._requestFactory
}

w3d.ajax.setRequestFactory = function(handler) {
  w3d.ajax._requestFactory = handler;
}