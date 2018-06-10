/* Minimal working example of a preformatting script. Does not do anything :) */
var BINPreformatter = ( function () {

	/*shadows for global variables from background context */
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	/*raw preformatting. "metaData" provides read/write access to raw citation data obtained from extractor. "parser" is a reference to some read only resources that the main parser is using. void return*/
	function preformatRawData(metaData, parser) {
		//do nothing
	}
	
	/*preformatting. "metaData" provides read/write access to static citation data obtained from extractor, and with dynamically downloaded data being parsed into a JSON object. "parser" is a reference to some read only resources that the main parser is using. void return*/
	function preformatData(metaData, parser) {
		
		//fix author
		if (metaData["query_summary"]["citation_authors"] == 1) {
			metaData["citation_authors"] = metaData["citation_authors"].replace(/^[\s]*ein[\s]+kommentar[\s]*/gi,"").replace(/(?:^[\s]*von[\s]*|[\s]*[\,]+.*$)/gi,"");
		} else {
			metaData["citation_authors"] = metaData["citation_authors"].replace(/tagesschau[\.]+[\s]*de/gi,"tagesschau");
		}
		
	}
	
	// expose preformatting functions
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
