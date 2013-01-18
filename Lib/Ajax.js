Space.ns('Space.Ajax');

Space.Ajax._requestFactory = null;

Space.Ajax.getRequestFactory = function() {
  if (!Space.Ajax._requestFactory) {
    if (window.XMLHttpRequest) {
      Space.Ajax._requestFactory = function() { return new window.XMLHttpRequest(); };
    } else {
      Space.Ajax._requestFactory = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }
  }

  return Space.Ajax._requestFactory
}

Space.Ajax.setRequestFactory = function(handler) {
  Space.Ajax._requestFactory = handler;
}