var parseJSON = function(json) {
  // your code goes here
  //breadown the string and get next character from the 
  //string;
  //Encapsulates the work of breaking down the string to get at 
  //each character;
  //var error = "Invalid String";
  //A hash that allows you to check for escape characters when 
  //parsing string
  var escape ={
    "\"" : "\"",
    "\\" : "\\",
    "\/" : "\/",
    "b"  : "\b",
    "f"  : "\f",
    "n"  : "\n",
    "t"  :"\t"
  };

var whiteSpace = function(){
  console.log("In whiteSpace, ch is " + ch);
  while(ch && ch <= " " ){
    ch = nextToken();
    // console.log("In whiteSpace, ch: " + ch);
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
    ch = nextToken();
    return obj;
  }
  while(ch){
    if(ch === "\""){
      var key = string();
      console.log("after string in object, ch is " + ch);
      whiteSpace();
      if(ch  !== ":"){
        console.log("In object, check for ':' " + ch);
        throw new SyntaxError("Malformed object in string");
      }
      ch = nextToken();
      whiteSpace();
      console.log("In Obejct, After whitespace, ch is  " + ch);
      obj[key] = parse();
      console.log("In obect, the typeof value generated is " + typeof obj[key]);
      console.log("In object, the value returned is " + JSON.stringify(obj[key]));
      if(ch !== "}"){
        ch = nextToken();
        console.log("In object, ch after parse() " + ch);
      }
      if(ch === "}"){
        ch = nextToken();
        console.log("In object, ch before returning an object value " + ch);
        return obj;
      }
      console.log("In object, after first key, value of ch is " + ch);
      if(ch === ","){
        ch = nextToken();
      }
      console.log("In object, ch after , is " + ch);
      whiteSpace();
    }else{
      throw new SyntaxError();
    }
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
  // '[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]'
var array = function(){
  console.log("In array, value of ch is " + ch);
  var arr = [];
  var element;
  if(ch === "["){
    ch = nextToken();
    if(ch === "]"){
      return arr;
    }
    console.log("In array, ch after first [ is " + ch);
    while(ch){
      // whiteSpace();
      element = parse();
      arr.push(element);
      console.log("In array, ch after first element is " + ch);
      if(ch !== "]"){
        ch = nextToken();
      }
      if(ch === "]"){
        return arr;
      }
      // whiteSpace();
      console.log("In array, ch after whitespace is " + ch);
      if(ch === ","){
        ch = nextToken();
      }
      whiteSpace();
    }
  }
  
};//end of array function

var string = function(){
  var result = "";
  ch = nextToken();
  console.log("In string, ch: " + ch);
  if(ch === "\""){
    ch = nextToken();
    return result;
  }
  while(ch){
    if(ch !== "\""){
      result += ch;
      ch = nextToken();
      console.log("ch after each result: " + ch);
    }else{
      console.log("In string, result: " + result);
      ch = nextToken();
      return result;
    }
  }
  
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
console.log("in main function, value of first character is " + ch);
return parse();

};//end of JSON parse function

function assertEqual(actual,expected,testName){
  actual = JSON.stringify(actual);
  expected = JSON.stringify(expected);
  if(actual === expected){
    console.log("pass  " + actual + " matches " + expected);
  }else{
    console.log('failed[' + testName + '] expected ' + expected +' but got ' + actual);
  }
}
