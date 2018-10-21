var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix author list
		metaData["citation_authors"] = metaData["citation_authors"].replace(/[\s]*\([^\(]+\)[\s]*/g,"").replace(/[\ ]*\,[\ ]*/g," ; ");
		
		//fix publisher and journal
		metaData["citation_journal_title"] = "";
		if (metaData["citation_publisher"] == "") {
			metaData["citation_publisher"] = "Wiley";
		}
		
		//fix date/isbn etc.
		let misc = metaData["citation_misc"].replace(/^[^\;]*;[\s]*/,"").replace(/[\s]*;[\s]*[0-9]+[\s]*page[^\;]*(?:;|$)/i,"");
		metaData["citation_misc"] = "";
		metaData["citation_json"] = "";
		
		if (misc != "" && (metaData["citation_isbn"] == "" || metaData["citation_date"] == "")) {
			//fix isbn if necessary
			misc = misc.replace(/isbn[\s\:]*[0-9X\-]+/i, function(match,offset,original) {
					if (metaData["citation_isbn"] == "") metaData["citation_isbn"] = match;
					return "";
				}
			);
			
			//fix date if necessary
			if (metaData["citation_date"] == "") metaData["citation_date"] = misc;
		}
		
		//fix abstract
		metaData["citation_abstract"] = metaData["citation_abstract"].replace(/(?:^[\s]*Description[\s]*|^[\s]*About[\s]*The[\s]*Product[\s]*)/gi,"").replace(/[\.]+[\s]*show[\s]*(?:more|less)[\s]*$/i,"").trim();
		
		//fix type
		metaData["citation_type"] = "book";

		//database
		metaData["citation_database"] = "Wiley Online Shop";
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
