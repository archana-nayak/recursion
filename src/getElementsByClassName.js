// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
 function getElementsByClassName(className){
  // your code here
  var node =  document.body;
  var result = [];
  
  	function getClassForNode(node){
  	  if(node.classList && node.classList.contains(className)){
	    result.push(node);
	  }
   	  if(node.hasChildNodes()){
	    var children = node.childNodes;
	    for(var i = 0; i < children.length; i++){
	      var child = children[i];
	      getClassForNode(child);
	    }
	  }
	}
  getClassForNode(node);
  return result;
}