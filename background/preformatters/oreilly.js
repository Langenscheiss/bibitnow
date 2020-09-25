var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix database
		metaData["citation_database"] = "O'Reilly Shop";
		
		//fix authors
		let temp = "";
		if ((temp = metaData["citation_authors"]) != "") {
			metaData["citation_authors"] = temp.replace(/[\ ]*\,[\ ]*/g," ; ");
		}
		
		//fix isbn
		temp = metaData["citation_keywords"];
		if ((temp = temp.match(/97[89]\-[0-9X\-]+\-[0-9X]/)) != null) {
			metaData["citation_isbn"] = temp[0];
		}
		
		//fix type
		if (metaData["citation_isbn"] != "") {
			metaData["citation_type"] = "book";
		}
	}
	
	// expose preformatter
	return { preformatData : preformatData };

}());
