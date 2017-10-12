var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//check if first page is available, and reformat if yes. Otherwise, reset first page
		var temp = metaData["citation_firstpage"];
		temp = temp.match(/\,[^\(\,]+\(/i);
		if (temp != null && temp.length > 0) {
			temp = temp[0].replace(/[\ \,\(]/g,"").trim();
		} else {
			temp = "";
		}
		metaData["citation_firstpage"] = temp;
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
