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
		temp = temp.replace(/J2[\t\ ]+[\--]+[\t\ ]+/,"JA - ").replace(/TI[\t\ ]+[\--]+[\t\ ]+/,"T1 - ").replace(/T2[\t\ ]+[\-]+[\t\ ]+/,"JF - ").trim();
		metaData["citation_download"] = temp;
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//remove (Article), (Review) etc. at the end of title
		var temp = metaData["citation_title"];
		temp = temp.replace(/[\s]*\([^\(\)]*\)$/,"");
		metaData["citation_title"] = temp;
		
		//remove subscript from author names
		temp = metaData["citation_authors"];
		temp = temp.replace(/\.[a-z\ ]*;/g,". ;");
		metaData["citation_authors"] = temp;
		
		//replace in misc field with "page" if page not already included, and let the rest be done by misc parser
		temp = metaData["citation_misc"];
		if (temp.search(/page/i) == -1) temp = temp.replace(/Article\ number/i,"page");
		metaData["citation_misc"] = temp;
		
		//remove volume, issue, page, article number from misc string and send the rest to date
		temp = temp.replace(/volume[^,;]+[,;\ ]*/i,"");
		temp = temp.replace(/issue[^,;]+[,;\ ]*/i,"");
		temp = temp.replace(/page[s]?[^,;]+[,;\ ]*/i,"");
		temp = temp.replace(/article[^,;]+[,;\ ]*/i,"");
		temp = temp.replace(/number[^,;]+[,;\ ]*/i,"");
		temp = temp.replace(/[\ ]+/g," ").trim();
		metaData["citation_date"] = temp;
		
		//fix issn
		temp = metaData["citation_issn"];
		if (temp != "") {
			// first for data from HTML source
			temp = temp.replace(/[^0-9X\-]/g,"");
			if (temp.search(/\-/) == -1 && temp.length == 8) {
				metaData["citation_issn"] = temp.slice(0,4) + "-" + temp.slice(4);
			}
			
			// then for downloaded citation
			var tempTwo = null;
			tempTwo = metaData["citation_download"];
			if (tempTwo != null) tempTwo = tempTwo["citation_issn"];
			if (tempTwo != null && tempTwo != "") {
				tempTwo = tempTwo.replace(/[^0-9X\-]/g,"");
				if (tempTwo.search(/\-/) == -1 && tempTwo.length == 8) {
					metaData["citation_download"]["citation_issn"] = tempTwo.slice(0,4) + "-" + tempTwo.slice(4);
				}	
			}
		}
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
