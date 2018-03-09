var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix abstract, author title and date
		metaData["citation_download"] = metaData["citation_download"].replace(/AB[\t\ ]+[\-]+[\t\ ]+/,"N2 - ").replace(/A[0-9][\t\ ]+[\-]+[\t\ ]+/g,"AU - ").replace(/TI[\t\ ]+[\-]+[\t\ ]+/,"T1 - ").replace(/PY[\t\ ]+[\-]+[\t\ ]+/,"Y1 - ").trim();
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix database
		metaData["citation_database"] = "JSTOR";
		
		//fix author list
		metaData["citation_authors"] = metaData["citation_authors"].replace(/(?:[\s]+and|[\s]*\,)[\s]+/g, ' ; ');
		
		//abstract date from misc
		let date = "";
		let misc = metaData["citation_misc"].replace(/[\s]*\([^\)]*\)[\s]*/gi, 
			function(match, offset, original) {
				if (date.length == 0) date = match;
				return "";
			}
		);
		if (metaData["query_summary"]["citation_date"] == 1 && date == "") {
			metaData["citation_date"] = metaData["citation_date"].replace(/^[^0-9]*date\:[\s]*/i,"");
		} else {
			metaData["citation_date"] = date;
		}
		
		//fix volume and issue
		metaData["citation_misc"] = misc.replace(/vo[l]?[\.\s]+/i,"Volume ").replace(/No[\.\s]+/i,"Issue ").replace(/[p]+[\.\s]+/,"Page ");
		
		//fix abstract
		metaData["citation_abstract"] = metaData["citation_abstract"].replace(/^[\s]*(?:abstract|book[\s]*description)[\s\:\.]*/gi,"");
		
		//fix keywords
		metaData["citation_keywords"] = metaData["citation_keywords"].replace(/^[\s]*topic[s]*[\s\:\.]*/gi,"");
		
		//fix dynamic publisher, and prefer static abstract, title, date, issn over dynamic!
		let download = metaData["citation_download"];
		if (download != null && typeof(download) == 'object') {
			download["citation_publisher"] = download["citation_publisher"].trim().replace(/(?:^[\[]+|[\]]+$)/g,"").trim();
			if (metaData["citation_abstract"] != "") download["citation_abstract"] = "";
			if (metaData["citation_title"] != "") download["citation_title"] = "";
			if (metaData["citation_date"] != "") download["citation_date"] = "";
			if (metaData["citation_issn"] != "") {
				download["citation_issn"] = "";
			} else {
				download["citation_issn"] = download["citation_issn"].replace(/[\s]*\,.*$/i,"");
			}
		}
	}
	
	// expose preformatting function
	return { preformatData : preformatData, preformatRawData: preformatRawData };

}());
