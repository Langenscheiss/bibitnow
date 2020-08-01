var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		
		//downloaded citation is crap on iop journals (books are ok actually)
// 		if (metaData["citation_type"].search(/isbn/i) == -1) metaData["citation_download"] = metaData["citation_download"].replace(/(?:A1|AU)[\t\ ]+[\-]+[\t\ ]+/g,"BIT - ").trim();
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//reset citation_misc
		let temp = metaData["citation_misc"];
		metaData["citation_misc"] = "";
		
		//extract from misc
		if (temp != "") {
			let match = ""
			//isbn
			if (metaData["citation_isbn"] == "")  {
				match = temp.match(/print[\s]+isbn[\s\:]+([0-9\-]+)/i);
				if (match != null && match.length > 1 && (match = match[1]).length > 0) {
					metaData["citation_isbn"] = match;
				} else {
					match = temp.match(/isbn[\s\:]+([0-9\-]+)/i);
					if (match != null && match.length > 1 && (match = match[1]).length > 0) metaData["citation_isbn"] = match;
				}
			}
			
			//doi
			if (metaData["citation_doi"] == "")  {
				match = temp.match(/https\:\/\/doi.org\/([^\|]+)/i);
				if (match != null && match.length > 1 && (match = match[1]).length > 0) {
					metaData["citation_doi"] = match;
				}
			}
			
			//authors
			if (metaData["citation_authors"] == "")  {
				match = temp.match(/author[\(\)s]*\:([^\|]+)/i);
				if (match != null && match.length > 1 && (match = match[1]).length > 0) {
					metaData["citation_authors"] = match;
				}
			}
			
			//date
			if (metaData["citation_date"] == "")  {
				match = temp.match(/published[\s\:]+([^\|]+)/i);
				if (match != null && match.length > 1 && (match = match[1]).length > 0) {
					metaData["citation_date"] = match;
				}
			}
			
			//collection title
			if (metaData["citation_collection_title"] == "")  {
				match = temp.match(/\|[\s]+book[\s\:]+([^\|]+)/i);
				if (match != null && match.length > 1 && (match = match[1]).length > 0) {
					metaData["citation_collection_title"] = match;
				}
			}
		}
		
		//fix database
		metaData["citation_database"] = "SPIE Digital Library"
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
