Space.ns('Space.Template');

Space.Template.DefaultReader = Space.createClass({
  read: function(tpl) {
    var templateParts = [];
    var marker = 0;
    var res = {
      template: "",
      widgets: []
    };

    for (var i = 0; i < tpl.length; ++i) {
      if (tpl.charAt(i) == '<') {
        if (this._readTag(tpl, i) == 'space:widget') {
          var edge = this._detectWidgetEdge(tpl, i);
          var widget = this._processWidgetTpl(tpl, i, edge);
          templateParts.push(tpl.substring(marker, i));
          templateParts.push(widget.getMarkeredContainer());
          //res.widgets.push(widget);
          i = marker = edge + 1;
        }
      }
    }

    templateParts.push(tpl.substring(marker));
    res.template = templateParts.join('');
    return res;
  },

  _readTag: function(tpl, pos) {
    var match = tpl.match(new RegExp('^.{' + pos + '}<\\s*([\\w:]+)', 'm'));
    return match ? match[1] : false;
  },

  _detectWidgetEdge: function(tpl, pos) {
    return tpl.indexOf('</space:widget>',pos) + 14;
  },

  _processWidgetTpl: function(tpl, start, end) {
    var block = document.createElement('div');
    block.innerHTML = tpl.substring(start, end + 1);
    var widget = block.getElementsByTagName('space:widget')[0];
    var name;

    if (widget) {
      name = widget.getAttribute('name');
    } else {
      widget = block.getElementsByTagName('widget')[0];
      name = widget.name;

    }

    return {
      name: name,
      getMarkeredContainer: function() {
        return '<div id="widget.' + this.name + '#0"></div>';
      }
    };
  }
});