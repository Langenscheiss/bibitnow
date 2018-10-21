var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		
		//fix date and attempt to determine date scheme
		let temp = metaData["citation_date"].trim();
		metaData["citation_date"] = temp.replace(/[\s].*$/,"");
		if (temp.search(/(?:AM|PM|^[0-9]{1,2}\/)/) != -1) {
			metaData["citation_date_reverse"] = true; 
		}
		
		//get temp from url
		temp = metaData["citation_url"].replace(/^.*se\/.*publication\//,"");
		if (temp != "") temp = temp.match(/^[0-9]+/);
		if (temp != null && temp.length > 0) {
			//if id found, remove all info related to actual journal
			metaData["citation_journal_title"] = "Chalmers Research";
			metaData["citation_archive_id"] = temp[0].trim();
			metaData["citation_issue"] = "";
			metaData["citation_volume"] = "";
			metaData["citation_firstpage"] = "";
			metaData["citation_issn"] = "";
		}
		
		//database
		metaData["citation_database"] = "Chalmers Research Database";

		//if thesis, reset publisher
		if ((temp = metaData["citation_misc"]) != "") {
			metaData["citation_type"] = "thesis";
			metaData["citation_publisher"] = temp;
		} else if (metaData["citation_type"].search(/dissertation/i) != -1) {
			metaData["citation_type"] = "thesis";
			metaData["citation_publisher"] = "Chalmers University Of Technology";
		} else if (metaData["citation_type"].search(/bok/i) != -1) {
			metaData["citation_type"] = "book";
		}
		
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
