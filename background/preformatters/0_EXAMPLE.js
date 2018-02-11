/* This is an example of how a preformatting script looks, based on the site adjustor for Wiley. It allows to preprocess the extracted meta data from the website to which this script is associated (in urlSpecificAdjustorList.xml). You can also access and modify any dynamically downloaded meta data before being processed by the system's own RIS parser. Any code outside the BINPreformatter object will not be accepted! (DO NOT POLLUTE GLOBAL NAMESPACE!!)

GLOBAL RESOURCES
Note that the global object BINResources may be used in the following functions. This object exposes the following functions:
	htmlDecode(input): converts every HTML Entity (such as &nbsp, ...) in the string "input" to the corresponding character (char value)
	
	convertSpecialChars(input, mode): if mode = 0, converts all characters in string "input" that have a command representation in latex to the corresponding command representation. If mode = 1, it converts most non-Ascii letters and punctuation to a a predefined ascii character (ö -> o,..., see <abbrev> tags in nameResources/specialCharList.xml), and, if non-ascii characters remain, to punycode. This is used for bibtex bibkeys which are traditionally ascii only
	
	findJournalAbbreviation(journal): tries to find an abbreviation for the journal specified in the string "journal" by looking into the plugin's database, located in nameResources/journalAbbrevs.xml .
	
	convertToPunycode(input): converts input string "input" using the punycode scheme
	
	fixedCharCodeAt(str, idx): obtains the decimal char value of the character at integer position idx in string str. This method detects non BMP characters by looking for higher surrogates at index idx. If found, the method also reads the lower surrogate value at integer position idx+1. 
 
*/
var BINPreformatter = ( function () {

	/* The following global variables must be shadowed as a "promise not to touch global data and variables". Must be included to be accepted! Obviously, you can still access the global context, but any such attempt will cause the script to be excluded from the git repository!*/
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	/* The function preformatRawData is called by the background script after both the static meta data and any dynamically downloaded meta data has been retreived, but before the downloaded meta data is being parsed. The arguments are metaData and parser. metaData is described in the example prefselector file, see example.js in extractors/prefselectors/. Note that the field "citation_download" now possibly contains the dynamically downloaded meta data in raw text form, and additional fields indicate whether this download was successful, see below for details. 
	
	parser is a name-indexed object which contains various immutable properties and resources of the parsing system. It has the following fields:
		"monthAbbrevs", array of arrays containing 3 letter abbreviations for all months in various languates. monthAbbrevs[0] contains abbreviations for January, monthAbbrevs[1] contains abbreviations for February, and so on
		"specialAuthorNames", array of first names which have two-letter initials (Yuri), to be extended
		"specialAuthorNamesInitials", two-letter initials for the names in array "specialAuthorNames"
		"surnameSignals" : Object.freeze(['Willems van', "von", "van", "de", "zu", "zur", "dal", "del", "do", "dos", "di", "al", "la" ]),
		"surnameSuffixesSignals", boring, contains "Jr" and "Sr"
		"surnameSuffixes", boring, contains "Jr." and "Sr."
		"bibFields", contains an array of strings naming various bibfields
		"risKeys", an array containing the ris keys (e.g. TI, JF, ...) that the parser is looking for when parsing downloaded RIS data
		"endNoteKeys", an array containing endnote keys (e.g. %T, %J, ...) corresponding to the ris keys in the array "risKeys". Used by the endnote to RIS converter.
		"EndnoteToRis", this is the endnote to ris converter function. Its first argument is input, which must be a string containing endnote data. The second argument is the boolean fullJournal. If true, it will convert the string associated with the %J key in the input data to a full journal name in the RIS format, assigned to the "JF - " key. If false, it will instead be assigned to the "JA - " key for an abbreviated journal name.
	TODO more resources available now!
	
	DO NOT PARSE OR EVAL DATA
	For obvious security reasons, it is HIGHLY recommended NOT TO EVER parse any meta data to html or to use eval on it, etc. The data should not be trusted, and should hence only be kept in text format.
	
	DOWNLOADED DATA
	The field "citation_download" contains the retreived data of the citation download request, if the latter was initiated. The data comes in raw text format. If this data is in the endnote format, you may use EndnoteToRis to convert it to RIS. Finally, metaData["citation_download"] must contain the downloaded data in the RIS format in order to be valid after preformatRawData has been called! To check whether the download was successful, you can access metaData["citation_download_status"], which comes with one of the following values:
		0: Citation download globally disabled by the plugin preferences
		1: Citation download not specified by site adjustor. Site disabled.
		2: Citation download failed (due to failed request, network error etc.)
		3: Citation download successful
	 */
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix title and journal
		metaData["citation_download"] = metaData["citation_download"].replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JF - ").replace(/TI[\t\ ]+[\-]+[\t\ ]+/,"T1 - ").trim();
		
		//fix abstract if necessary
		if (metaData["query_summary"]["citation_download"] == 2) {
			metaData["citation_download"] = metaData["citation_download"].replace(/AB[\t\ ]+[\-]+[\t\ ]+/,"N2 - ").trim();
		}
	}
	
	/* The function preformatData is called by the background script after the static meta data and any dynamically downloaded meta data has been both retreived and parsed, but before any static meta data is replaced by any successfully obtained dynamic citation data, and before the meta data is send to the main parser. The arguments are metaData and parser. metaData is described in the example prefselector file, see example.js in extractors/prefselectors/. Note that the field "citation_download" now possibly contains the dynamically downloaded meta data in a preformatted form, see below for details.
	
	DO NOT PARSE OR EVAL DATA
	For obvious security reasons, it is HIGHLY recommended NOT TO EVER parse any meta data to html or to use eval on it, etc. The data should not be trusted, and should hence only be kept in text format.
	
	DOWNLOADED AND PREPROCESSED DATA
	The field "citation_download" contains the retreived and preprocessed data of the citation download request, if the latter was initiated. The data comes in name-indexed Object form, where each element is indexed by the bibfields which also index the metaData object, see example prefselector file. For example metaData["citation_download"]["citation_authors"] contains the ";"-separated author string parsed from the downloaded RIS data. If the RIS data did not provide any information for a particular bibfield, the corresponding bibfield in metaData["citation_download"] is initialized with an empty string. It is HIGHLY recommended NOT TO EVER parse any meta data to html or to use eval on it, etc. The data should not be trusted, and should hence only be kept in text format. As before, you can check whether the dynamic citation download was successful by reading the metaData["citation_download_status"] field.
	 */
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix database
		metaData["citation_database"] = "Wiley Online Library";
		
		//fix author list (if necessary, depends on Wiley journal)
		metaData["citation_authors"] = metaData["citation_authors"].replace(/[\s]*;/g, ' ;');
		
		//fix journal title for Cochrane
		if (metaData["citation_journal_title"] == "" && metaData["citation_misc"].search(/cochrane/i) != -1) {
			metaData["citation_journal_title"] = "Cochrane Database of Systematic Reviews";
			metaData["citation_journal_abbrev"] = "Cochrane Database Syst. Rev.";
		}
		
		//fix publisher
		let publisher = metaData["citation_publisher"] 
		if (publisher == "") {
			metaData["citation_publisher"] = "Wiley";
		} else if (metaData["query_summary"]["citation_publisher"] >= 1) {
			metaData["citation_publisher"] = publisher.replace(/^[^0-9]*[0-9]+\ /,"");
		}
		
		//fix abstract, prefer static
		let abstract = metaData["citation_abstract"].replace(/^[\s]*(?:abstract[\:\s]*|Jump[\s]*to…)/gi,"").replace(/^[\s]*(?:abstract[\:\s]*|Jump[\s]*to…)/gi,"").replace(/(?:Copyright[\s]*)?©.*$/i,"").trim();
		
		//fix math in abstract, math symbols saved in citation_misc
		let mathSymbols = metaData["citation_misc"];
		if (abstract != "" && mathSymbols != "" && (mathSymbols = mathSymbols.split(/[\ ]+;[\ ]+/)) != null) {
			const length = mathSymbols.length;
			if (length%2 == 0) {
				//index variable
				let idx = 0;
				for (let i = 0; i<length; ++i) {
				
					//get match and math symbol from misc
					let match = mathSymbols[i].trim();
					i++;
					let symbol = mathSymbols[i].trim();
					match += " " + symbol;
					
					//continue only if not empty string
					if (symbol != "") {
						
						//search for match in abstract text
						let nextIdx = abstract.indexOf(match,idx);
						
						//if found, replace by math
						if (nextIdx != -1) {
							
							//get index in OLD abstract after match
							idx = nextIdx + match.length;

							//convert symbol
							symbol = BINResources.convertSpecialChars(symbol,0,false,true);
							
							//replace string in abstract
							abstract = abstract.slice(0,nextIdx) + "$" + symbol + "$" + abstract.slice(idx);
							
							//get index in NEW abstract where to start searching from!
							idx = nextIdx + symbol.length+2;
						}
					}
				}
				//reduce white spaces around dollars
				abstract = abstract.replace(/[\ ]+\$/g, " $").replace(/\$[\ ]+/, "$ ");
			}
		}
		
		metaData["citation_abstract"] = abstract;
		if ((metaData = metaData["citation_download"]) != null && typeof(metaData) == 'object') {
			metaData["citation_abstract"] = (abstract != "") ? "" : metaData["citation_abstract"].replace(/(?:Copyright[\s]*)?©.*$/i,"").trim();
		}
		
		//clear misc
		metaData["citation_misc"] = "";
		
	}
	
	// expose preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
