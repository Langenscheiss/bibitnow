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
		metaData["citation_authors"] = metaData["citation_authors"].replace(/^[^\:]*\:[\ ]*/,"").replace(/[\ ]*\,[\ ]*/g," ; ");
		
		//fix journal title for Cochrane
		if (metaData["citation_journal_title"] == "" && metaData["citation_misc"].search(/cochrane/i) != -1) {
			metaData["citation_journal_title"] = "Cochrane Database of Systematic Reviews";
			metaData["citation_journal_abbrev"] = "CDSR";
		}
		
		//fix publisher
		let publisher = metaData["citation_publisher"];
		if (publisher == "") {
			metaData["citation_publisher"] = "Wiley";
		} else if (metaData["query_summary"]["citation_publisher"] >= 1) {
			metaData["citation_publisher"] = publisher.replace(/^[^0-9]*[0-9]+[\ ]*/,"").replace(/^by[\ ]*/i,"");
		}
		
		//fix date (remove exact time of day!)
		metaData["citation_date"] = metaData["citation_date"].replace(/[0-9][0-9]?:[0-9][0-9]?/,"");
		
		//fix type
		metaData["citation_type"] = "book";
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
