var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		// add subtitle if available
		let temp = metaData["citation_misc"].trim();
		if (temp != "") {
			metaData["citation_title"] = metaData["citation_title"] + " -- " + temp;
		}
		
		// fix authors
		metaData["citation_authors"] = metaData["citation_authors"].replace(/^[\s]*edited[\s]+by[\s]*/i,"").replace(/(?:[\s\,]*and[\s]*|[\s]*\,[\s]*)/gi," ; ");
		
		//clear journal
		metaData["citation_journal_title"] = "";
		
		// clear misc
		metaData["citation_misc"] = "";
		
		// fix date
		if (metaData["query_summary"]["citation_date"] == 2) {
			temp = metaData["citation_date"];
			if (temp.search(/hardcover/i) != -1) {
				metaData["citation_date"] = temp.replace(/^.*hardcover[\s|]*([0-9]{4})[^0-9]+.*$/i,
					function(match, $1, offset, original) { return $1; }
				);
			} else {
				metaData["citation_date"] = temp.replace(/([0-9]{4})[^0-9]+.*$/i,
					function(match, $1, offset, original) { return $1; }
				);
			}
		}
		
		//fix publisher
		if (metaData["citation_publisher"] == "") metaData["citation_publisher"] = "Princeton University Press";
		
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
