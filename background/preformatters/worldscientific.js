var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix journal abbreviation
		metaData["citation_download"] = metaData["citation_download"].replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JA - ").trim();
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//check if first page is available, and reformat if yes. Otherwise, reset first page
		let temp = metaData["citation_firstpage"].match(/\,[^\(\,]+\(/i)
		if (temp != null && temp.length > 0) {
			metaData["citation_firstpage"] = temp[0].replace(/[\ \,\(]/g,"").trim();
		} else {
			metaData["citation_firstpage"] = "";
		}
		
		//fix abstract, prefer static
		let abstract = metaData["citation_abstract"].replace(/^[\s]*abstract[\:\s]*/i,"");
		if ((metaData = metaData["citation_download"]) != null && typeof(metaData) == 'object') {
			if (abstract != "") metaData["citation_abstract"] = "";
		}
		metaData["citation_abstract"] = abstract;
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
