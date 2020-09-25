var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix title, year, journal abbreviation and abstract
		metaData["citation_download"] = metaData["citation_download"].replace(/(?:PY|J[AO]|UR)[\t\ ]+[\-]+[\t\ ]+/g,"BIT - ").replace(/AB[\t\ ]+[\-]+[\t\ ]+/g,"N2 - ").trim();
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//extract year from misc
		let temp = metaData["citation_misc"];
		if (temp != "") {
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
		if (metaData["citation_publisher"] == "") metaData["citation_publisher"] = "Taylor & Francis";
		
		//fix type and issn (only journals!)
		metaData["citation_type"] = "article";
		metaData["citation_issn"] = metaData["citation_issn"].slice(0,9);
		
		//database
		metaData["citation_database"] = "Taylor & Francis Online";
		
		//fix abstract, prefer static
		temp = metaData["citation_abstract"].replace(/^[\s]*abstract[\:\s]*/i,"");
		metaData["citation_abstract"] = temp;
		if ((metaData = metaData["citation_download"]) != null && typeof(metaData) == 'object') {
			if (temp != "") metaData["citation_abstract"] = "";
		}
	}
	
	// expose preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
