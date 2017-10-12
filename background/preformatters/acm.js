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
		var temp = metaData["citation_download"];
		temp = parser.EndnoteToRis(temp);
		metaData["citation_download"] = temp;
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix journal title
		var temp = metaData["citation_journal_title"];
		var tempTwo = temp.match(/\([^\(\)]*\)$/);
		if (tempTwo != null && tempTwo.length > 0) {
			metaData["citation_journal_abbrev"] = "ACM " + tempTwo[0].replace(/[\(\)]/gi,"").trim();
		}
		metaData["citation_journal_title"] = temp.replace(/\([^\(\)]*\)$/,"").trim();
		
		//fix author list
		temp = metaData["citation_authors"];
		if (temp != "") {
			metaData["citation_authors"] = temp.replace(/;\ /g, " ; ").replace(/\ ;\ $/,"").trim();
		}
		
		//fix date format
		temp = metaData["citation_date"];
		temp = temp.split("/");
		if (temp != null && temp.length == 3) {
			temp = temp[1] + "/" + temp[0] + "/" + temp[2];
			metaData["citation_date"] = temp;
		}
		
		//check if book
		if (metaData["citation_misc"] != "") metaData["citation_type"] = "book";
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
