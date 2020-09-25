var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//do nothing, as there is no dynamic citation export being requested
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		let temp = metaData["citation_misc"];
		metaData["citation_misc"] = "";
		if (temp != "") {
			//get publisher
			let tempTwo = "";
			if (temp.search(/\|\-\|\ Imprint/i) != -1) {
				tempTwo = temp.replace(/^.*\|\-\|\ Imprint/i,"");
			} else if (temp.search(/\|\-\|\ Publisher/i) != -1) {
				tempTwo = temp.replace(/^.*\|\-\|\ Publisher/i,"");
			}
			metaData["citation_publisher"] = tempTwo.replace(/\|\-\|.*$/gi,"");
			
			//get date
			tempTwo = "";
			if (temp.search(/\|\-\|\ Publication\ date/i) != -1) {
				tempTwo = temp.replace(/^.*\|\-\|\ Publication\ date/i,"");
			}
			metaData["citation_date"] = tempTwo.replace(/\|\-\|.*$/gi,"");
			
			//get language
			tempTwo = "";
			if (temp.search(/\|\-\|\ Language/i) != -1) {
				tempTwo = temp.replace(/^.*\|\-\|\ Language/i,"");
			}
			metaData["citation_language"] = tempTwo.replace(/\|\-\|.*$/gi,"");
			
			//get isbn
			tempTwo = "";
			if (temp.search(/\|\-\|\ ISBN13/i) != -1) {
				tempTwo = temp.replace(/^.*\|\-\|\ ISBN13/i,"");
			} else if (temp.search(/\|\-\|\ ISBN[0-9]{0,2}/i) != -1) {
				tempTwo = temp.replace(/^.*\|\-\|\ ISBN[0-9]{0,2}/i,"");
			}
			metaData["citation_isbn"] = tempTwo.replace(/\|\-\|.*$/gi,"");
			
			//get address
			tempTwo = "";
			if (temp.search(/\|\-\|\ Publication\ City\/Country/i) != -1) {
				tempTwo = temp.replace(/^.*\|\-\|\ Publication\ City\/Country/i,"");
			}
			metaData["citation_publisher_address"] = tempTwo.replace(/\|\-\|.*$/gi,"");
		}
		
		//adjust abstract
		metaData["citation_abstract"] = metaData["citation_abstract"].replace(/[\s]*show[\s]+(?:more|less)[\s]*$/gi,"");
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
