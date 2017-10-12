var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//preformat misc for date
		var temp = metaData["citation_misc"];
		var tempTwo = "";
		if (temp != "") {
			tempTwo = temp.match(/Published[^;\(]*/i);
			if (tempTwo != null && tempTwo.length > 0) {
				metaData["citation_date"] = tempTwo[0].replace(/^Published[\s ]*[:]*/i,"").trim();
			}
			metaData["citation_misc"] = "";
		}
		
		//preformat isbn
		temp = metaData["citation_issn"];
		if (temp != null) {
			tempTwo = temp.match(/ISBN[^;\(]*/i);
			if (tempTwo != null && tempTwo.length > 0) {
				metaData["citation_issn"] = tempTwo[0].replace(/[^0-9X\-]/g,"").replace(/^978/,"978-").replace(/^979/,"979-").replace(/[\-]+/g,"-");
			} else {
				metaData["citation_issn"] = "";
			}
		}
		
		//fix publisher
		temp = metaData["citation_publisher"];
		temp = temp.replace(/[\ ]*\(OUP\)$/,"");
		metaData["citation_publisher"] = temp;
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
