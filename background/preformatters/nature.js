var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix title, year, publisher and journal abbreviation
		var temp = metaData["citation_download"];
		if (metaData["query_summary"]["citation_download"] != 3) temp = temp.replace(/JA[\t\ ]+[\-]+[\t\ ]+/,"BIT - ");
		temp = temp.replace(/T[0-9I][\t\ ]+[\-]+[\t\ ]+/,"BIT - ").replace(/PY[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").replace(/PB[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").trim();
		metaData["citation_download"] = temp;
	}
	
	// preformatting function
	function preformatData(metaData, parser) {
		
		//fix first page from misc if possible, otherwise fix what is possible to fix
		var temp = metaData["citation_misc"];
		if (metaData["citation_firstpage"] == "" || metaData["citation_firstpage"].search(/[a-z]/i) != -1) {
			temp = temp.match(/Article.?number:[\ ]*([^\ \(]+)/i);
			if (temp != null && temp.length > 1) {
				metaData["citation_firstpage"] = temp[1];
			}
		}
		
		//fix article number on nature communications
		temp = metaData["citation_firstpage"];
		temp = temp.replace(/ncomms/g,"");
		metaData["citation_firstpage"] = temp;
		
		metaData["citation_misc"] = "";
		
		//fix title
		temp = metaData["citation_title"];
		temp = temp.replace(/\[quest\]/,"?");
		metaData["citation_title"] = temp;

	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
