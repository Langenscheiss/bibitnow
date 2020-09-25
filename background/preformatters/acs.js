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
		metaData["citation_download"] = metaData["citation_download"].replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JA - ").replace(/(?:PY|N1|M3)[\t\ ]+[\-]+[\t\ ]+/g,"BIT - ").trim();
	}
	
	//preformatting function
	function preformatData(metaData, parser) {	
		//preformat misc for journal abbrev, issue and pages
		let temp = metaData["citation_misc"];
		if (temp != "") {
			temp = temp.split(";");
			if (temp != null && temp.length > 0) {
				let val;
				if (temp.length > 0) {
					val = temp[0];
					if (val != null && val.search(/[0-9]/) != -1) metaData["citation_journal_abbrev"] = val;
				}
				if (temp.length > 2) {
					val = temp[2];
					if (val != null && val.search(/[0-9]/) != -1) metaData["citation_volume"] = val;
				}
				if (temp.length > 3) {
					val = temp[3];
					if (val != null && val.search(/[0-9]/) != -1) metaData["citation_issue"] = val;
				}
				if (temp.length > 4) {
					val = temp[4];
					if (val != null && val.search(/[0-9]/) != -1) metaData["citation_firstpage"] = val;
				}
			}
		}
		//reset misc
		metaData["citation_misc"] = "";
		
		//fix date
		metaData["citation_date"] = metaData["citation_date"].replace(/^.*issue[\s]*/i,"");
		
		//preformat issn link to extract issn
		temp = metaData["citation_issn"];
		if (temp != "") {
			temp = temp.match(/issn%3D[0-9X\-]+/i);
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
