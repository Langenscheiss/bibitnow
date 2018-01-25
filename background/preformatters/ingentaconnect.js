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
		metaData["citation_download"] = metaData["citation_download"].replace(/TI[\t\ ]+[\-]+[\t\ ]+/,"T1 - ").replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JF - ").replace(/PY[\t\ ]+[\-]+[\t\ ]+/,"Y1 - ").trim();
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//first check whether it is a book
		let misc = metaData["citation_misc"];
		if (misc.search(/isbn/i) != -1) {
			metaData["citation_type"] = "book";
			//extract isbn
			misc = misc.replace(/^.*isbn[\:\s]*/i,"").trim();
			metaData["citation_issn"] = misc.replace(/[^0-9]+.*$/,"");
			
			//extract date
			misc = misc.replace(/^.*publication[\s]*date/i,"");
			metaData["citation_date"] = misc.replace(/;.*$/i,"");
			
			//extract author
			misc = misc.replace(/^.*author[s\:]*/i,"").trim();
			metaData["citation_authors"] = misc;
		} else {
		
			misc = misc.replace(/^Source:/i,"").trim();
						
			//get journal title
			metaData["citation_journal_title"] = misc.replace(/\,.*$/,"").trim();
			
			//replace pp in misc field with "page" if page not already included, remove number of pages in brackets at the end as well, replace "number" by "issue" and let the rest be done by the misc parser
			misc = misc.replace(/^[^\,]*\,/,"").trim().replace(/pp\./i,"page").replace(/number/i,"issue").replace(/\([^\(\)]*\)$/,"").trim();
			metaData["citation_misc"] = misc;
			
			//remove volume, issue, page from misc string and send the rest to date
			metaData["citation_date"] = misc.replace(/(?:volume|issue|page[s]?)[^,;]+[,;\ ]*/gi,"").replace(/[\ ]+/g," ").trim();
			
			//fix date and abstract obtained from RIS
			misc = metaData["citation_download"];
			if (misc != null && typeof(misc) == 'object') {
				misc = misc["citation_date"];
				if (misc != null) metaData["citation_download"]["citation_date"] = misc.replace(/T.*$/,"");
				if (metaData["citation_abstract"] != "") metaData["citation_download"]["citation_abstract"] = "";
			}
		}
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData};

}());
