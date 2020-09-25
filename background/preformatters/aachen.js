var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//do nothing right now (dynamic citation is not worth it for this publisher)
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//modify if thesis
		if (metaData["citation_type"].search(/thesis/i) != -1) {
			metaData["citation_type"] = "thesis";
			metaData["citation_journal_title"] = "RWTH Aachen University";
			metaData["citation_publisher"] = "RWTH Aachen University";
			//only one author for thesis
			metaData["citation_authors"] = metaData["citation_authors"].replace(/[\s]+[\;]+[\s]+.*$/,"");
		} else {
			
			//title case for journal title
			metaData["citation_journal_title"] = BINResources.toTitleCase(metaData["citation_journal_title"]);
			metaData["citation_abstract"] = "";
		}
		
		//get date
		if (metaData["query_summary"]["citation_date"] == 2) metaData["citation_date"] = metaData["citation_date"].replace(/^.*?created/i,"").replace(/[\s][\,]+.*$/,"");
		
		//get doi from misc
		metaData["citation_doi"] = metaData["citation_misc"].replace(/^.*?DOI:[\s]*([^\s]*).*$/i,
			function(match, $1, offset, original) {
				return $1.replace(/URL:.*$/,"");
			}
		);
		
		//clear misc
		metaData["citation_misc"] = "";
		
		//fix title
		metaData["citation_title"] = metaData["citation_title"].replace(/\$[\s]*([^\s].*[^\s])[\s]*\$/g,
			function(match, $1, offset, original) {
				return "$" + $1 + "$";
			}
		);
		
		//database
		metaData["citation_database"] = "RWTH Publications";
		
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
