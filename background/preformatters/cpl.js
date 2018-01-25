var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//manually set journal
		metaData["citation_journal_title"] = "Chalmers Publication Library";
		metaData["citation_journal_abbrev"] = "CPL";
		
		//null volume, issue, pages
		metaData["citation_volume"] = "";
		metaData["citation_issue"] = "";
		metaData["citation_firstpage"] = "";
		metaData["citation_lastpage"] = "";
		
		//get pubid from url
		var temp = metaData["citation_url"];
		temp = temp.replace(/^.*se\/publication\//,"");
		temp = temp.match(/^[0-9]+/);
		if (temp != null && temp.length > 0) metaData["citation_archive_id"] = temp[0].trim();
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
