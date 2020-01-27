function addCopyButtonToCode(){
	// get all code elements
	var allCodeBlocksElements = $( "div.highlight pre" );

	// For each element, do the following steps
	allCodeBlocksElements.each(function(ii) {
		// define a unique id for this element and add it
		var currentId = "codeblock" + (ii + 1);
		$(this).attr('id', currentId);

		// create a button
		// point it to text in this code block
		// add button to right of text in code block 
		var clipButton = '<button class="copy-button" data-clipboard-target="#' + currentId + '">Copy contents</button>';
		$(this).before(clipButton);
	});

	// tell clipboard.js to look for clicks that match this query
	new Clipboard('.copy-button');
}

$(document).ready(function () {
	// Once the DOM is loaded for the page, attach clipboard buttons
	addCopyButtonToCode();
});
