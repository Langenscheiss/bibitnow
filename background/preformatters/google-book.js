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
		temp = temp.replace(/PY[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").trim();
		metaData["citation_download"] = temp;
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//downloaded
		var downloaded = metaData["citation_download"];
		
		//fix publisher and date
		var temp;
		if ((temp = metaData["citation_publisher"]) != "") {
			metaData["citation_publisher"] = temp.replace(/\,.*$/,"");
		} else if (downloaded != null) {
			metaData["citation_publisher"] = downloaded["citation_publisher"];
		}
		if ((temp = metaData["citation_date"]) != "") {
			metaData["citation_date"] = temp.replace(/^[^\,]*\,[\s]*/,"").replace(/[\s]*\-.*$/,"");
		} else if (downloaded != null) {
			metaData["citation_date"] = downloaded["citation_date"];
		}
		
		//fix ISBN
		if ((temp = metaData["citation_misc"]) != "") {
			metaData["citation_issn"] = temp.replace(/^.*\;[\s]*ISBN[\s]*/,"").replace(/^[^\,]*\,[\s]*/,"").replace(/[^0-9X]+.*$/,"").replace(/^978/,"978-").replace(/^979/,"979-").replace(/[\-]+/g,"-");
		} else if (downloaded != null) {
			metaData["citation_issn"] = downloaded["citation_issn"].replace(/^978/,"978-").replace(/^979/,"979-");
		}
		
		//fix author and title
		if (metaData["citation_title"] == "" && downloaded != null) metaData["citation_title"] = downloaded["citation_title"];
		if (metaData["citation_authors"] == "" && downloaded != null) metaData["citation_authors"] = downloaded["citation_authors"];
		       
		//clear journal title, downloaded ris and misc
		metaData["citation_download"] = "";
		metaData["citation_journal_title"] = "";
		metaData["citation_misc"] = "";
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData};

}());
