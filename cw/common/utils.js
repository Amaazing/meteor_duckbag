RegExp.escape = function(s) {  
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

// allows A-Z a-z and WHITESPACE 
RegExp.escape2 = function(s) {  
  return s.replace(/[^A-Za-z ]/g,'');
};

// returns regex for matching the category field in documents
RegExp.category = function(s) {  
	if(s.length == 1){
		//gender
		return "^\\/" + s[0];

	} else if (s.length == 2){
		//gender + category
		return "^\\/" + s[0] + "." + s[1];

	} else if (s.length == 3){
		// gender + category + sub
		// men shirts full OR men shirts tshirt
		return "^\\/" + s[0] + "." + s[1] + "." + s[2];
	} else {
		return "";
	}
}; 


// why is this so complicated...
// function to replace all instances of a string
// http://stackoverflow.com/questions/2116558/fastest-method-to-replace-all-instances-of-a-character-in-a-string
String.prototype.replaceAll = function(str1, str2, ignore){
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 