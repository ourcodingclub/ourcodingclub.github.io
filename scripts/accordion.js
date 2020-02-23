$(function() {
	var icons = {
    	header: "ui-icon-circle-arrow-e",
    	activeHeader: "ui-icon-circle-arrow-s"
  	};
	$( "#accordion" ).accordion({
		collapsible: true,
		heightStyle: "content",
		icons: icons,
		active: false
	});
});