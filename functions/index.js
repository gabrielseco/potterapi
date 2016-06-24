function giveIDFromForm(children) {
  let obj = {};
  children.map(function(row) {
    try {
      if(row.props.children.length > 0){
        row.props.children.map(function(field) {
          var value = document.getElementById(field.props.id).value;

          if(value !== ""){
            obj[field.props.id] = value;
          }
        });
      } else {
        var value = document.getElementById(row.props.children.props.id).value;
        if(value !== ""){
          obj[row.props.children.props.id] = value;
        }
      }

    } catch (e) {}
  });
  return obj;
}

function toObject(arr){
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    rv[arr[i]] = arr[i];
  return rv;

}

function mapArrayValues(arr, obj){
  arr.map(item => {
    item.title = item.title.toLowerCase().split(' ').join("_");
    item.desc = item.desc.replace(/ *\[[^\]]*]/g, '');
    obj[item.title] = item.desc;
  });
  return obj;
}

function getURL(){
  return window.location.protocol + "//" + window.location.host + "/";
}

function extractDate(value){
  const datePattern = /\d{2}\s\w+\W\s\d{4}/g;
  let born = value.match(datePattern);
  if(born !== null){
    let address = value.substring(born[0].length)

    born = born[0];

    return [born , address];
  }

  return null

}

function esc_quot(str)
  {
    return str
  .replace(/[\\]/g, '\\\\')
  .replace(/[\"]/g, '\\\"')
  .replace(/[\/]/g, '\\/')
  .replace(/[\b]/g, '\\b')
  .replace(/[\f]/g, '\\f')
  .replace(/[\n]/g, '\\n')
  .replace(/[\r]/g, '\\r')
  .replace(/[\t]/g, '\\t');
  }

function formatForGraphQL(obj){
  let string = "";

  for(var key in obj){

    let temp = obj[key]

    if(temp instanceof Array ){

      if(temp.length === 0){
        //return;
        continue;
      }

      string +=`${key}:[`;

      temp.map(item => {
        string += `{`
        for(var subKey in item){
          let subtext = item[subKey];

          string += `${subKey}: "${subtext}",`

        }
        string +='}'
      });

      string += '],';

    } else {
      const text = obj[key]
      string += `${key}: "${text}",`
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
}
