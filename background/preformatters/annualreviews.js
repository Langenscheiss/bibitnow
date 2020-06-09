var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix title, year, misc and journal abbreviation
		metaData["citation_download"] = metaData["citation_download"].replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JA - ").replace(/(?:PY|N1)[\t\ ]+[\-]+[\t\ ]+/g,"BIT - ").trim();
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//get volume, pages
		let temp = metaData["citation_misc"].replace(/\ \(Volume[^\)]*\).*$/i,"").split(":");
		if (temp != null && temp.length > 0) {
			metaData["citation_volume"] = temp[0].replace(/^[^\ ]*\ /i,"").trim();
			if (temp.length > 1) {
				temp = temp[1].split("-");
				if (temp != null && temp.length > 0) {
					metaData["citation_firstpage"] = temp[0].trim();
					if (temp.length > 1) metaData["citation_lastpage"] = temp[1].trim();
				}
			}
		}
		
		//fix abstract
		metaData["citation_abstract"] = metaData["citation_abstract"].replace(/^[^a-zA-Z0-9]+[aA]bstract/,"");
		
		//fix publisher
		metaData["citation_publisher"] = "Annual Reviews";
		
		//preformat rights link to extract issn
		temp = metaData["citation_issn"];
		if (temp != "") {
			temp = temp.match(/issn=[0-9X\-]+/i);
			if (temp != null && temp.length > 0) {
				metaData["citation_issn"] = temp[0].replace(/issn%3D/,"").trim();
			} else {
				metaData["citation_issn"] = "";
			}
		}
		metaData["citation_misc"] = "";
	}
	
	//return preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData : preformatRawData };

}());
