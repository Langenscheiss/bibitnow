var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix type to misc
		metaData["citation_type"] = "#BINMiscType";
		
		//database
		metaData["citation_database"] = "Github";
	}

	// expose preformatting function
	return { preformatData : preformatData };

}());
