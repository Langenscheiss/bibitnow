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
		
		//prefer static keywords if available
		if (metaData["citation_keywords"] != "" && metaData["citation_download"] != null && typeof(metaData["citation_download"]) == 'object') {
			metaData["citation_download"]["citation_keywords"] = "";
		}
	}
	
	// expose preformatting function
	return { preformatData : preformatData, preformatRawData: preformatRawData };

}());
