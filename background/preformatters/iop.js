var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		
		//download citation is crap, but supported anyway so
		var temp = metaData["citation_download"];
		temp = temp.replace(/A1[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").replace(/AU[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").trim();
		metaData["citation_download"] = temp;
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//check if book
		var temp = metaData["citation_type"];
		if (temp.search(/isbn/i) != -1) {
			temp = temp.split(";");
			if (temp != null && temp.length > 0) {
				temp = temp[0].trim();
				metaData["citation_type"] = "book";
				metaData["citation_issn"] = temp;
				
				//fix subtitle
				temp = metaData["citation_misc"];
				if (temp != "") {
					var tempTwo = metaData["citation_title"];
					if (tempTwo != "") {
						metaData["citation_title"] = tempTwo + " -- " + temp;
					}
				}
				
				//fix author if book
				metaData["citation_authors"] = metaData["citation_authors"].replace(/([\s]+and[\s]+|[\s]*\,[\s]*)/g," ; ");
			}
		}
		
		
		//fix publisher
		temp = metaData["citation_publisher"];
		if (temp == "") metaData["citation_publisher"] = "IOP Publishing";
		
		//reset citation_misc
		metaData["citation_misc"] = "";
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
