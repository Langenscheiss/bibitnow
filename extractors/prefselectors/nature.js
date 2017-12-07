var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {

		//get base url
		let baseUrl = metaData["citation_url"].match(/^[^\/]*\/\/[^\/]*\//i);
		if (baseUrl != null && baseUrl.length > 0) baseUrl = baseUrl[0].slice(0,baseUrl[0].length-1);
		if (baseUrl == null) baseUrl = "";
		
		//remove base url from link
		if (link != null && link != "") link = link.replace(/^[^\/]*\/\/[^\/]*\//i,"");
		
		//get final url
		return (baseUrl + link);
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_authors: [ ['meta[name="citation_authors"]','content'] , ['li[itemprop="author"] span[itemprop="name"]','innerText'] ],
		citation_date: [ ['time[itemprop="datePublished"]','datetime'] ],
		citation_misc: [ ['ul[data-component="article-info-list"]','innerText'] ],
		citation_doi: [ ['meta[name="prism.doi"]','content'] , ['div#additional-information-content','innerText'] , ['div[data-type="maestro_mosaic"]','data-doi'] ],
		citation_volume: [ ['li.small-space-below a[data-track-source="rights"]','href'] ],
		citation_title: [ ['meta[property="og:title"]','content'] , ['h2#atl','innerText'] ],
		citation_firstpage: [ ['ul[data-component="article-info-list"] span[itemprop="pageStart"]','innerText'] ],
		citation_lastpage: [ ['ul[data-component="article-info-list"] span[itemprop="pageEnd"]','innerText'] ],
		citation_download: [ ['a[data-track-source="citation-download"]','href'] , ['li.download-citation a', 'href'] , ['ul.supplementary a', 'href' ] , ['li.export-citation a.export','href'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
