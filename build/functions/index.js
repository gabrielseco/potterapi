"use strict";

function giveIDFromForm(children) {
  "use strict";

  var obj = {};
  children.map(function (row) {
    try {
      if (row.props.children.length > 0) {
        row.props.children.map(function (field) {
          var value = document.getElementById(field.props.id).value;

          if (value !== "") {
            obj[field.props.id] = value;
          }
        });
      } else {
        var value = document.getElementById(row.props.children.props.id).value;
        if (value !== "") {
          obj[row.props.children.props.id] = value;
        }
      }
    } catch (e) {}
  });
  return obj;
}

function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i) {
    rv[arr[i]] = arr[i];
  }return rv;
}

function mapArrayValues(arr, obj) {
  arr.map(function (item) {
    item.title = item.title.toLowerCase().split(' ').join("_");
    item.desc = item.desc.replace(/ *\[[^\]]*]/g, '');
    obj[item.title] = item.desc;
  });
  return obj;
}

function getURL() {
  return window.location.protocol + "//" + window.location.host + "/";
}

function extractDate(value) {
  "use strict";

  var datePattern = /\d{2}\s\w+\W\s\d{4}/g;
  var born = value.match(datePattern);
  if (born !== null) {
    var address = value.substring(born[0].length);

    born = born[0];

    return [born, address];
  }

  return null;
}

function esc_quot(str) {
  return str.replace(/[\\]/g, '\\\\').replace(/[\"]/g, '\\\"').replace(/[\/]/g, '\\/').replace(/[\b]/g, '\\b').replace(/[\f]/g, '\\f').replace(/[\n]/g, '\\n').replace(/[\r]/g, '\\r').replace(/[\t]/g, '\\t');
}

function formatForGraphQL(obj) {
  "use strict";

  var string = "";

  for (var key in obj) {

    var temp = obj[key];

    if (temp instanceof Array) {

      if (temp.length === 0) {
        //return;
        continue;
      }

      string += key + ":[";

      temp.map(function (item) {
        string += "{";
        for (var subKey in item) {
          var subtext = item[subKey];

          string += subKey + ": \"" + subtext + "\",";
        }
        string += '}';
      });

      string += '],';
    } else {
      var text = obj[key];
      string += key + ": \"" + text + "\",";
    }
  }

  return string;
}

module.exports = {
  giveIDFromForm: giveIDFromForm,
  toObject: toObject,
  mapArrayValues: mapArrayValues,
  getURL: getURL,
  extractDate: extractDate,
  formatForGraphQL: formatForGraphQL
};