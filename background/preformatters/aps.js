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
		temp = temp.replace(/TI[\t\ ]+[\-]+[\t\ ]+/,"T1 - ").replace(/PY[\t\ ]+[\-]+[\t\ ]+/,"Y1 - ").replace(/ID[\t\ ]+[\-]+[\t\ ]+/,"DO - ").trim();
		metaData["citation_download"] = temp;
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix issn
		var temp = metaData["citation_issn"];
		temp = temp.match(/ISSN[0-9X\-\ ]+/);
		if (temp != null && temp.length > 0) {
			temp = temp[0].trim();
			metaData["citation_issn"] = temp;
		} else {
			metaData["citation_issn"] = "";
		}
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
