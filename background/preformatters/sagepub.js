var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix abbreviation
		var temp = metaData["citation_download"];
		temp = temp.replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JA - ").trim();
		metaData["citation_download"] = temp;
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//properly separate volume from issue in misc field
		var temp = metaData["citation_misc"];
		temp = temp.replace(/issue/i,", issue");
		metaData["citation_misc"] = temp;
		
		//separate pages if available
		temp = metaData["citation_firstpage"];
		temp = temp.split(/[\-]+/);
		if (temp != null && temp.length > 1 && metaData["citation_lastpage"] == "") {
			metaData["citation_firstpage"] = temp[0].trim();
			metaData["citation_lastpage"] = temp[1].trim();
		}
		
		//extract correct date
		temp = metaData["citation_date"];
		var tempTwo = temp.search(/published:/);
		if (tempTwo == -1) tempTwo = temp.search(/published online:/);
		if (tempTwo != -1) {
			metaData["citation_date"] = temp.slice(tempTwo).replace(/^[^:]*[:]/,"").trim();
		}
		
	}
	
	// expose preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
