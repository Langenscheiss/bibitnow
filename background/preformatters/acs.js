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
		metaData["citation_download"] = metaData["citation_download"].replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JA - ").replace(/PY[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").trim();
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//preformat misc for journal abbrev, issue and pages
		let temp = metaData["citation_misc"];
		if (temp != "") {
			temp = temp.split(",");
			if (temp != null && temp.length > 0) {
				metaData["citation_journal_abbrev"] = temp[0].trim();
				let page = temp[temp.length-1].replace(/[p\ \.]+/g,"").trim();
				page = page.split(/[\u002D\uFF0D\uFE63\u207B\u208B\u00AD\u058A\u2010\u2013\u2011\u2043]/);
				
				if (page.length > 0 && page[0] != "ArticleASAP" && page[0] != "JustAccetedManuscrit") metaData["citation_firstpage"] = page[0].trim();
				if (page.length > 1) metaData["citation_lastpage"] = page[1].trim();
				if (temp.length > 2) {
					temp = temp[temp.length - 2].match(/\([^\(\)]*\)/);
					if (temp != null && temp.length > 0) {
						metaData["citation_issue"] = temp[0].replace(/[\(\)]/g,"").trim();
					}
				}
			}
		}
		//reset misc
		metaData["citation_misc"] = "";
		
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
