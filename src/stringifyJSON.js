// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  if(obj === null){
  	return 'null';
  }
  if(typeof obj === 'function'){
  	return null;
  }
  if(typeof obj === 'undefined'){
    return  null;
  }
  if(typeof obj === 'boolean'){
    return '' + obj;
  }
  if(typeof obj === 'string'){
    return  '"' + obj + '"';
  }
  if(typeof obj === 'number'){
    return '' + obj;
  }
  if(Array.isArray(obj)){
    var arrayString = '[';
    var valueString = obj.map(function(element){
        return '' + stringifyJSON(element);
    });
    return arrayString + valueString + ']';
  }
   if(typeof obj === 'object'){
    var objKeys = Object.keys(obj);
    var  propertyString = [];
    objKeys.forEach(function(key){
      var stringifiedValue = stringifyJSON(obj[key]);
        if(stringifiedValue !== null){
          propertyString.push( '"' + key + '":' + stringifiedValue  + '');
        }
    });
    return '{' + propertyString.join(',') + '}';
  } 	
};