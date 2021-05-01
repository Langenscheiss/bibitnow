var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	//convert XML to bibfields
	function preformatRawData(metaData, parser) {

		//function to extract what is in between xml tags
		function extractTag(input,tag,prop,all,closed = false) {

			//match tags in input
			let ext = closed ? '>)' : '>?)';
			prop = (prop != null && prop != "") ? " " + prop : "";
			prop = '<' + tag + prop + '[^>]*>.*?(?:<\\/' + tag + ext;
			input = all ? input.match(new RegExp(prop,"g")) : input.match(new RegExp(prop,""));
			//if tag not found, return empty input
			if (input == null || (prop = input.length) == 0) return "";

			//if tag found, remove tags and only return what's in between
			if (!all) prop = 1;
			for (let i = 0; i<prop; ++i) {
				input[i] = input[i].replace(new RegExp('<[\\/]*' + tag + '[^>]*>' ,"g"),"");
			}
			if (!all) return input[0];
		       	return input;
		}

		//if nbib format, simply parse to ris, otherwise assume xml
		let queryNumber = metaData["query_summary"]["citation_download"];
		if (queryNumber == 3) {
			return;
    } else if (queryNumber == 2) {
      return;
		} else {

			//extract data from pubmed xml
			let dataAll = metaData["citation_download"].replace(/[\n]/g," <> ").replace(/\&lt;/g,"<").replace(/\&gt;/g,">");
			metaData["citation_download"] = "";

			//extract journal info
			let parsedString = "", dataPart = extractTag(dataAll,'Journal','',false,true);
			let dataField;
			if (dataPart != null && dataPart != "") {

				//extract journal title
				parsedString = extractTag(dataPart,'Title','',false);
				if (parsedString != "") {
					metaData["citation_journal_title"] = parsedString;
					metaData["query_summary"]["citation_journal_title"] = 10;
				}

				//extract journal abbreviation
				parsedString = extractTag(dataPart,'ISOAbbreviation','',false);
				if (parsedString != "") {
					metaData["citation_journal_abbrev"] = parsedString;
					metaData["query_summary"]["citation_journal_abbrev"] = 10;
				}

				//extract issn
				parsedString = extractTag(dataPart,'ISSN','',false);
				if (parsedString != "") {
					metaData["citation_issn"] = parsedString;
					metaData["query_summary"]["citation_issn"] = 10;
				}

				//extract volume
				parsedString = extractTag(dataPart,'Volume','',false);
				if (parsedString != "") {
					metaData["citation_volume"] = parsedString;
					metaData["query_summary"]["citation_volume"] = 10;
				}

				//extract issue
				parsedString = extractTag(dataPart,'Issue','',false);
				if (parsedString != "") {
					metaData["citation_issue"] = parsedString;
					metaData["query_summary"]["citation_issue"] = 10;
				}

				//extract publication date, choose best tag for it
				dataField = extractTag(dataAll,'ArticleDate','',false)
				if (dataPart.search(/year/i) == -1) {
					if (dataField.search(/year/i) != -1 || (dataPart.search(/month/i) == -1 && dataField.search(/month/i) != -1)) dataPart = dataField;
				} else if (dataPart.search(/month/i) == -1 && dataField.search(/month/i) != -1) {
					dataPart = dataField;
				}
				parsedString = extractTag(dataPart,'Year','',false).replace(/[^0-9]/g,"");
				if ((dataField = extractTag(dataPart,'Month','',false).replace(/\&lt;[\/]*Month\&gt;/g,"")) != "") parsedString += "-" + dataField;
				if ((dataField = extractTag(dataPart,'Day','',false).replace(/[^0-9]/g,"")) != "") parsedString += "-" + dataField;
				if (parsedString != "") {
					metaData["citation_date"] = parsedString;
					metaData["query_summary"]["citation_date"] = 10;
				}
			}

			//extract pages
			parsedString = extractTag(dataAll,'MedlinePgn','',false);
			if (parsedString != null && parsedString != "") {
				parsedString = parsedString.replace(/[-]+/,"--");
				if (parsedString.search("--") != -1) {
					parsedString = parsedString.replace(/[^0-9\-]/g,"").replace(/[\.]*$/,"");

					//check if last page number has less digits than first page number. If yes, fix it
					parsedString = parsedString.split("--");
					let length = parsedString[0].length - parsedString[1].length
					if (length > 0) parsedString[1] = parsedString[0].slice(0,length) + parsedString[1];
					parsedString = "" + parsedString[0] + "--" + parsedString[1];
				}
				metaData["citation_firstpage"] = parsedString;
				metaData["query_summary"]["citation_firstpage"] = 10;
			}

			//extract doi
			parsedString = extractTag(dataAll,'ELocationID','EIdType=\"doi\"',false);
			if (parsedString != null && parsedString != "") {
				metaData["citation_doi"] = parsedString;
				metaData["query_summary"]["citation_doi"] = 10;
			} else {
				parsedString = extractTag(dataAll,'ELocationID','',false);
				if (parsedString != null && parsedString != "") {
					metaData["citation_doi"] = parsedString;
					metaData["query_summary"]["citation_doi"] = 10;
				}
			}

			//extract publisher
			parsedString = extractTag(dataAll,'CopyrightInformation','',false);
			if (parsedString != null && parsedString != "") {
				metaData["citation_publisher"] = parsedString;
				metaData["query_summary"]["citation_publisher"] = 10;
			}

			//extract article title
			parsedString = extractTag(dataAll,'ArticleTitle','',false);
			if (parsedString != null && parsedString != "") {
				metaData["citation_title"] = parsedString;
				metaData["query_summary"]["citation_title"] = 10;
			}

			//extract authors
			dataPart = extractTag(dataAll,'AuthorList','',false);
			parsedString = "";
			if (dataPart != null && dataPart != "") {
				dataPart = extractTag(dataPart,'Author','',true);
				let length;
				if (dataPart != null && (length = dataPart.length) > 0) {

					let lengthTwo;
					//extract authors names
					for (let i = 0; i<length; ++i) {

						//extract all surnames
						dataField = extractTag(dataPart[i],'LastName','',true);
						if (dataField != null && (lengthTwo = dataField.length) > 0) {
							for (let j = 0; j<lengthTwo; ++j) {
								parsedString += dataField[j] + " ";
							}
						}
						parsedString += ", ";

						//extract all forenames
						dataField = extractTag(dataPart[i],'ForeName','',true);
						if (dataField != null && (lengthTwo = dataField.length) > 0) {
							for (let j = 0; j<lengthTwo; ++j) {
								parsedString += dataField[j] + " ";
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
	}

	//preformatting function
	function preformatData(metaData, parser) {

		let data, dataPart;
		const surnameSuffixes = parser.surnameSuffixes;
		const surnameSuffixesSignals = parser.surnameSuffixesSignals;
		const numSuffixes = surnameSuffixes.length;

		//preformat author list if obtained from HTML source
		if (metaData["query_summary"]["citation_authors"] != 10) {
			let authorList = "";
			data = metaData["citation_authors"];
			if (data != "") {
				if (metaData["query_summary"]["citation_authors"] == 1) {
					data = data.split(" ; ");
					let length = data.length;
					for(let i = 0; i<length; ++i) {
						dataPart = data[i];
						if (dataPart != "") {
							dataPart = dataPart.split(" ");
							let idx = dataPart.length-1;
							let suffix = "";
							if (idx > 0) {
								for (let j = 0; j<numSuffixes; ++j) {
									suffix = new RegExp("[\s]*" + surnameSuffixesSignals[j] + "[\s\.]*$","");
									if (dataPart[idx].search(suffix) != -1) {
										suffix = " " + surnameSuffixes[j];
										idx--;
										break;
									}
									suffix = "";
								}
								authorList += dataPart[idx].replace(/[^\.\-\ ]/g,
									function(match, offset, original) {
										return ("" + match + ". ");
									}
								);
							}
							for(let k = 0; k < idx; ++k) {
								authorList += dataPart[k] + " ";
							}
							authorList += suffix + "; ";
						}
					}
				} else {
					authorList = data.replace(/[0-9]+[\,]*/gi,"");
				}
			}
			metaData["citation_authors"] = authorList;
		}

		//preformat title, remove trailing dot
		metaData["citation_title"] = metaData["citation_title"].replace(/\.$/,"").trim();

		//fix publisher
		data = metaData["query_summary"]["citation_publisher"];
		if(data == -2 || data == -10) metaData["citation_publisher"] = metaData["citation_publisher"].replace(/^©[0-9\ \,]*/,"").replace(/^by/,"").replace(/\.$/,"").trim();

		//parse misc field to others
		data = metaData["citation_misc"];
		metaData["citation_misc"] = "";

		//get journal abbreviation from first part of misc string if not obtained dynamically
		if (metaData["query_summary"]["citation_journal_abbrev"] != 10) {
			dataPart = data.match(/^[^\.]+\./i);
			if (dataPart != null && dataPart.length > 0) {
				metaData["citation_journal_abbrev"] = dataPart[0].replace(/[\.]+$/,"").trim();
				data = data.replace(/^[^\.]+\./i,"");
			}
		}

		data = data.replace(/[\.\ ]*(doi|pii).*$/,"");
		//get date string if not obtained dynamically
		if (metaData["query_summary"]["citation_date"] != 10) {
			metaData["citation_date"] = data.replace(/[^\ A-Za-z0-9].*$/,"").trim();
		}

		//further format misc for parsing
		data = data.replace(/[\.\ ]*Epub.*$/,"").replace(/^.*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/,"");
		data = data.replace(/^(?:;|\ [0-9]*[\.\;]*)/,"").replace(/\(/," ").replace(/\)/," ").replace(/:/," ").replace(/[\ ]+/g," ").trim().split(" ");
		//other fields to parse to
		let bibFields = ["citation_volume","citation_issue","citation_firstpage"], queryCodes = [2,1,5];
		if(data != null) {
			for (let i = 0; i < 3; ++i) {
				if(i < data.length) {
					dataPart = data[i];
					if (i == 2) {
						dataPart = dataPart.replace(/[-]+/,"--");
						if (dataPart.search("--") != -1) {

							//check if last page number has less digits than first page number. If yes, fix it
							dataPart = dataPart.replace(/(?:[^0-9\-]|[\.]*$)/g,"").split("--");
							let length = dataPart[0].length - dataPart[1].length;
							if (length > 0) dataPart[1] = dataPart[0].slice(0,length) + dataPart[1];
							dataPart = "" + dataPart[0] + "--" + dataPart[1];
						}
					}
					metaData[bibFields[i]] = dataPart;
				} else if (i == 2) {

					// if issue available and no pages, switch pages and issue
					dataPart = metaData[bibFields[i-1]];
					metaData[bibFields[i]] = dataPart;
					metaData[bibFields[i-1]] = "";
				}
			}
		}

		//capitalize journal titles
		metaData["citation_journal_title"] = BINResources.toTitleCase(metaData["citation_journal_title"].trim());

		//set database
		metaData["citation_database"] = "PubMed";
	}

	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData};

}());
