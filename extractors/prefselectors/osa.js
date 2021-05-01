var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		if (link == null || (link = link.trim()) == "") return "";
		metaData["citation_download_method"] = "POST";
		let myForm = new FormData();
		myForm.append('articles',link);
		myForm.append('ArticleAction',"export_endnote");
		metaData["citation_download_requestbody"] = myForm;
		link = (metaData["citation_url_nopath"] + "/custom_tags/IB_Download_Citations.cfm");
		return link;
	}

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_download: [ ['input[name="articles"]','value'] ],
		citation_abstract: [ ['meta[name="dc.description" i]','innerText', true,20000 ] ]
	};

  //function to obtain fallback url in case a pdf is loaded
  function getFallbackURL(url) {
    if (url.search(/osapublishing\.org\/DirectPDFAccess/i) == -1) return null;

    //get base url
    let baseurl = url.replace(/osapublishing\.org.*/gi,"osapublishing.org");

    //get id
    let id = url.replace(/\.pdf\?.*$/gi,"").replace(/^.*\//gi,"");
    if (id == "") return null;
    return (baseurl + "/fulltext.cfm?uri=" + id);
  }

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink , getFallbackURL: getFallbackURL };

}());
