/* This is an example of how a preferred selector script looks, based on the site adjustor for Wiley. It allows to set the css selectors for extracting static meta data for the website to which this script is associated (in urlSpecificAdjustorList.xml). Furthermore, you can expose a function used by the background system to format the citation download link for the dynamically downloaded citation. Any code outside the BINPrefselector object will not be accepted! (DO NOT POLLUTE GLOBAL NAMESPACE!!)
 
GLOBAL RESOURCES
Note that the global object BINResources may be used in the following functions. This object exposes the following functions:
	htmlDecode(input): converts every HTML Entity (such as &nbsp, ...) in the string "input" to the corresponding character (char value)
	
	convertSpecialChars(input, mode): if mode = 0, converts all characters in string "input" that have a command representation in latex to the corresponding command representation. If mode = 1, it converts most non-Ascii letters and punctuation to a a predefined ascii character (ö -> o,..., see <abbrev> tags in nameResources/specialCharList.xml), and, if non-ascii characters remain, to punycode. This is used for bibtex bibkeys which are traditionally ascii only
	
	findJournalAbbreviation(journal): tries to find an abbreviation for the journal specified in the string "journal" by looking into the plugin's database, located in nameResources/journalAbbrevs.xml .
	
	convertToPunycode(input): converts input string "input" using the punycode scheme
	
	fixedCharCodeAt(str, idx): obtains the decimal char value of the character at integer position idx in string str. This method detects non BMP characters by looking for higher surrogates at index idx. If found, the method also reads the lower surrogate value at integer position idx+1. 
*/

