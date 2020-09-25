var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix journal abbreviation
		metaData["citation_download"] = metaData["citation_download"].replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JA - ").trim();
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix type and publisher for book
		if (metaData["query_summary"]["citation_issn"] == 1 || metaData["citation_url"].search(/\/(?:[e]?book|chapter)\//i) != -1) {
			metaData["citation_type"] = "book";
			if (metaData["citation_publisher"] == "") metaData["citation_publisher"] = "The Royal Society of Chemistry";
			if (metaData["citation_issn"] == "") {
				let match = metaData["citation_url"].match(/^.*\/([^\/]+)$/i);
				if (match != null && match.length > 1 && (match = match[1].trim()).length > 0) {
					metaData["citation_issn"] = match;
				}
			}
		}
		
		//fix book authors
		if (metaData["query_summary"]["citation_authors"] == 1) {
			metaData["citation_authors"] = metaData["citation_authors"].replace(/^(?:Author|Editor)[s]?[\:\s]*/i,"").replace(/,[\s]+/g,"; ");
		}
		
		//prefer static date
		let download = metaData["citation_download"];
		if (download != null) {
			if (metaData["citation_date"] != "") download["citation_date"] = "";
		}
	}

	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
