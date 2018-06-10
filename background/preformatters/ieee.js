var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix title and journal, and make conference proceeding a journal (fix when proceedings are possible to cite)
		metaData["citation_download"] = metaData["citation_download"].replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JF - ").replace(/TI[\t\ ]+[\-]+[\t\ ]+/,"T1 - ").replace(/TY[\t\ ]+[\-]+[\t\ ]+CONF/,"TY - JOUR").trim();
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		//fix date string
		metaData["citation_date"] = metaData["citation_date"].replace(/(?:publication|of|date)/gi,"");
		
		//prefer static keywords and authors if available
		let download = metaData["citation_download"];
		if (download != null && typeof(download) == 'object') {
			if (metaData["citation_keywords"] != "") download["citation_keywords"] = "";
			if (metaData["citation_authors"] != "") download["citation_authors"] = "";
		}

		//fix static issn/isbn and type if isbn available
		let issn = metaData["citation_issn"].replace(/(?:^[^0-9X]*|[^0-9X\-]+.*$)/g,"").replace(/[^0-9X\-]/g,"");
		if (issn.replace(/[\-]/g,"").length > 8) metaData["citation_type"] = "book";
		metaData["citation_issn"] = issn;
		
		//set database
		metaData["citation_database"] = "IEEE Xplore Digital Library";
	}
	
	// expose preformatting function
	return { preformatData : preformatData, preformatRawData: preformatRawData };

}());
