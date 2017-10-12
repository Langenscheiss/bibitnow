var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//remove volume, issue, page from misc string and send the rest to date
		var temp = metaData["citation_misc"];
		temp = temp.replace(/volume[^,;]+[,;\ ]*/i,"");
		temp = temp.replace(/issue[^,;]+[,;\ ]*/i,"");
		temp = temp.replace(/page[s]?[^,;]+[,;\ ]*/i,"");
		temp = temp.replace(/[\ ]+/g," ").trim();
		metaData["citation_date"] = temp;
		
		//fix issn
		temp = metaData["citation_issn"];
		if (temp != "") {
			temp = temp.replace(/.*journal\//,"").replace(/[^0-9X\-]/g,"");
			if (temp.search(/\-/) == -1 && temp.length == 8) {
				metaData["citation_issn"] = temp.slice(0,4) + "-" + temp.slice(4);
			}
		}
		
		//reformat author names to account for science direct specific formatting
		temp = metaData["citation_authors"];
		if (temp != "") {
			var queryCode = metaData["query_summary"][14];
			var authorString = "";
			var length;
			if (queryCode == -2) {
				temp = temp.replace(/;[\ ]*$/,"").split(";");
				length = temp.length;
				if (temp != null && length > 0) {
					var tempTwo;
					var tempThree;
					
					for(var i = 0; i<length; ++i) {
						tempTwo = temp[i].trim();
						tempThree = tempTwo.search(/\.[\ ]+[^\.\ ][^\.\ ]+/);
						if (tempThree > 0 && tempThree < tempTwo.length-1) {
							tempTwo = tempTwo.slice(tempThree+1).trim() + ", " + tempTwo.slice(0,tempThree).trim() + " ; ";
							authorString += tempTwo;
						} else {
							authorString = "";
							break;
						}
					}
				}
			} else if (queryCode == -1) {
				temp = temp.split(/[\ ]*;[\ ]*/);
				if (temp != null && (length = temp.length-1) > 0) {
					if (length % 2 == 0) {
						for (var i = 0; i<length; ++i) {
							authorString += temp[i+1];
							authorString += ", ";
							authorString += temp[i];
							authorString += " ; ";
							++i;
						}
					}
				}
			}
			if (authorString != "") metaData["citation_authors"] = authorString.trim();
		}
		
		//fix publisher
		if (metaData["citation_publisher"] == "") metaData["citation_publisher"] = "Elsevier B.V.";
		
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
