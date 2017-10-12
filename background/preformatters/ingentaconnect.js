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
		temp = temp.replace(/TI[\t\ ]+[\-]+[\t\ ]+/,"T1 - ").replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JF - ").trim();
		metaData["citation_download"] = temp;
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		var temp = metaData["citation_misc"];
		temp = temp.replace(/^Source:/i,"").trim();

		//get journal title
		metaData["citation_journal_title"] = temp.replace(/\,.*$/,"").trim();
		temp = temp.replace(/^[^\,]*\,/,"").trim();
		
		//replace pp in misc field with "page" if page not already included, remove number of pages in brackets at the end as well, replace "number" by "issue" and let the rest be done by the misc parser
		temp = temp.replace(/pp\./i,"page");
		temp = temp.replace(/number/i,"issue");
		temp = temp.replace(/\([^\(\)]*\)$/,"").trim();
		metaData["citation_misc"] = temp;
		
		//remove volume, issue, page from misc string and send the rest to date
		temp = temp.replace(/volume[^,;]+[,;\ ]*/i,"");
		temp = temp.replace(/issue[^,;]+[,;\ ]*/i,"");
		temp = temp.replace(/page[s]?[^,;]+[,;\ ]*/i,"");
		temp = temp.replace(/[\ ]+/g," ").trim();
		metaData["citation_date"] = temp;
		
		//fix date obtained from RIS
		temp = metaData["citation_download"];
		if (temp != null) {
			temp = temp["citation_date"];
			if (temp != null && temp.length > 0) {
				temp = temp.replace(/T.*$/,"");
			} else {
				temp = "";
			}
		} else {
			temp = "";
		}
		metaData["citation_download"].citation_date = temp;
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData};

}());
