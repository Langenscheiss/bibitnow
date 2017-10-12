var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix authors on amazon
		var temp = metaData["citation_authors"];
		temp = temp.replace(/[\ ;]*Visita\ [^;]*;/gi,"");
		temp = temp.replace(/[\ ;]*Risultati\ [^;]*/gi,"");
		metaData["citation_authors"] = temp;
		
		//preformat publisher
		temp = metaData["citation_misc"];
		var tempTwo = temp.replace(/\([^\(\)]*\)[\ ]*$/,"").match(/Editore[^;\(]*/i);
		if (tempTwo != null && tempTwo.length > 0) metaData["citation_publisher"] = tempTwo[0].replace(/^Editore[\s ]*[:]*/i,"").trim();
		
		//extract ISBN
		tempTwo = temp.match(/ISBN\-13[:\ 0-9X\-]*/i);
		if (tempTwo == null || tempTwo.length == 0) tempTwo = temp.match(/ISBN[:\ 0-9X\-]*/i);
		if (tempTwo != null && tempTwo.length > 0) {
			tempTwo = tempTwo[0];
			metaData["citation_issn"] = tempTwo.replace(/ISBN[^:]*:/,"").trim();
		} else {
			metaData["citation_issn"] = "";
		}
		
		//preformat date
		temp = temp.replace(/Editore[^;\(]*/i,"");
		tempTwo = temp.match(/\([^\(\)]*\)\ ;\ /);
		if (tempTwo != null && tempTwo.length > 0) {
			temp = tempTwo[0];
		} else {
			tempTwo = temp.match(/\([^\(\)]*\)/);
			if (tempTwo != null && tempTwo.length > 0) temp = tempTwo[0];
		}
		metaData["citation_date"] = temp.trim();
		
		//clear misc field to avoid any further interpretations
		metaData["citation_misc"] = "";
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData };

}());
