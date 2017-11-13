
function createParagraphs(){
	var body = $(body);
	var p = document.createElement("P");
	console.log("createParagraphs called");
}

// When HTML body has loaded, perform the anonymous function below 
$(document).ready(function (){
	console.log("LOADED SITE");
	createParagraphs();
});