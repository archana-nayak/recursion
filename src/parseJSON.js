// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  //breadown the string and get next character from the 
  //string;
  //Encapsulates the work of breaking down the string to get at 
  //each character;
  //var error = "Invalid String";
  var escape =[];
  


var whiteSpace = function(){
  console.log("In whiteSpace, ch is " + ch);
  ch = nextToken();
  console.log("In whiteSpace after :, ch is " + ch);
  while(ch <= " " ){
    ch = nextToken();
    console.log("In whiteSpace, ch: " + ch);
  }
  console.log("End of whiteSpace, ch is " + ch);
};//end of whiteSpace function

var object = function(){
  var obj = {};
  ch = nextToken();
  console.log("In Object, ch: " + ch);
  if(ch === "{"){
    return new SyntaxError("String does not follow the grammar expected of input string");
  }
  if(ch === "}"){
    return obj;
  }
  if(ch === "\""){
    var key = string();
    if((ch = nextToken()) !== ":"){
      console.log("In object, check for ':' " + ch);
      throw new SyntaxError("Malformed object in string");
    }
    whiteSpace();
    console.log("In Obejct, After whitespace, ch is  " + ch);
    obj[key] = parse();
    console.log("In obect, the typeof value generated is " + typeof obj[key]);
    if(ch !== "}"){
      ch = nextToken();
    }
    if(ch === "}"){
      return obj;
    }
  }else{
    throw new SyntaxError();
  }
};//end of object function

var parse = function(){
  console.log("In Parse(), value of ch is " + ch);
  if(ch !== undefined){
    console.log("ch: " + ch);
    //the parser logic goes here
    switch(ch) {
      case "{" : return object();
      case "[" : return array();
      case "\"": return string();
      case "-" : return number();
      default  : return  (ch >= 0 && ch <= 9) ?  number() : booleanAndNull();
    }
  }
};

var array = function(){
  
};//end of array function

var string = function(){
  var result = "";
  ch = nextToken();
  console.log("In string, ch: " + ch);
  if(ch === "\""){
    return result;
  }
  while(ch !== "\""){
    result += ch;
    ch = nextToken();
    console.log("ch: " + ch);
  }
  console.log("In string, result: " + result);
  return result;
};//end of string function

var number = function (){
  var value;
  var result = "";
  while(ch >= 0 && ch <= 9){
    result += ch;
    ch = nextToken();
 }
 console.log("In number, the string number generated is " + result);
 value = +result;
 console.log("In number, the number generated is " + value);
  return value;
};//end of number function


var booleanAndNull = function(){
  var result;
  console.log("In booleanAndNull, value of ch is " + ch);
  if(ch === 't'){
    checkCharEquals('r');
    checkCharEquals('u');
    checkCharEquals('e');
    return true;
  }
  if(ch === 'f'){
    checkCharEquals('a');
    checkCharEquals('l');
    checkCharEquals('s');
    checkCharEquals('e');
    return false;
  }
  if(ch === 'n'){
    checkCharEquals('u');
    checkCharEquals('l');
    checkCharEquals('l');
    return null;
  }
};//end of booleanAndNull function

function checkCharEquals(char){
  ch = nextToken();
  if(ch !== char){
    throw new SyntaxError("Malformed string in boolean handling");
  }
}

//function to read the nextToken in the string and return it.
 var getNextToken = function (string){
  var index = 0;
   return  function(){
    if(index !== string.length){
      return string[index++];
    }   
  };
};

var nextToken = getNextToken(json);
var ch = nextToken();
return parse();

};//end of JSON parse function

