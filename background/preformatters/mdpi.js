var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix ISSN
		var temp = "";
		if ((temp = metaData["citation_url"]) != "") {
			metaData["citation_issn"] = temp.replace(/^.*com\//,"").replace(/\/.*$/,"");
		}
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
