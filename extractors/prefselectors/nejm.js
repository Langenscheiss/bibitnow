var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		if (link == null && link == "") return "";
		return (metaData["citation_url_nopath"] + link.replace(/showCitFormats\?(area=LIVE|)/,"downloadCitation?format=ris&") + '&include=cit&direct=checked');
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_firstpage: [ ['span.citation','innerText'] , ['aside.m-article-meta div.o-col','innerText']],
		citation_misc: [ ['li.permissions a','href' ] , ['li.m-quick-links__item a.rightslink','href'] ],
		citation_doi: [ ['meta[name="evt-doiPage"]','content'] ],
		citation_date: [ ['meta[name="evt-dt"]','content'] ],
		citation_abstract: [ ['dd#abstract','innerText', true, 20000] , ['section#article_abstract','innerText',true, 20000]],
		citation_download: [ ['li.downloadCitation a','href'] , ['li.m-article-tools__nav-item--more ul.m-article-tools__subnav-list a.js__openPopup.js__getAjaxContent','href'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
