var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_title: [ ['span#productTitle','innerText'] ],
		citation_url: [ ['link[rel="canonical"]','href'] ],
		citation_misc: [ ['div#detail_bullets_id div.content > ul > li:nth-child(1),div#detail_bullets div.content > ul > li:nth-child(1),div#detail-bullets div.content > ul > li:nth-child(1)','innerText'] , ['div#detail_bullets_id div.content > ul > li:nth-child(2),div#detail_bullets div.content > ul > li:nth-child(2),div#detail-bullets div.content > ul > li:nth-child(2)','innerText'] , ['div#detail_bullets_id div.content > ul > li:nth-child(3),div#detail_bullets div.content > ul > li:nth-child(3),div#detail-bullets div.content > ul > li:nth-child(3)','innerText'] , ['div#detail_bullets_id div.content > ul > li:nth-child(4),div#detail_bullets div.content > ul > li:nth-child(4),div#detail-bullets div.content > ul > li:nth-child(4)','innerText'] , ['div#detail_bullets_id div.content > ul > li:nth-child(5),div#detail_bullets div.content > ul > li:nth-child(5),div#detail-bullets div.content > ul > li:nth-child(5)','innerText'] ],
		citation_author: [ ['span.author a.a-link-normal','innerText'] ],
		citation_type: [ ['div#nav-subnav','data-category'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg };

}());
