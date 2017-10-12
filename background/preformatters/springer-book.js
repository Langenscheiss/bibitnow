var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//set doi
		var temp = metaData["citation_misc"].replace(/;.*$/,"").trim();
		var tempTwo = metaData["citation_doi"].replace(/\/.*$/,"").trim();
		if (temp != "") {
			if (tempTwo != "") {
				metaData["citation_doi"] = "" + tempTwo + "/" + temp;
			} else {
				metaData["citation_doi"] = "";
			}
		} else if (tempTwo != "") {
			metaData["citation_doi"] = metaData["citation_doi"].replace(/\_[0-9]+$/,"").trim();
		}
		
		//reset misc
		metaData["citation_misc"] = "";
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
