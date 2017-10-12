var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
			
		//fix authors
		var temp = "";
		if ((temp = metaData["citation_authors"]) != "") {
			metaData["citation_authors"] = temp.replace(/^[^\:]*\:[\ ]*/,"").replace(/\([^\(\)]*\)/g,"").replace(/[\ ]*\,[\ ]*/g," ; ");
		}
		
		//fix type
		metaData["citation_type"] = "book";
		
		//fix publisher
		if ((temp = metaData["citation_publisher"]) == "") {
			if ((temp = metaData["citation_journal_title"]) != "") {
				metaData["citation_publisher"] = temp;
			} else {
				metaData["citation_publisher"] = "World Scientific Publishing Company";
			}
		}
		metaData["citation_journal_title"] = "";
		
		//fix date
		metaData["citation_date"] = metaData["citation_date"].replace(/^.*pp[\ ]*/,"");
	}
	
	// expose preformatter
	return { preformatData : preformatData };

}());
