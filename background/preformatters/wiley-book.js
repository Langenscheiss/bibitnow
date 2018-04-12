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
		
		let misc = metaData["citation_misc"];
		if (misc == "") {
		
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
		} else {
			//fix date
			let match = misc.match(/published:([^;]+);/i);
			if (match != null && match.length > 1) {
				metaData["citation_date"] = match[1].trim();
			}
			
			//fix isbn
			match = misc.match(/print[\s]+isbn:([^\|]+)\|/i);
			if (match != null && match.length > 1) {
				metaData["citation_isbn"] = match[1].trim();
			} else {
				match = misc.match(/isbn:([^\|]+)\|/i);
				if (match != null && match.length > 1) {
					metaData["citation_isbn"] = match[1].trim();
				}
			}
		}
		
		//fix abstract
		metaData["citation_abstract"] = metaData["citation_abstract"].replace(/(?:^[\s]*Product[\s]*Information[\s]*|^[\s]*About[\s]*The[\s]*Product[\s]*)/gi,"").replace(/(?:^[\s]*Product[\s]*Information[\s]*|^[\s]*About[\s]*The[\s]*Product[\s]*)/gi,"").replace(/[\.]+[\s]*show[\s]*(?:more|less)[\s]*$/i,"").trim();
		
		//fix type
		metaData["citation_type"] = "book";
		
		//database
		metaData["citation_database"] = "Wiley Online Library";
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
