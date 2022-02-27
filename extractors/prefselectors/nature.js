var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {

		//return if link invalid
		if (link == null || link == "") return "";

		//get final url
    if (link.search(/^http/) == -1) {
      return (metaData["citation_url_nopath"] + link.replace(/^[^\/]*\:\/\/[^\/]*/i,""));
    } else {
      return link;
    }
	}

  function getFallbackURL(url) {
    return (url.search(/.*\.[\s]*pdf[\s]*$/i) != -1 && url.search(/\.com\/articles\//i) != -1) ?  url.replace(/[\s]*\.[\s]*pdf[\s]*$/gi,"") : null;
  }

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_authors: [ ['meta[name="citation_authors"]','content'] , ['li[itemprop="author"] span[itemprop="name"]','innerText'] ],
		citation_date: [ ['meta[name="citation_publication_date" i]','content'],['meta[property="citation_publication_date" i]','content'] , ['time[itemprop="datePublished"]','datetime'] ],
		citation_misc: [ ['div.c-article-header p.c-article-info-details','innerText',true] , ['ul[data-component="article-info-list"]','innerText'] ],
		citation_doi: [ ['meta[name="prism.doi"]','content'] , ['div#additional-information-content','innerText'] , ['div[data-type="maestro_mosaic"]','data-doi'] ],
		citation_volume: [ ['meta[name="citation_volume"]','content'] , ['li.small-space-below a[data-track-source="rights"]','href'] ],
		citation_title: [ { query: 'meta[name="citation_title"]', attribute: 'content', allowMultipleLines: true } , ['meta[property="og:title"]','content',true] , ['h2#atl','innerText'] ],
		citation_firstpage: [ ['ul[data-component="article-info-list"] span[itemprop="pageStart"]','innerText'] ],
		citation_lastpage: [ ['ul[data-component="article-info-list"] span[itemprop="pageEnd"]','innerText'] ],
		citation_abstract: [ ['div#abstract-content','innerText', true, 20000] , ['div#Abs1-content','innerText', true, 20000] , ['p.abs.lead','innerText',true,20000] ],
		citation_download: [ ['a[data-track-source="citation-download"]','href'] , ['li.download-citation a', 'href'] , ['ul.supplementary a', 'href' ] , ['li.export-citation a.export','href'] , ['a[data-track-action="download article citation"]','href'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink, getFallbackURL: getFallbackURL };

}());
