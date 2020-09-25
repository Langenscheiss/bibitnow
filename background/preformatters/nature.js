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
		let downloaded = metaData["citation_download"];
		if (metaData["query_summary"]["citation_download"] != 3) downloaded = downloaded.replace(/JA[\t\ ]+[\-]+[\t\ ]+/,"BIT - ");
		metaData["citation_download"] = downloaded.replace(/(?:T[0-9I]|PY|PB)[\t\ ]+[\-]+[\t\ ]+/g,"BIT - ").trim();
	}
	
	// preformatting function
	function preformatData(metaData, parser) {
		
		
		//fix first page from misc if possible, otherwise set issue and fix what is possible to fix
		let bibField = metaData["citation_misc"];
		bibField = bibField.match(/Article.?number:[\ ]*([^\ \(]+)/i);
		if (bibField != null && bibField.length > 1) bibField = bibField[1];
		if (bibField == null) bibField = "";
		if (metaData["citation_firstpage"] == "" || metaData["citation_firstpage"].search(/[a-z]/i) != -1) {
			metaData["citation_firstpage"] = bibField;
			metaData["citation_lastpage"] = "";
		} else {
			metaData["citation_issue"] = bibField;
		}
		
		//clear misc
		metaData["citation_misc"] = "";
		
		//fix article number on nature communications
		metaData["citation_firstpage"] = metaData["citation_firstpage"].replace(/ncomms/g,"");
		
		//fix title
		metaData["citation_title"] = metaData["citation_title"].replace(/\[quest\]/,"?");
		
		//fix doi
		metaData["citation_doi"] = metaData["citation_doi"].replace(/^.*doi/,"").trim().replace(/[\ ]+[^\ ]*$/,"");
		
		//fix volume and issue and doi
		if (metaData["query_summary"]["citation_volume"] == 2) {
			bibField = metaData["citation_volume"];
			metaData["citation_volume"] = bibField.replace(/^.*volumeNum=/,"").replace(/[^0-9]+.*$/g,"").trim();
			if (metaData["citation_issue"] == "") metaData["citation_issue"] = bibField.replace(/^.*issueNum=/,"").replace(/[^0-9]+.*$/g,"").trim();
			if (metaData["citation_doi"] == "") metaData["citation_doi"] = decodeURIComponent(bibField).replace(/^.*contentID=/,"").replace(/\&.*$/g,"").trim();
		}
		
		//override dynamically obtained first page and issue
		bibField = metaData["citation_firstpage"];
		let issue = metaData["citation_issue"];
		if (bibField != "" && (metaData = metaData["citation_download"]) != null && typeof(metaData) == 'object') { 
			if (bibField != null && typeof(bibField) == 'string' && bibField != "") metaData["citation_firstpage"] = "";
			if (issue != null && typeof(issue) == 'string' && issue != "") metaData["citation_issue"] = "";
		}
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
