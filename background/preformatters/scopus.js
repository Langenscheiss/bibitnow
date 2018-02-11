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
		
		//fix type
		metaData["citation_type"] = metaData["citation_type"].replace(/^.*document[\s]+type/i,"").replace(/[\s]*;.*$/,"");
		if (metaData["citation_type"].search(/book/i) != -1) {
			metaData["citation_journal_title"] = "";
			metaData["citation_journal_abbrev"] = "";
			let download = metaData["citation_download"]; 
			if (download != null && typeof(download) == 'object') {
				download["citation_journal_title"] = "";
				download["citation_journal_abbrev"] = "";
			}
		} else {
			metaData["citation_type"] = "";
		}
		
		//remove (Article), (Review) etc. at the end of title		
		//prefer formatted static title
		let temp = metaData["citation_title"];
		if (temp != "") {
			metaData["citation_title"] = temp.replace(/[\s]*\([^\(\)]*\)$/,"");
			if ((temp = metaData["citation_download"]) != null && typeof(temp) == 'object') temp["citation_title"] = "";
		}
		
		//remove subscript from author names
		metaData["citation_authors"] = metaData["citation_authors"].replace(/\.[a-z\s]*(?:;|$)/g,". ;");
		console.log(metaData["citation_authors"]);
		
		
		//replace in misc field with "page" if page not already included, and let the rest be done by misc parser
		temp = metaData["citation_misc"];
		if (temp.search(/page/i) == -1) temp = temp.replace(/Article\ number/i,"page");
		metaData["citation_misc"] = temp;
		
		//remove volume, issue, page, article number from misc string and send the rest to date
		metaData["citation_date"] = temp.replace(/(?:volume|issue|page[s]?|article|number)[^,;]+[,;\ ]*/gi,"").replace(/[\ ]+/g," ").trim();
		
		//fix issn
		temp = metaData["citation_issn"].replace(/[^0-9X\-]/g,"");
		if (temp.search(/\-/) == -1 && temp.length == 8) {
			metaData["citation_issn"] = temp.slice(0,4) + "-" + temp.slice(4);
		}
		
		//fix abstract
		metaData["citation_abstract"] = metaData["citation_abstract"].replace(/(?:Copyright[\s]*)?©.*$/i,"");
		
		//fix downloaded issn, clear downloaded misc and, preferrably, abstract in citation download and
		if ((temp = metaData["citation_download"]) != null && typeof(temp) == 'object') {
			temp["citation_misc"] = "";
			if (metaData["citation_abstract"] != "") temp["citation_abstract"] = "";
			
			//issn
			temp = temp["citation_issn"].replace(/[^0-9X\-]/g,"");
			if (temp.search(/\-/) == -1 && temp.length == 8) {
				metaData["citation_download"]["citation_issn"] = temp.slice(0,4) + "-" + temp.slice(4);
			}
		}
		
		//set database
		metaData["citation_database"] = "Scopus";
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
