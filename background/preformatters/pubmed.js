var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//convert XML to bibfields
	function preformatRawData(metaData, parser) {
		//extract data from pubmed xml
		var temp = metaData["citation_download"].replace(/[\n]/g," <> ").replace(/\&lt;/g,"<").replace(/\&gt;/g,">");
		metaData["citation_download"] = "";
		
		function extractTag(string,tag,prop,all) {
			var returnString = "";
			var temp = '<';
			temp += tag;
			if (prop != null && prop != "") temp += " " + prop;
			temp += '[^>]*>.*?(?:<\\/';
			temp += tag;
			temp += '>?)';
			if (all) {
				temp = new RegExp(temp,"g");
			} else {
				temp = new RegExp(temp,"");
			}
			
			temp = string.match(temp);
			var length;
			if (temp != null && (length = temp.length) > 0) {
				if (!all) length = 1;
				returnString = temp;
				for (var i = 0; i<length; ++i) {
					temp = '<[\\/]*';
					temp += tag;
					temp += '[^>]*>';
					temp = new RegExp(temp,"g");
					returnString[i] = returnString[i].replace(temp,"");
				}
				if (!all) returnString = returnString[0];
			}
			return returnString;
		}
		
		//extract journal info
		var parsedString = "";
		var tempTwo = extractTag(temp,'Journal','',false);
		var tempThree = tempTwo;
		var tempFour = extractTag(temp,'ArticleDate','',false);// scan for most date fields
		if (tempTwo == null || tempTwo == "") {
			tempThree = tempFour;
		} else if (tempFour != null && tempFour != "") {
			if (tempTwo.search(/year/i) == -1) {
				if (tempFour.search(/year/i) != -1) {
					tempThree = tempFour;
				} else if (tempTwo.search(/month/i) == -1 && tempFour.search(/month/i) != -1) {
					tempThree = tempFour;
				}
			} else if (tempTwo.search(/month/i) == -1 && tempFour.search(/month/i) != -1) {
				tempThree = tempFour;
			}
		}
		
		if (tempTwo != null && tempTwo != "") {
			
			//extract publication date
			tempFour = extractTag(tempThree,'Year','',false);
			if (tempFour != null && tempFour != "") {
				parsedString += tempFour.replace(/[^0-9]/g,"");
			}
			tempFour = extractTag(tempThree,'Month','',false);
			if (tempFour != null && tempFour != "") {
				parsedString += " ";
				parsedString += tempFour.replace(/\&lt;[\/]*Month\&gt;/g,"");
			}
			tempFour = extractTag(tempThree,'Day','',false);
			if (tempFour != null && tempFour != "") {
				parsedString += " ";
				parsedString += tempFour.replace(/[^0-9]/g,"");
			}
			if (parsedString != "") {
				metaData["citation_date"] = parsedString;
				metaData["query_summary"]["citation_date"] = 10;
			}
			
			//extract journal title
			parsedString = extractTag(tempTwo,'Title','',false);
			if (parsedString != null && parsedString != "") {
				metaData["citation_journal_title"] = parsedString;
				metaData["query_summary"]["citation_journal_title"] = 10;
			}
			
			//extract journal abbreviation
			parsedString = extractTag(tempTwo,'ISOAbbreviation','',false);
			if (parsedString != null && parsedString != "") {
				metaData["citation_journal_abbrev"] = parsedString;
				metaData["query_summary"]["citation_journal_abbrev"] = 10;
			}
			
			//extract issn
			parsedString = extractTag(tempTwo,'ISSN','',false);
			if (parsedString != null && parsedString != "") {
				metaData["citation_issn"] = parsedString;
				metaData["query_summary"]["citation_issn"] = 10;
			}
			
			//extract volume
			parsedString = extractTag(tempTwo,'Volume','',false);
			if (parsedString != null && parsedString != "") {
				metaData["citation_volume"] = parsedString;
				metaData["query_summary"]["citation_volume"] = 10;
			}
			
			//extract issue
			parsedString = extractTag(tempTwo,'Issue','',false);
			if (parsedString != null && parsedString != "") {
				metaData["citation_issue"] = parsedString;
				metaData["query_summary"]["citation_issue"] = 10;
			}
		}
		
		//extract pages
		var length;
		tempTwo = extractTag(temp,'MedlinePgn','',false);
		if (tempTwo != null && tempTwo != "") {
			tempTwo = tempTwo.replace(/[-]+/,"--");
			if (tempTwo.search("--") != -1) {
				tempTwo = tempTwo.replace(/[^0-9\-]/g,"").replace(/[\.]*$/,"");
				
				//check if last page number has less digits than first page number. If yes, fix it
				tempTwo = tempTwo.split("--");
				if ((length = tempTwo[0].length - tempTwo[1].length) > 0) {
					tempTwo[1] = tempTwo[0].slice(0,length) + tempTwo[1];
				}
				tempTwo = "" + tempTwo[0] + "--" + tempTwo[1];
			}
			metaData["citation_firstpage"] = tempTwo;
			metaData["query_summary"]["citation_firstpage"] = 10;
		}
		
		//extract doi
		parsedString = extractTag(temp,'ELocationID','EIdType=\"doi\"',false);
		if (parsedString != null && parsedString != "") {
			metaData["citation_doi"] = parsedString;
			metaData["query_summary"]["citation_doi"] = 10;
		} else {
			parsedString = extractTag(temp,'ELocationID','',false);
			if (parsedString != null && parsedString != "") {
				metaData["citation_doi"] = parsedString;
				metaData["query_summary"]["citation_doi"] = 10;
			}
		}
		
		//extract publisher
		parsedString = extractTag(temp,'CopyrightInformation','',false);
		if (parsedString != null && parsedString != "") {
			metaData["citation_publisher"] = parsedString;
			metaData["query_summary"]["citation_publisher"] = 10;
		}
		
		//extract article title
		parsedString = extractTag(temp,'ArticleTitle','',false);
		if (parsedString != null && parsedString != "") {
			metaData["citation_title"] = parsedString;
			metaData["query_summary"]["citation_title"] = 10;
		}
		
		//extract authors
		tempTwo = extractTag(temp,'AuthorList','',false);
		tempThree = "";
		parsedString = "";
		if (tempTwo != null && tempTwo != "") {
			
			tempTwo = extractTag(tempTwo,'Author','',true);
			if (tempTwo != null && (length = tempTwo.length) > 0) {
			
				var lengthTwo;
				//extract authors names
				for (var i = 0; i<length; ++i) {
					
					//extract all surnames
					tempThree = extractTag(tempTwo[i],'LastName','',true);
					if (tempThree != null && (lengthTwo = tempThree.length) > 0) {
						for (var j = 0; j<lengthTwo; ++j) {
							parsedString += tempThree[j];
							parsedString += " ";
						}
					}
					parsedString += ", ";
					
					//extract all forenames
					tempThree = extractTag(tempTwo[i],'ForeName','',true);
					if (tempThree != null && (lengthTwo = tempThree.length) > 0) {
						for (var j = 0; j<lengthTwo; ++j) {
							parsedString += tempThree[j];
							parsedString += " ";
						}
					}
					parsedString += "; ";
				}
				parsedString = parsedString.replace(/[\;\ \,]*$/,"");
			}
		}
		
		if (parsedString != "") {
			metaData["citation_authors"] = parsedString;
			metaData["query_summary"]["citation_authors"] = 10;
		}
		
		//dummy string in citation_download to suggest successful data retreival
		metaData["citation_download"] = "TY - JOUR\nER -";
	}
	
	//preformatting function
	function preformatData(metaData, parser) {

		var temp;
		var tempTwo;
		var tempThree;
		var suffix;
		var surnameSuffixes = parser.surnameSuffixes;
		var surnameSuffixesSignals = parser.surnameSuffixesSignals;
		
		var numSuffixes = surnameSuffixes.length;
		var length;

		//preformat author list if obtained from HTML source
		var authorList = "";
		if (metaData["query_summary"]["citation_authors"] != 10) {
			temp = metaData["citation_authors"];
			if (temp != "") {
				temp = temp.split(" ; ");
				length = temp.length;
				
				for(var i = 0; i<length; ++i) {
					tempTwo = temp[i];
					if (tempTwo != "") {
						tempTwo = tempTwo.split(" ");
						tempThree = tempTwo.length;
						if (tempThree > 1) {
							for (var j = 0; j<numSuffixes; ++j) {
								suffix = "[\s]*";
								suffix += surnameSuffixesSignals[j];
								suffix += "[\s\.]*$";
								suffix = new RegExp(suffix,"");
								if (tempTwo[tempThree-1].search(suffix) != -1) {
									suffix = " " + surnameSuffixes[j];
									tempThree--;
									break;
								}
								suffix = "";
							}
							authorList += tempTwo[tempThree-1].replace(/[^\.\-\ ]/g,
								function(match, offset, original) {
									var returnString = match;
									returnString += ". ";
									return returnString;
								}
							);
						}
						for(var k = 0; k < tempThree - 1; ++k) {
							authorList += tempTwo[k];
							authorList += " ";
						}
						authorList += suffix + "; ";
					}
				}
			}
			metaData["citation_authors"] = authorList;
		}
		
		//preformat title, remove trailing dot
		temp = metaData["citation_title"];
		temp = temp.replace(/\.$/,"");
		temp = temp.trim();
		metaData["citation_title"] = temp;
		
		//fix publisher
		temp = metaData["query_summary"]["citation_publisher"]; 
		if(temp == -2 || temp == -10) metaData["citation_publisher"] = metaData["citation_publisher"].replace(/^©[0-9\ \,]*/,"").replace(/^by/,"").replace(/\.$/,"").trim();
		
		
		//parse misc field to others
		temp = metaData["citation_misc"];
		metaData["citation_misc"] = "";
		
		//get journal abbreviation from first part of misc string if not obtained dynamically
		if (metaData["query_summary"]["citation_journal_abbrev"] != 10) {
			tempTwo = temp.match(/^[^\.]+\./i);
			if (tempTwo != null && tempTwo.length > 0) {
				metaData["citation_journal_abbrev"] = tempTwo[0].replace(/[\.]+$/,"").trim();
			}
		}
		
		temp = temp.replace(/[\.\ ]*(doi|pii).*$/,"");
		
		//get date string if not obtained dynamically
		if (metaData["query_summary"]["citation_date"] != 10) {
			metaData["citation_date"] = temp.replace(/^[^\.]*\./,"").replace(/[^\ A-Za-z0-9].*$/).trim();
		}
		
		//further format misc for parsing
		temp = temp.replace(/[\.\ ]*Epub.*$/,"");
		temp = temp.replace(/^.*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/,"");
		temp = temp.replace(/^(;|\ [0-9]*[\.\;]*)/,"");
		temp = temp.replace(/\(/," ");
		temp = temp.replace(/\)/," ");
		temp = temp.replace(/:/," ");
		temp = temp.replace(/[\ ]+/g," ");
		temp = temp.trim();
		temp = temp.split(" ");
		
		//other fields to parse to
		tempThree = ["citation_volume","citation_issue","citation_firstpage"];
		var queryCodes = [2,1,5];
		if(temp != null) {
			for (var i = 0; i < 3; ++i) {
				if(i < temp.length) {
					tempTwo = temp[i];
					if (i == 2) {
						tempTwo = tempTwo.replace(/[-]+/,"--");
						if (tempTwo.search("--") != -1) {
							tempTwo = tempTwo.replace(/[^0-9\-]/g,"").replace(/[\.]*$/,"");
							
							//check if last page number has less digits than first page number. If yes, fix it
							tempTwo = tempTwo.split("--");
							if ((length = tempTwo[0].length - tempTwo[1].length) > 0) {
								tempTwo[1] = tempTwo[0].slice(0,length) + tempTwo[1];
							}
							tempTwo = "" + tempTwo[0] + "--" + tempTwo[1];
						}
					}
					metaData[tempThree[i]] = tempTwo;
				} else if (i == 2) {
					
					// if issue available and no pages, switch pages and issue
					tempTwo = metaData[tempThree[i-1]];
					metaData[tempThree[i]] = tempTwo;
					metaData[tempThree[i-1]] = "";
				}
			}
		}
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData};

}());
