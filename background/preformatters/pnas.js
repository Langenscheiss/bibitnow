var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix author and journal
		metaData["citation_download"] = metaData["citation_download"].replace(/A1[\t\ ]+[\-]+[\t\ ]+/,"AU - ").replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JF - ").trim();
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix journal abbreviation
		metaData["citation_journal_abbrev"] = "Proc. Natl. Acad. Sci. U.S.A.";
		
		//fix date format (this stupid US format just does not make any sense!!)
		let temp = metaData["citation_date"];
		if (temp != "" && (temp = temp.split(/[\/\-]+/)) != null && temp.length == 3) {
			metaData["citation_date"] = temp[1] + "-" + temp[0] + "-" + temp[2];
		}
		
		//fix abstract, prefer static
		temp = metaData["citation_abstract"].replace(/^[\s]*abstract[\:\s]*/i,"");
		metaData["citation_abstract"] = temp;
		if (temp != "" && (metaData = metaData["citation_download"]) != null && typeof(metaData) == 'object') {
			metaData["citation_abstract"] = "";
		}
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
