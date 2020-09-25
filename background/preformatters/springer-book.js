var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//set doi
		let temp = metaData["citation_misc"].replace(/;.*$/,"").trim();
		let tempTwo = metaData["citation_doi"].replace(/\/.*$/,"").trim();
		if (temp != "") {
			metaData["citation_doi"] = "" + tempTwo + "/" + temp;
		} else if (tempTwo != "") {
			metaData["citation_doi"] = metaData["citation_doi"].replace(/\_[0-9]+$/,"").trim();
		}
		
		//get address
		temp = metaData["citation_publisher_address"].replace(/^.*Copyright\ Holder\ \|\-\|\ /i,"").replace(/\ \|\-\|.*$/gi,"").trim();
		if (temp.search("Springer Nature Switzerland") != -1) {
			temp += " Cham";
		} else if ((temp.search("Palgrave Macmillan") != -1 && metaData["citation_publisher"].search(/(?:\s|^)UK(?:\s|$)/) != -1) || metaData["citation_publisher"].search("Palgrave Macmillan UK") != -1) {
			temp += " London";
		} else if ((temp.search("Palgrave Macmillan") != -1 && metaData["citation_publisher"].search(/(?:\s|^)US(?:\s|$)/) != -1) || metaData["citation_publisher"].search("Palgrave Macmillan US") != -1) {
			temp += " New York";
		} else if (temp.search("Springer-Verlag GmbH") != -1) {
			temp += " Berlin";
		} else if (temp.search(/(?:editor|author)/i) != -1) {
			temp = "";
		}
		metaData["citation_publisher_address"] = temp;
		
		//reset misc
		metaData["citation_misc"] = "";
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
