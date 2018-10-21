var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		
		//parse from endnote to ris
		metaData["citation_download"] = parser.EndnoteToRis(metaData["citation_download"]);
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix journal title
		let temp = metaData["citation_journal_title"];
		let tempTwo = temp.match(/\([^\(\)]*\)$/);
		if (tempTwo != null && tempTwo.length > 0) metaData["citation_journal_abbrev"] = "ACM " + tempTwo[0].replace(/[\(\)]/gi,"").trim();
		metaData["citation_journal_title"] = temp.replace(/\([^\(\)]*\)$/,"").trim();
		
		//fix author list
		temp = metaData["citation_authors"];
		metaData["citation_authors"] = temp != "" ? temp.replace(/;\ /g, " ; ").replace(/\ ;\ $/,"").trim() : "";
			
		//fix date format
		temp = metaData["citation_date"].split("/");
		if (temp != null && temp.length == 3) metaData["citation_date"] = temp[1] + "/" + temp[0] + "/" + temp[2];

		//check if book
		if (metaData["citation_misc"] != "") {
			metaData["citation_type"] = "book";
			//clear misc
			metaData["citation_misc"] = "";
		}
		       
		//fix pages
		if ((temp = metaData["citation_download"]) != null && typeof(temp) == 'object') {
			temp = temp["citation_firstpage"].split(/\-/);
			if (temp != null && temp.length > 0) {
				metaData["citation_download"]["citation_firstpage"] = temp[0];
				if (temp.length > 1) metaData["citation_download"]["citation_lastpage"] = temp[1];
			}
		}
		//set database
		metaData["citation_database"] = "ACM Digital Library";
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
