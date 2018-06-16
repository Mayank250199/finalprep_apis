

(function(globals) {

  var node = globals.node || (globals.node = {});


  node.pluralidx = function(count) { return (count == 1) ? 0 : 1; };


  /* gettext library */

  node.catalog = node.catalog || {};


  if (!node.jsi18n_initialized) {
    node.gettext = function(msgid) {
      var value = node.catalog[msgid];
      if (typeof(value) == 'undefined') {
        return msgid;
      } else {
        return (typeof(value) == 'string') ? value : value[0];
      }
    };

    node.ngettext = function(singular, plural, count) {
      var value = node.catalog[singular];
      if (typeof(value) == 'undefined') {
        return (count == 1) ? singular : plural;
      } else {
        return value[node.pluralidx(count)];
      }
    };

    node.gettext_noop = function(msgid) { return msgid; };

    node.pgettext = function(context, msgid) {
      var value = node.gettext(context + '\x04' + msgid);
      if (value.indexOf('\x04') != -1) {
        value = msgid;
      }
      return value;
    };

    node.npgettext = function(context, singular, plural, count) {
      var value = node.ngettext(context + '\x04' + singular, context + '\x04' + plural, count);
      if (value.indexOf('\x04') != -1) {
        value = node.ngettext(singular, plural, count);
      }
      return value;
    };

    node.interpolate = function(fmt, obj, named) {
      if (named) {
        return fmt.replace(/%\(\w+\)s/g, function(match){return String(obj[match.slice(2,-2)])});
      } else {
        return fmt.replace(/%s/g, function(match){return String(obj.shift())});
      }
    };


    /* formatting library */

    node.formats = {
    "DATETIME_FORMAT": "N j, Y, P",
    "DATETIME_INPUT_FORMATS": [
      "%Y-%m-%d %H:%M:%S",
      "%Y-%m-%d %H:%M:%S.%f",
      "%Y-%m-%d %H:%M",
      "%Y-%m-%d",
      "%m/%d/%Y %H:%M:%S",
      "%m/%d/%Y %H:%M:%S.%f",
      "%m/%d/%Y %H:%M",
      "%m/%d/%Y",
      "%m/%d/%y %H:%M:%S",
      "%m/%d/%y %H:%M:%S.%f",
      "%m/%d/%y %H:%M",
      "%m/%d/%y"
    ],
    "DATE_FORMAT": "N j, Y",
    "DATE_INPUT_FORMATS": [
      "%Y-%m-%d",
      "%m/%d/%Y",
      "%m/%d/%y"
    ],
    "DECIMAL_SEPARATOR": ".",
    "FIRST_DAY_OF_WEEK": "0",
    "MONTH_DAY_FORMAT": "F j",
    "NUMBER_GROUPING": "3",
    "SHORT_DATETIME_FORMAT": "m/d/Y P",
    "SHORT_DATE_FORMAT": "m/d/Y",
    "THOUSAND_SEPARATOR": ",",
    "TIME_FORMAT": "P",
    "TIME_INPUT_FORMATS": [
      "%H:%M:%S",
      "%H:%M:%S.%f",
      "%H:%M"
    ],
    "YEAR_MONTH_FORMAT": "F Y"
  };

    node.get_format = function(format_type) {
      var value = node.formats[format_type];
      if (typeof(value) == 'undefined') {
        return format_type;
      } else {
        return value;
      }
    };

    /* add to global namespace */
    globals.pluralidx = node.pluralidx;
    globals.gettext = node.gettext;
    globals.ngettext = node.ngettext;
    globals.gettext_noop = node.gettext_noop;
    globals.pgettext = node.pgettext;
    globals.npgettext = node.npgettext;
    globals.interpolate = node.interpolate;
    globals.get_format = node.get_format;

    node.jsi18n_initialized = true;
  }

}(this));
