var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		if (link == null || link == "") return "";
		return (metaData["citation_url_nopath"] + link.replace(/showCitFormats/,"downloadCitation"));
	}

	function getFallbackURL(url) {
    return (url.search(/\/doi\/pdf\//i) != -1) ?  url.replace(/\/doi\/pdf\//i,"/doi/") : null;
  }

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_misc: [ ['div#breadcrumbs a', 'innerText'] ],
		citation_abstract: [ ['div.abstractSection','innerText',true,20000] , ['meta[name="dc.Description"]','content', false ,20000] ],
 		citation_download: [ ['div.article-tools a[title="Download Citation"]', 'href'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink , getFallbackURL: getFallbackURL };

}());
