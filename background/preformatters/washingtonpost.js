var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//do nothing, as there is no dynamic citation export being requested
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		
		//fix date, remove time of day depending on which request was successful
		if (metaData["query_summary"]["citation_date"] == 1) {
			//remove time of day
			metaData["citation_date"] = metaData["citation_date"].replace(/T.*$/i,"");
		} else if (metaData["query_summary"]["citation_date"] == 2) {
			//use "last modified" year of webpage if not stated in retrieved date
			let date = metaData["citation_date"].replace(/[\s]*at.*$/i,"");
			if (date.search(/[0-9]{4}/) == -1) {
				date += " " + metaData["citation_webpage_date"].replace(/\-.*$/,"");
			}
			metaData["citation_date"] = date;
		}
		
		//fix date and author names in json
		let json = metaData["citation_json"];
		if (json != null && typeof(json) == 'object') {
			
			if (metaData["citation_authors"] != "") {
				json["citation_authors"] = "";
			} else {
				json["citation_authors"] = json["citation_authors"].replace(/\,/g," ;");
			}
			json["citation_date"] = json["citation_date"].replace(/T.*$/i,"");
		}
		
		//add issn (taken from wiki)
		metaData["citation_issn"] = "0190-8286";
		
		metaData["citation_misc"] = "";
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