var BINPrefselector = ( function () {

	/* The following global variables must be shadowed as a "promise not to touch global data and variables". Must be included to be accepted! Obviously, you can still access the global context, but any such attempt will cause the script to be excluded from the git repository!*/
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	
	/* The function formatCitationLink is called by the background script in order to return a properly formatted citation download link, and to possibly change the download method. The arguments are metaData and link. link is a string containing the url of the citation download link extracted from the webpage. Note that the function is only called if link is not an empty string. metaData is an name-indexed object containing the static meta data extracted from the website. In general, it has the following fields:
		0: "citation_title", title of article, book, etc.
		1: "citation_issue", issue of article, book etc.
		2: "citation_volume", volume of article, book etc.
		3: "citation_issn", issn of journal/isbn of book
		4: "citation_doi", doi of article etc.
		5: "citation_firstpage", first page of citation in article, book etc.
		6: "citation_lastpage", last page of citation in article, book etc.
		7: "citation_journal_title", title of journal
		8: "citation_journal_abbrev", abbreviated title of journal
		9: "citation_url", url of citation
		10: "citation_archive_id", open access archive id (for arXiv etc.)
		11: "citation_publisher", name of publisher
		12: "citation_date", citation date/publication date
		13: "citation_misc", generic field used to store metaData
		14: "citation_authors", list of authors separated by ";"
		15. "citation_type", type of citation = article, book, etc
		16: "citation_download", unformatted download link
		"query_summary", name-indexed object indicating the chosen css selector for each previous field. For example, metaData["query_summary"]["citation_doi"] indicates the chosen selector for the bibfield "citation_doi". To understand the numbers saved in the fields of "query_summary", refer to the text below.
		
		If the script could not extract the data for any bibfield, the value of the field will be set to an empty string "". For exampe, if the DOI could not be determined from the static webpage data, metaData["citation_doi"] is equal to "".
		
		There are also additional fields in metaData whose css selectors cannot be modified, and hence are not registered in "query_summary":
		"citation_webpage_title", title of webpage from which data was extracted
		"citation_webpage_date", this contains the lastModified date of the webpage from which the data has been extracted, in the format YY/MM/DD.
		"citation_title_nonlatex", since the title field is treated separately in the parser for latex (due to math mode instructions), one may programmatically set this field, here or in the preformatting stage, to some other input, in order to set a "non-latex" title
		"citation_publisher_nonlatex", same as for title
		
		DOWNLOAD REQUEST METHOD
		The field "citation_download_method" specifies the citation download http request method. At the moment, it can be set to either "POST" or "GET", by assigning one of the two strings to metaData["citation_download_method"]. If set to anything else, the system will fall back to "GET". Note that some websites (such as Wiley, see function below) require a POST request.
	 */
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		link = link.trim();
		if (link == null || link == "") return "";
		if (metaData["query_summary"]["citation_download"] == 1) {
			link = link.replace(/exportCitation/,"getCitation") + "?citation-type=reference";
			return (metaData["citation_url"].replace(/wiley\.com\/.*$/,"wiley.com") + link + "&download-citation-abstract=Citation+%26+Abstract");
		} else if (metaData["query_summary"]["citation_download"] == 2) {
			link = link.replace(/documentcitationdownload/,"documentcitationdownloadformsubmit").replace(/publicationDoi[^&]+&/,"").replace(/&type=.*$/,"&fileFormat=PLAIN_TEXT&hasAbstract=CITATION_AND_ABSTRACT");
			metaData["citation_download_method"] = "POST";
		}  
		if (link == "") return "";
		return (metaData["citation_url"].replace(/wiley\.com\/.*$/,"wiley.com") + link);
	}
	
	/* The object prefselectorMsg contains the preferred css selectors used to query bibfield specific meta data. Here, one can add selectors to a set of standard selectors which are hardcoded into the meta extractor script. Any user defined selector is queried PRIOR to the standard selectors, hence the name "preferred selector". More specifically, prefselectorMsg is a name-index object of the format "bibfield: [ [css-selector, attribute], ...],". "bibfield" may be any of the 17 bibfields in the list above. The CSS selector selects specific html tags of the website's html source, and "attribute" is any html tag attribute (such as "href" for anchor tags a) or "innerText". The latter may be used to get the text between the selected html tags <tag> and </tag>. For each bibfield, several pairs of selector and attribute can be specified. The first one will be queried first, and so on. 
	
	INNERTEXT ATTRIBUTE
	Note that when choosing the "innerText" attribute, any letter combination <...> (most likely another HTML tag) is removed from the extracted content by the filter. This is to prevent reading script tags from malicious websites, and furthermore removes all html formatting information from the extracted meta data.

	CITATION_MISC:
	Note that the bibfield "citation_misc" has a special behavior. Instead of taking only the data from the first css selector with matching data, it queries ALL specified selector-attribute pairs and creates a ";" separated list. This can be used to extract a larger set of generic data that can be further filtered in the preformatting stage. Note there are no standard css selectors specified in the hardcoded filter kernel for this bibfield.
	
	QUERY SUMMARY NUMBERS:
	The query summary numbers accessible through "metaData["query_summary"]" indicate which css selector was used to extract the data for a specific bibfield. The meta data extractor first queries preferred selectors, starting from the first specified. If the first specified is used, the query summary number will be 1, if the second is used, 2, and so on. If no preferred selector is used, the extractor continues with the standard set of filters, as indicated in the list below. If the first standard filter is used, the query summary number will be 0, if the second is used -1, and so on. Note that the query summary numbers for "citation_misc" and "citation_type" have another meaning, since all selectors are used. For these two fields, the summary number corresponds to the number of query selectors with positive match.
	
	BE CAREFUL ABOUT URL QUERYING
	Note that for security reasons, no standard css selector has been defined for "citation_url" in the hardcoded filter kernel, and metaData["citation_url"] is simply the url stated in the browser address bar for the given tab (with query summary number 0). In general, it is strongly discouraged to add urls to your citation data, since urls are subject to change and websites might even provide malicious urls. Note that since the plugin creates a link in its popup window from either the DOI or the url, it is highly recommended to only query DOIs. Extract urls only from trusted sources, and use them only if no DOI is available.
	
	BINURL: 
	The bibfield "citation_download" has a special selector called "BINURL". If this selector is specified, the meta data extractor will simply take the url from the browser address bar and save it into "citation_download", regardless of which attribute is specified. See extractors/prefselectors/aps.js for an example!
	
	*/
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_author: [ ['meta[name="citation_authors"]','content'] ],
		citation_firstpage: [ ['meta[name="citation_firstpage"]','content'] , ['p.issue-header__description span:last-child','innerText'] ],
		citation_misc: [ ['meta[name="citation_book_title"]','content'] , ['section#abstract span.mjx-math, section#abstract span.MJX_Assistive_MathML','innerText',true, 1024, true, 1000] ],
		citation_publisher: [ ['footer#copyright','innerText'] , ['p#copyright','innerText'] ],
		citation_download: [ ['a.analytics-view-citation','href'] , ['li.citation a','href' ] ],
		citation_abstract: [ ['section#abstract','innerText',true,20000] , ['div#abstract','innerText',true,20000] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
/*
THIS IS A COPY OF THE ARRAY CONTAINING THE STANDARD CSS SELECTORS FOR THE VARIOUS BIBFIELDS:
var bibFieldQueries = [	
				["meta[name=\"citation_title\"]","meta[name=\"DC.Title\"]","meta[name=\"DC.title\"]","meta[itemprop=\"name\"]","meta[name=\"og:title\"]","meta[name=\"dc.Title\"]","meta[property=\"og:title\"]","div.articleTitle","meta[property=\"og.title\"]","meta[name=\"bepress_citation_title\"]"], /*citation_title
				["meta[name=\"citation_issue\"]","meta[name=\"prism.issue\"]","meta[name=\"bepress_citation_issue\"]","meta[name=\"dc.issue\"]","meta[name=\"DC.issue\"]"], /*citation_issue
				["meta[name=\"citation_volume\"]","meta[name=\"prism.volume\"]","meta[name=\"bepress_citation_volume\"]","meta[name=\"dc.volume\"]","meta[name=\"DC.volume\"]"], /*citation_volume
				["meta[name=\"citation_issn\"]","meta[name=\"citation_isbn\"]","meta[name=\"prism.issn\"]"], /*citation_issn
				["meta[name=\"citation_doi\"]","meta[name=\"DC.Identifier\"]","meta[name=\"DC.identifier\"]","meta[name=\"dc.identifier\"]","meta[scheme=\"doi\"]","meta[name=\"bepress_citation_doi\"]"], /*citation_doi	["meta[name=\"citation_firstpage\"]","meta[name=\"prism.startingPage\"]","meta[name=\"bepress_citation_firstpage\"]","meta[name=\"dc.firstoage\"]","meta[name=\"DC.firstPage\"]"], /*citation_firstpage
				["meta[name=\"citation_lastpage\"]","meta[name=\"prism.endingPage\"]","meta[name=\"bepress_citation_lastpage\"]"], /*citation_lastpage	["meta[name=\"citation_journal_title\"]","meta[name=\"og:site_name\"]","meta[name=\"prism.publicationName\"]","meta[property=\"og:site_name\"]","meta[name=\"bepress_citation_journal_title\"]"], /*citation_journal_title
				["meta[name=\"citation_journal_abbrev\"]","meta[name=\"bepress_citation_journal_abbrev\"]"], /*citation_journal_abbrev	
				[],/*citation_url, EMPTY by default due to security reasons!
				["meta[name=\"citation_arxiv_id\"]"], /*citation_archive_id	["meta[name=\"citation_publisher\"]","meta[name=\"DC.Publisher\"]","meta[name=\"DC.publisher\"]","meta[name=\"dc.Publisher\"]","meta[name=\"dc.publisher\"]","meta[name=\"bepress_citation_publisher\"]","div#header div#left_column a"], /*citation_publisher	["meta[name=\"citation_publication_date\"]","meta[name=\"citation_date\"]","meta[name=\"DC.Date\"]","meta[name=\"DC.date\"]","meta[name=\"prism.publicationDate\"]","meta[name=\"article:published_time\"]","meta[name=\"dc.Date\"]","meta[name=\"citation_online_date\"]","div.pubdate-and-corrections time","meta[name=\"bepress_citation_date\"]","meta[name=\"bepress_citation_online_date\"]"] /*citation_date
	];

THIS IS A COPY OF THE ARRAY CONTAINING THE ATTRIBUTES BELONGING TO THE ABOVE LISTED CSS SELECTORS
	var bibFieldQueryAttributes = [
					["content","content","content","content","content","content","content","innerText","content","content"], /*citation_title
					["content","content","content","content","content"], /*citation_issue
					["content","content","content","content","content"], /*citation_volume
					["content","content","content"], /*citation_issn
					["content","content","content","content","content","content"], /*citation_doi
					["content","content","content","content","content"], /*citation_firstpage
					["content","content","content"], /*citation_lastpage
					["content","content","content","content","content"], /*citation_journal_title
					["content","content"], /*citation_journal_abbrev
					[],/*citation_url, EMPTY by default due to security reasons
					["content"], /*citation_archive_id
					["content","content","content","content","content","content","title"], /*citation_publisher
					["content","content","content","content","content","content","content","content","datetime","content","content"] /*citation_date
	]

	Possible css selectors for urls;	["meta[name=\"citation_abstract_html_url\"]","meta[name=\"og:url\"]","meta[property=\"og:url\"]","meta[name=\"bepress_citation_abstract_html_url\"]","meta[name=\"citation_pdf_url\"]","meta[name=\"bepress_citation_pdf_url\"]"],
	
	Associated attributes
	["content","content","content","content","content","content"]
*/