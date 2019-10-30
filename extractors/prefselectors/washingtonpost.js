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
		citation_author: [ ['div.author-names span.author-name','innerText'] , ['div.pb-sig-line > span[itemprop="author"] span[itemprop="name"]', 'innerText'] , ['div.bottomizer > span[itemprop="author"] span[itemprop="name"]', 'innerText'] , ['a.pg-byline--author','innerText'] , ['div.author-wrapper','data-authorname'] ], /*added 'div.pb-sig-line >' and 'div.bottomizer >' to avoid author doubling due to mobile version. One may probably add the mobile version content as an additional query to make this mobile ready, but BIN is currently not being developed with mobile support in mind*/
		citation_title: [ ['meta[property="og:title"]', 'content'] ],
		citation_publisher: [ ['meta[property="og:site_name"]','content'] ], /*custom keyword query not necessary, already part of fixed kernel*/
		citation_abstract: [ ['meta[property="og:description"]','content',true,20000] ],/*the last two arguments tell the system that the extractor may pass several lines and up to 20000 chars to the parser*/
		citation_url: [ ['meta[property="og:url"]','content'] ],
		citation_json: [['script[type="application/ld+json"]','textContent',true,20000]],
		citation_date: [ ['span[itemprop="datePublished"]', 'content'] , ['span[itemprop="datePublished"]', 'innerText']],
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
