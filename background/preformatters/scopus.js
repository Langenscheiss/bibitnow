var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix title, year, pages and journal abbreviation
		metaData["citation_download"] = metaData["citation_download"].replace(/J2[\t\ ]+[\--]+[\t\ ]+/,"JA - ").replace(/TI[\t\ ]+[\--]+[\t\ ]+/,"T1 - ").replace(/T2[\t\ ]+[\-]+[\t\ ]+/,"JF - ").trim();
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//remove (Article), (Review) etc. at the end of title
		metaData["citation_title"] = metaData["citation_title"].replace(/[\s]*\([^\(\)]*\)$/,"");
		
		//remove subscript from author names
		metaData["citation_authors"] = metaData["citation_authors"].replace(/\.[a-z\ ]*;/g,". ;");
		
		//replace in misc field with "page" if page not already included, and let the rest be done by misc parser
		let temp = metaData["citation_misc"];
		if (temp.search(/page/i) == -1) temp = temp.replace(/Article\ number/i,"page");
		metaData["citation_misc"] = temp;
		
		//remove volume, issue, page, article number from misc string and send the rest to date
		metaData["citation_date"] = temp.replace(/(?:volume|issue|page[s]?|article|number)[^,;]+[,;\ ]*/gi,"").replace(/[\ ]+/g," ").trim();
		
		//clear misc in citation download
		if ((temp = metaData["citation_download"]) != null) temp["citation_misc"] = "";
		
		//fix issn
		temp = metaData["citation_issn"];
		if (temp != "") {
			// first for data from HTML source
			temp = temp.replace(/[^0-9X\-]/g,"");
			if (temp.search(/\-/) == -1 && temp.length == 8) {
				metaData["citation_issn"] = temp.slice(0,4) + "-" + temp.slice(4);
			}
			
			// then for downloaded citation
			temp = metaData["citation_download"];
			if (temp != null) temp = temp["citation_issn"];
			if (temp != null && temp != "") {
				temp = temp.replace(/[^0-9X\-]/g,"");
				if (temp.search(/\-/) == -1 && temp.length == 8) {
					metaData["citation_download"]["citation_issn"] = temp.slice(0,4) + "-" + temp.slice(4);
				}	
			}
		}
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
