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
		metaData["citation_download"] = metaData["citation_download"].replace(/J(A|O)[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").replace(/PY[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").trim();
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
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
