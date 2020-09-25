var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		return "";
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_author: [ ['p[itemprop="author" i] span[itemprop="name" i]','innerText'], [ 'meta[name="author"]', 'content'] , [ 'span[class^="Byline-bylineAuthor"]','innerText'] , ['p[itemprop="author creator"]','innerText'] ],
		citation_title: [ ['span.balancedHeadline','innerText'] , ['meta[property="og:title"]', 'content'] ],
		citation_url: [ ['meta[property="og:url"]','content'] ],
		citation_abstract: [ ['meta[property="og:description"]','content',true,20000] ],
		citation_date: [ ['meta[propert="article:modified]','content'],['meta[name="DISPLAYDATE"]', 'content' ] , ['time[itemprop="datePublished"]','content'] , ['meta[itemprop="datePublished"]','content']]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
