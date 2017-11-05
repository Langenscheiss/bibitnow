var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		var returnString; 
		//get base url
		var temp = metaData["citation_url"].match(/^[^\/]*\/\/[^\/]*\//i);
		if (temp != null && temp.length > 0) temp = temp[0].slice(0,temp[0].length-1);
		if (temp == null) {
			temp = "";
		}
		
		//remove base url from link
		if (link != null && link != "") link = link.replace(/^[^\/]*\/\/[^\/]*\//i,"");
		
		//get final url
		returnString = temp + link;
		return returnString;
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_authors: [ ['meta[name="citation_authors"]','content'] ],
		citation_misc: [ ['ul[data-component="article-info-list"]','innerText'] ],
		citation_title: [ ['h2#atl','innerText'] ],
		citation_firstpage: [ ['ul[data-component="article-info-list"] span[itemprop="pageStart"]','innerText'] ],
		citation_lastpage: [ ['ul[data-component="article-info-list"] span[itemprop="pageEnd"]','innerText'] ],
		citation_download: [ ['a[data-track-source="citation-download"]','href'] , ['li.download-citation a', 'href'] , ['ul.supplementary a', 'href' ] , ['li.export-citation a.export','href'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());