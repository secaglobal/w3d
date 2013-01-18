/**
 * Default event listener
 * @class Space.Listener
 */
Space.Class('Space.Listener',{
  /** @constructor */
  construct: function(eventType, callback) {
    this._events = {};
    this._callbacks = [];

    if (eventType) {
      this.addEvent(eventType);
    }

    if (callback) {
      this.addCallback(callback);
    }
  },

  hasEvent: function(eventType) {
    return eventType && this._events[eventType.getId()] ? true : false;
  },

  /**
   * Adds callback to listener
   * @param {Function} callback
   */
  addCallback: function(callback) {
    this.callbacks.push(callback);
  },

  /**
   * [addEvent description]
   * @param {[type]} eventType [description]
   */
  addEvent: function(eventType) {
    this._events[eventType.getId()] = eventType;
  }
});


