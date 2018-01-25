var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		
		//remove all references before processing
		metaData["citation_download"] = metaData["citation_download"].slice(0,metaData["citation_download"].search(/ER[\t\ ]+[\-]+/))+"ER - ";
		//fix title, year and journal abbreviation
		metaData["citation_download"] = metaData["citation_download"].replace(/J(A|O)[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").replace(/PY[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").trim();
		
		//if DA available, remove Y1 and choose DA instead as date source
		if (metaData["citation_download"].search(/DA[\t\ ]+[\-]+[\t\ ]+/) != -1) metaData["citation_download"] = metaData["citation_download"].replace(/Y1[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").replace(/DA[\t\ ]+[\-]+[\t\ ]+/,"Y1 - ").trim();
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//preformat issn link to extract issn
		temp = metaData["citation_issn"];
		if (temp != "") {
			temp = temp.match(/issn%3D[0-9X\-]{1,9}/i);
			if (temp != null && temp.length > 0) {
				metaData["citation_issn"] = temp[0].replace(/issn%3D/,"").trim();
			} else {
				metaData["citation_issn"] = "";
			}
		}
		
		//fix keywords if taken from topic list
		if (metaData["query_summary"]["citation_keywords"] == 2) metaData["citation_keywords"] = metaData["citation_keywords"].toLowerCase();
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
