var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix title, year and journal abbreviation
		var temp = metaData["citation_download"];
		temp = temp.replace(/PY[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").replace(/(J[AO]|UR)[\t\ ]+[\-]+[\t\ ]+/g,"BIT - ").trim();
		metaData["citation_download"] = temp;
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//extract year from misc
		var temp = "";
		if ((temp = metaData["citation_misc"]) != "") {
			temp = temp.replace(/volume[^\,]*\,/,"").match(/[0-9][0-9][0-9][0-9]/);
			if (temp != null && temp.length > 0) {
				temp = temp[0];
			} else {
				temp = "";
			}
		}
		
		//if not available, choose online date	
		if (temp != "") {
			metaData["citation_date"] = temp;
		} else if ((temp = metaData["query_summary"]["citation_date"]) <= 2 && temp > 0) {
			metaData["citation_date"] = metaData["citation_date"].replace(/^.*published[^0-9]+/i,"");
		}
		
		//get issn from doi
		temp = metaData["citation_doi"];
		if (temp != "") {
			temp = temp.replace(/^.*\//,"").replace(/\..*$/,"");
			if (temp != "") metaData["citation_issn"] = temp.slice(0,4) + "-" + temp.slice(4);
		}
		
		//fix publisher
		if (metaData["citation_publisher"] == "") {
			metaData["citation_publisher"] = "Taylor & Francis";
		}
		
		//fix type and issn (only journals!)
		metaData["citation_type"] = "article";
		metaData["citation_issn"] = metaData["citation_issn"].slice(0,9);
	}
	
	// expose preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
