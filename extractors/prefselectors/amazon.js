var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_title: [ ['span#productTitle','innerText'] , ['span#ebooksProductTitle','innerText'] ],
		citation_url: [ ['link[rel="canonical"]','href'] ],
		citation_misc: [ ['div#detail_bullets_id div.content > ul > li,div#detail_bullets div.content > ul > li,div#detail-bullets div.content > ul > li,div#detailBullets_feature_div > ul > li','textContent',true,1024,false,12] ],
		citation_author: [ ['span.author a.a-link-normal','innerText'] ],
		citation_type: [ ['div#nav-subnav','data-category'] ],
		citation_abstract: [ {query: 'div#iframeContent',attribute: 'innerText', allowMultipleLines: true, maximumLengthy: 20000, iframes: ['bookDesc_iframe'] } ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg };

}());
