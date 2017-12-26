var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix title, year and journal abbreviation. Do not use title from citation download, due to latex characters
		metaData["citation_download"] = metaData["citation_download"].replace(/TI[\t\ ]+[\-]+[\t\ ]+/,"T1 - ").replace(/PY[\t\ ]+[\-]+[\t\ ]+/,"Y1 - ").replace(/ID[\t\ ]+[\-]+[\t\ ]+/,"DO - ").trim();
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix authors in case of group authors
		if(metaData["query_summary"]["citation_authors"] == 2) {
			metaData["citation_authors"] = metaData["citation_authors"].replace(/(?:[\s]*et[\s]*al[\.\ ]*|\([^\(\)]+\))/gi,"").trim();
		}
		
		//fix issn
		let issn = metaData["citation_issn"].match(/ISSN[0-9X\-\ ]+/);
		if (issn != null && issn.length > 0) {
			metaData["citation_issn"] = issn[0].trim();
		} else {
			metaData["citation_issn"] = "";
		}
		
		//fix non-latex title by replacing it with the statically obtained title (which does not have math mode instructions)
		metaData["citation_title_nonlatex"] = metaData["citation_title"];
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
