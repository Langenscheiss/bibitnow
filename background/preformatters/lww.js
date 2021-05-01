var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
// 		//fix title, year and journal abbreviation. Do not use title from citation download, due to latex characters
// 		metaData["citation_download"] = metaData["citation_download"].replace(/TI[\t\ ]+[\-]+[\t\ ]+/,"T1 - ").replace(/PY[\t\ ]+[\-]+[\t\ ]+/,"Y1 - ").replace(/ID[\t\ ]+[\-]+[\t\ ]+/,"DO - ").trim();
	}


	//preformatting function
	function preformatData(metaData, parser) {

    //fix pages
    let misc = metaData["citation_misc"];
    if (misc != "") {
      let doesMatch = false;
      misc = misc.replace(/^.*[\s]*[\-]+[\s]*p[\s]*([0-9]+)/i,
        function(match, $1, offset, original) {
          if (match != "") {
            doesMatch = true;
            return $1;
          } else {
            return match;
          }
        }
      );
      if (doesMatch) {
        metaData["citation_firstpage"] = misc;
      }
      metaData["citation_misc"] = "";
    }

    //fix keywords
    metaData["citation_keywords"] = metaData["citation_keywords"].replace(/^[\s]*keyword[s]?[\s]*/i,"");

    //fix database and publisher
		metaData["citation_database"] = "Lippincott Research";
    if (metaData["citation_publisher"] == "") metaData["citation_publisher"] = "Wolters Kluwer";
	}

	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
